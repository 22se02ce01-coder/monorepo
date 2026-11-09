import pako from 'pako';

// CRC32 table
const makeCrcTable = (): Uint32Array => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c >>> 0;
  }
  return table;
};

const crcTable = makeCrcTable();

const crc32 = (buf: Uint8Array): number => {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
};

interface ZipEntry {
  path: string;
  data: Uint8Array;
}

/**
 * Creates a valid ZIP file archive from a list of files
 */
export function createZipArchive(files: ZipEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  const fileRecords: {
    pathBytes: Uint8Array;
    compressedData: Uint8Array;
    uncompressedSize: number;
    compressedSize: number;
    crc: number;
    offset: number;
  }[] = [];

  const chunks: Uint8Array[] = [];
  let currentOffset = 0;

  // Write Local Files
  for (const file of files) {
    const pathBytes = encoder.encode(file.path);
    const uncompressedSize = file.data.length;
    const crc = crc32(file.data);

    // Compress using pako deflateRaw (raw DEFLATE without zlib wrapper)
    const compressedData = pako.deflateRaw(file.data);
    const compressedSize = compressedData.length;

    const header = new Uint8Array(30 + pathBytes.length);
    const view = new DataView(header.buffer);

    view.setUint32(0, 0x04034b50, true); // Local file header signature
    view.setUint16(4, 20, true); // Version needed to extract (2.0)
    view.setUint16(6, 0, true); // General purpose bit flag
    view.setUint16(8, 8, true); // Compression method (8 = Deflate)
    view.setUint16(10, 0x4821, true); // Last mod file time
    view.setUint16(12, 0x5821, true); // Last mod file date
    view.setUint32(14, crc, true); // CRC-32
    view.setUint32(18, compressedSize, true); // Compressed size
    view.setUint32(22, uncompressedSize, true); // Uncompressed size
    view.setUint16(26, pathBytes.length, true); // File name length
    view.setUint16(28, 0, true); // Extra field length

    header.set(pathBytes, 30);

    chunks.push(header);
    chunks.push(compressedData);

    fileRecords.push({
      pathBytes,
      compressedData,
      uncompressedSize,
      compressedSize,
      crc,
      offset: currentOffset,
    });

    currentOffset += header.length + compressedData.length;
  }

  // Central Directory start offset
  const centralDirectoryOffset = currentOffset;
  let centralDirectorySize = 0;

  // Write Central Directory Headers
  for (const rec of fileRecords) {
    const cdHeader = new Uint8Array(46 + rec.pathBytes.length);
    const view = new DataView(cdHeader.buffer);

    view.setUint32(0, 0x02014b50, true); // Central directory header signature
    view.setUint16(4, 20, true); // Version made by
    view.setUint16(6, 20, true); // Version needed to extract
    view.setUint16(8, 0, true); // General purpose bit flag
    view.setUint16(10, 8, true); // Compression method (8 = Deflate)
    view.setUint16(12, 0x4821, true); // Last mod file time
    view.setUint16(14, 0x5821, true); // Last mod file date
    view.setUint32(16, rec.crc, true); // CRC-32
    view.setUint32(20, rec.compressedSize, true); // Compressed size
    view.setUint32(24, rec.uncompressedSize, true); // Uncompressed size
    view.setUint16(28, rec.pathBytes.length, true); // File name length
    view.setUint16(30, 0, true); // Extra field length
    view.setUint16(32, 0, true); // File comment length
    view.setUint16(34, 0, true); // Disk number start
    view.setUint16(36, 0, true); // Internal file attributes
    view.setUint32(38, 0, true); // External file attributes
    view.setUint32(42, rec.offset, true); // Relative offset of local header

    cdHeader.set(rec.pathBytes, 46);

    chunks.push(cdHeader);
    centralDirectorySize += cdHeader.length;
  }

  // End of Central Directory Record (EOCD)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);

  eocdView.setUint32(0, 0x06054b50, true); // EOCD signature
  eocdView.setUint16(4, 0, true); // Number of this disk
  eocdView.setUint16(6, 0, true); // Disk where central directory starts
  eocdView.setUint16(8, fileRecords.length, true); // Number of central directory records on this disk
  eocdView.setUint16(10, fileRecords.length, true); // Total number of central directory records
  eocdView.setUint32(12, centralDirectorySize, true); // Size of central directory
  eocdView.setUint32(16, centralDirectoryOffset, true); // Offset of start of central directory
  eocdView.setUint16(20, 0, true); // Comment length

  chunks.push(eocd);

  // Concatenate all chunks
  const totalLength = chunks.reduce((acc, curr) => acc + curr.length, 0);
  const out = new Uint8Array(totalLength);
  let pos = 0;
  for (const chunk of chunks) {
    out.set(chunk, pos);
    pos += chunk.length;
  }

  return out;
}

const escapeXml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

export interface PageContent {
  pageNumber: number;
  paragraphs: string[];
}

/**
 * Builds an authentic, fully editable .docx file from extracted page contents
 */
export function buildDocxDocument(pages: PageContent[], _documentTitle: string = 'Converted Document'): Uint8Array {
  const encoder = new TextEncoder();

  // 1. [Content_Types].xml
  const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`;

  // 2. _rels/.rels
  const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  // 3. word/_rels/document.xml.rels
  const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

  // 4. word/styles.xml
  const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
        <w:sz w:val="24"/>
        <w:color w:val="2B2B2B"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:line="276" w:lineRule="auto" w:after="160"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
</w:styles>`;

  // 5. word/document.xml
  let bodyXml = '';

  pages.forEach((page, pIdx) => {
    // If not first page, add a page break before page content
    if (pIdx > 0) {
      bodyXml += `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
    }

    if (page.paragraphs.length === 0) {
      bodyXml += `<w:p><w:r><w:t xml:space="preserve">[Empty Page ${page.pageNumber}]</w:t></w:r></w:p>`;
    } else {
      page.paragraphs.forEach((para) => {
        const cleanText = escapeXml(para.trim());
        if (cleanText) {
          bodyXml += `<w:p><w:r><w:t xml:space="preserve">${cleanText}</w:t></w:r></w:p>`;
        }
      });
    }
  });

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${bodyXml}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;

  const files: ZipEntry[] = [
    { path: '[Content_Types].xml', data: encoder.encode(contentTypesXml) },
    { path: '_rels/.rels', data: encoder.encode(relsXml) },
    { path: 'word/_rels/document.xml.rels', data: encoder.encode(docRelsXml) },
    { path: 'word/styles.xml', data: encoder.encode(stylesXml) },
    { path: 'word/document.xml', data: encoder.encode(documentXml) },
  ];

  return createZipArchive(files);
}
