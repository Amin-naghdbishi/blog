import React from 'react';
import { useTheme } from '../utils/themeContext';
import { CopyButton } from './CopyButton';

interface WritingBoxRendererProps {
  content: string;
  title?: string;
  caption?: string;
  showCopy?: boolean;
}

export const WritingBoxRenderer: React.FC<WritingBoxRendererProps> = ({
  content,
  title = 'WRITING / RAW DRAFT',
  caption,
  showCopy = true,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="my-6 w-full max-w-full">
      <div
        className={`p-4 sm:p-5 relative group transition-colors ${
          isLight
            ? 'bg-[#baaf7d] border-2 border-black shadow-sm'
            : 'bg-[#02180e] border border-[#0d593d]/50'
        }`}
      >
        {/* Minimal header */}
        <div
          className={`flex items-center justify-between pb-2 mb-3 select-none border-b ${
            isLight ? 'border-black/30' : 'border-[#0d593d]/40'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-mono text-xs tracking-widest uppercase font-bold ${
              isLight ? 'text-black' : 'text-[#529d7c]'
            }`}
          >
            <span>[ {title} ]</span>
          </div>

          {showCopy && <CopyButton textToCopy={content} label="Copy Raw" />}
        </div>

        {/* Pure Raw unrendered content */}
        <pre
          className={`font-mono text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text break-words ${
            isLight ? 'text-black font-medium' : 'text-[#e2f4ec]'
          }`}
          dir="ltr"
        >
          {content}
        </pre>
      </div>

      {caption && (
        <div
          className={`font-vazir text-base sm:text-lg mt-2 px-1 text-right ${
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
