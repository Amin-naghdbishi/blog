import React, { useMemo } from 'react';
import hljs from 'highlight.js';
import { useTheme } from '../utils/themeContext';
import { CopyButton } from './CopyButton';

interface CodeBlockRendererProps {
  code: string;
  language?: string;
  filename?: string;
  caption?: string;
  showCopy?: boolean;
}

export const CodeBlockRenderer: React.FC<CodeBlockRendererProps> = ({
  code,
  language,
  filename,
  caption,
  showCopy = true,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const trimmedCode = code.trim();

  const highlightedHtml = useMemo(() => {
    try {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(trimmedCode, { language }).value;
      }
      return hljs.highlightAuto(trimmedCode).value;
    } catch {
      return '';
    }
  }, [trimmedCode, language]);

  return (
    <div className="my-6 w-full max-w-full">
      <div
        className={`p-4 relative group transition-colors ${
          isLight
            ? 'bg-[#baaf7d] border-2 border-black shadow-sm'
            : 'bg-black border border-[#0d593d]/50'
        }`}
      >
        {/* Header bar */}
        <div
          className={`flex items-center justify-between pb-2 mb-2 select-none border-b ${
            isLight ? 'border-black/30' : 'border-[#0d593d]/30'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider font-bold ${
              isLight ? 'text-black' : 'text-[#529d7c]'
            }`}
          >
            <span>{language || filename || 'CODE'}</span>
            {filename && (
              <span className={isLight ? 'text-black font-semibold' : 'text-[#87cbb0]'}>
                ({filename})
              </span>
            )}
          </div>

          {showCopy && <CopyButton textToCopy={trimmedCode} label="Copy Code" />}
        </div>

        {/* Highlighted code */}
        <pre
          className={`font-mono text-sm sm:text-base overflow-x-auto select-text leading-relaxed ${
            isLight ? 'text-black' : 'text-gray-200'
          }`}
        >
          {highlightedHtml ? (
            <code
              className={`hljs language-${language || 'text'}`}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <code>{trimmedCode}</code>
          )}
        </pre>
      </div>

      {caption && (
        <div
          className={`font-vazir text-base sm:text-lg mt-2 px-1 text-right font-medium ${
            isLight ? 'text-black' : 'text-[#87cbb0]'
          }`}
          dir="rtl"
        >
          {caption}
        </div>
      )}
    </div>
  );
};
