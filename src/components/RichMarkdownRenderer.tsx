import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useTheme } from '../utils/themeContext';
import { CodeBlockRenderer } from './CodeBlockRenderer';
import { DualTitleRenderer } from './DualTitleRenderer';

interface RichMarkdownRendererProps {
  content: string;
  className?: string;
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return getNodeText((node as { props: { children?: React.ReactNode } }).props?.children);
  }
  return '';
}

export const RichMarkdownRenderer: React.FC<RichMarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      className={`rich-markdown font-vazir text-sm sm:text-base leading-relaxed font-light ${
        isLight ? 'text-[#121f0f]' : 'text-[#e2f4ec]'
      } ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => {
            const text = getNodeText(children);
            return (
              <div
                className={`my-10 pb-4 border-b ${
                  isLight ? 'border-[#384623]' : 'border-[#0d593d]/50'
                }`}
              >
                <DualTitleRenderer title={text} size="h1" as="h1" />
              </div>
            );
          },
          h2: ({ children }) => {
            const text = getNodeText(children);
            return (
              <div
                className={`mt-12 mb-6 pb-3 border-b ${
                  isLight ? 'border-[#384623]' : 'border-[#0d593d]/30'
                }`}
              >
                <DualTitleRenderer title={text} size="h2" as="h2" />
              </div>
            );
          },
          h3: ({ children }) => {
            const text = getNodeText(children);
            return (
              <div className="mt-8 mb-5">
                <DualTitleRenderer title={text} size="h3" as="h3" />
              </div>
            );
          },
          p: ({ children }) => (
            <p
              className={`my-4 leading-relaxed font-light text-sm sm:text-base ${
                isLight ? 'text-[#13200e]' : 'text-[#e2f4ec]'
              }`}
            >
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong
              className={`font-bold ${isLight ? 'text-[#0a1406]' : 'text-white'}`}
            >
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em
              className={`italic ${isLight ? 'text-[#283b19]' : 'text-[#a8ebd0]'}`}
            >
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul
              className={`list-disc list-inside my-4 space-y-2 pr-4 text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-[#172712]' : 'text-[#d1ece0]'
              }`}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              className={`list-decimal list-inside my-4 space-y-2 pr-4 text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-[#172712]' : 'text-[#d1ece0]'
              }`}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote
              className={`border-r-4 pr-4 my-5 py-2 font-serif italic text-sm sm:text-base leading-relaxed ${
                isLight
                  ? 'border-[#2d401e] text-[#1c2e14] bg-[#8f8f53]/30'
                  : 'border-[#10b981] text-[#a8ebd0] bg-[#021a10]/50'
              }`}
            >
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr
              className={`my-8 ${
                isLight ? 'border-[#384623]' : 'border-[#0d593d]/60'
              }`}
            />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`underline underline-offset-4 transition-colors ${
                isLight
                  ? 'text-[#1e3211] hover:text-black font-medium'
                  : 'text-[#34d399] hover:text-white'
              }`}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table
                className={`min-w-full border text-xs sm:text-sm text-right ${
                  isLight ? 'border-[#384623]' : 'border-[#0d593d]'
                }`}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead
              className={`border-b text-white ${
                isLight
                  ? 'bg-[#243719] border-[#384623]'
                  : 'bg-[#021f14] border-[#0d593d]'
              }`}
            >
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody
              className={`divide-y ${
                isLight ? 'divide-[#384623]' : 'divide-[#093522]'
              }`}
            >
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr
              className={`transition-colors ${
                isLight ? 'hover:bg-[#8f8f53]/20' : 'hover:bg-[#032b1c]/50'
              }`}
            >
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th
              className={`px-4 py-2 font-bold font-mono text-xs sm:text-sm ${
                isLight ? 'text-[#eaf5d8]' : 'text-[#6ee7b7]'
              }`}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              className={`px-4 py-2 font-vazir text-xs sm:text-sm ${
                isLight ? 'text-[#121f0f]' : 'text-[#e2f4ec]'
              }`}
            >
              {children}
            </td>
          ),
          code: ({ inline, className, children }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && (match || codeString.includes('\n'))) {
              return (
                <CodeBlockRenderer
                  code={codeString}
                  language={match ? match[1] : undefined}
                />
              );
            }

            return (
              <code
                className={`font-mono text-base sm:text-lg px-2.5 py-1 mx-1 inline-block ${
                  isLight
                    ? 'bg-[#142211] text-[#b4f07a] border border-[#384623]'
                    : 'bg-black/70 text-[#34d399] border border-[#0d593d]/50'
                }`}
                dir="ltr"
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
