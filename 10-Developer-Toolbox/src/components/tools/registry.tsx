import React from 'react';
import {
  Link2,
  Code2,
  Palette,
  FileCode,
  Braces,
  Hash,
  Clock,
  Regex,
  Baseline,
  FileText,
} from 'lucide-react';
import { CodeTransformTool } from './CodeTransformTool';
import { UuidTool } from './UuidTool';
import { TimestampTool } from './TimestampTool';
import { RegexTool } from './RegexTool';
import { ColorTool } from './ColorTool';
import { MarkdownTool } from './MarkdownTool';
import {
  urlEncode,
  urlDecode,
  formatHtml,
  minifyHtml,
  formatCss,
  minifyCss,
  formatJs,
  minifyJs,
  encodeEntities,
  decodeEntities,
  formatXml,
} from '../../services/devToolsService';

export interface ToolDef {
  id: string;
  name: string;
  short: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  render: () => React.ReactNode;
}

export const TOOLS: ToolDef[] = [
  {
    id: 'url',
    name: 'URL Encoder / Decoder',
    short: 'URL Encode/Decode',
    icon: Link2,
    description: 'Percent-encode text for safe use in URLs, or decode encoded URL components.',
    render: () => (
      <CodeTransformTool
        title="URL Encoder / Decoder"
        desc="Encode text into URL-safe percent notation, or decode it back to plain text."
        placeholder="Enter text or a URL component…"
        example="name=John Doe&city=São Paulo"
        actions={[
          { label: 'Encode', fn: urlEncode },
          { label: 'Decode', fn: urlDecode },
        ]}
      />
    ),
  },
  {
    id: 'html',
    name: 'HTML Formatter / Minifier',
    short: 'HTML Format/Minify',
    icon: Code2,
    description: 'Pretty-print HTML with indentation, or minify it by stripping comments and whitespace.',
    render: () => (
      <CodeTransformTool
        title="HTML Formatter / Minifier"
        desc="Beautify messy HTML with clean indentation, or compress it for production."
        placeholder="<div><p>Hello</p></div>"
        example={'<div class="card"><h1>Title</h1><p>Body <a href="#">link</a></p></div>'}
        actions={[
          { label: 'Format', fn: formatHtml },
          { label: 'Minify', fn: minifyHtml },
        ]}
      />
    ),
  },
  {
    id: 'css',
    name: 'CSS Formatter / Minifier',
    short: 'CSS Format/Minify',
    icon: Palette,
    description: 'Format CSS with readable indentation, or minify it to the smallest size.',
    render: () => (
      <CodeTransformTool
        title="CSS Formatter / Minifier"
        desc="Beautify or compress stylesheet code."
        placeholder=".box{color:red;margin:0}"
        example=".box{color:#2563eb;margin:0;padding:8px}.title{font-weight:700}"
        actions={[
          { label: 'Format', fn: formatCss },
          { label: 'Minify', fn: minifyCss },
        ]}
      />
    ),
  },
  {
    id: 'js',
    name: 'JavaScript Formatter / Minifier',
    short: 'JS Format/Minify',
    icon: Braces,
    description: 'Indentation-based JS beautifier and a conservative comment/whitespace minifier.',
    render: () => (
      <CodeTransformTool
        title="JavaScript Formatter / Minifier"
        desc="Basic indentation beautifier and a light minifier (strips comments & collapses whitespace — not a full compiler)."
        placeholder="function hi(){console.log('hi')}"
        example="function greet(name){if(name){return 'Hi '+name;}else{return 'Hi';}}"
        actions={[
          { label: 'Format', fn: formatJs },
          { label: 'Minify', fn: minifyJs },
        ]}
      />
    ),
  },
  {
    id: 'xml',
    name: 'XML Formatter',
    short: 'XML Format',
    icon: FileCode,
    description: 'Pretty-print XML documents with nested indentation.',
    render: () => (
      <CodeTransformTool
        title="XML Formatter"
        desc="Indent and align XML nodes for readability."
        placeholder="<root><item>1</item></root>"
        example={'<root><item id="1">A</item><item id="2">B</item></root>'}
        actions={[{ label: 'Format', fn: formatXml }]}
      />
    ),
  },
  {
    id: 'entity',
    name: 'HTML Entity Encoder / Decoder',
    short: 'HTML Entities',
    icon: Baseline,
    description: 'Convert characters like < > & to HTML entities and back.',
    render: () => (
      <CodeTransformTool
        title="HTML Entity Encoder / Decoder"
        desc="Escape special characters to HTML entities, or decode entities to characters."
        placeholder="<b>Bold & bright</b>"
        example='<b>Bold & "bright"</b> © 2026'
        actions={[
          { label: 'Encode', fn: encodeEntities },
          { label: 'Decode', fn: decodeEntities },
        ]}
      />
    ),
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    short: 'UUID Generator',
    icon: Hash,
    description: 'Generate cryptographically-random v4 UUIDs.',
    render: () => <UuidTool />,
  },
  {
    id: 'timestamp',
    name: 'Unix Timestamp Converter',
    short: 'Timestamp',
    icon: Clock,
    description: 'Convert Unix epoch time to human dates and back.',
    render: () => <TimestampTool />,
  },
  {
    id: 'regex',
    name: 'Regex Tester',
    short: 'Regex Tester',
    icon: Regex,
    description: 'Test regular expressions with live match highlighting and capture groups.',
    render: () => <RegexTool />,
  },
  {
    id: 'color',
    name: 'Color Code Converter',
    short: 'Color Converter',
    icon: Palette,
    description: 'Convert between HEX, RGB, and HSL with a live swatch.',
    render: () => <ColorTool />,
  },
  {
    id: 'markdown',
    name: 'Markdown Previewer',
    short: 'Markdown Preview',
    icon: FileText,
    description: 'Preview markdown rendered to safe, escaped HTML.',
    render: () => <MarkdownTool />,
  },
];
