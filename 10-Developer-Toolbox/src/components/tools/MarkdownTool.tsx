import React, { useMemo, useState } from 'react';
import { markdownToSafeHtml } from '../../services/devToolsService';
import { ToolHeading, monoAreaClass } from './shared';

const EXAMPLE = `# Hello MicroFree

A **safe** markdown previewer with _italics_, \`inline code\`, and [links](https://microfree.store).

## Features
- Lists
- Blockquotes
- Code blocks

> All HTML is escaped first — no scripts ever run.

\`\`\`
const safe = true;
\`\`\`
`;

export const MarkdownTool: React.FC = () => {
  const [md, setMd] = useState(EXAMPLE);
  const html = useMemo(() => markdownToSafeHtml(md), [md]);

  return (
    <div>
      <ToolHeading
        title="Markdown Previewer"
        desc="Live markdown preview. All input HTML is escaped before rendering — scripts and event handlers can never execute."
      />
      <style>{`
        .markdown-preview h1 { font-size: 1.5rem; font-weight: 800; margin: 0.6rem 0; color:#0f172a; }
        .markdown-preview h2 { font-size: 1.25rem; font-weight: 700; margin: 0.5rem 0; color:#0f172a; }
        .markdown-preview h3 { font-size: 1.1rem; font-weight: 700; margin: 0.4rem 0; }
        .markdown-preview p { margin: 0.5rem 0; }
        .markdown-preview ul { list-style: disc; padding-left: 1.4rem; margin: 0.4rem 0; }
        .markdown-preview ol { list-style: decimal; padding-left: 1.4rem; margin: 0.4rem 0; }
        .markdown-preview li { margin: 0.15rem 0; }
        .markdown-preview a { color:#2563eb; text-decoration: underline; }
        .markdown-preview code { background:#f1f5f9; padding:0.1rem 0.3rem; border-radius:4px; font-size:0.85em; }
        .markdown-preview pre { background:#0f172a; color:#e2e8f0; padding:0.75rem; border-radius:8px; overflow:auto; margin:0.5rem 0; }
        .markdown-preview pre code { background:transparent; color:inherit; padding:0; }
        .markdown-preview blockquote { border-left:3px solid #cbd5e1; padding-left:0.75rem; color:#475569; margin:0.5rem 0; }
        .markdown-preview hr { border:none; border-top:1px solid #e2e8f0; margin:0.8rem 0; }
        .markdown-preview strong { font-weight:700; }
        .markdown-preview em { font-style: italic; }
      `}</style>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Markdown</label>
          <textarea value={md} onChange={(e) => setMd(e.target.value)} rows={16} className={monoAreaClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Preview</label>
          <div
            className="markdown-preview rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 overflow-auto"
            style={{ minHeight: '20rem' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
};
