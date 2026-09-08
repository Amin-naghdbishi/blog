import React, { useMemo } from 'react';
import { parseAnsiToSpans, isAnsiContent, normalizeAnsi } from '../utils/ansi';
import { useTheme } from '../utils/themeContext';
import { getThemedAnsiColor } from '../utils/themeColors';
import { CopyButton } from './CopyButton';

interface AnsiArtRendererProps {
  content: string;
  caption?: string;
  title?: string;
  showCopy?: boolean;
  align?: 'center' | 'left' | 'right';
  className?: string;
  onFullscreen?: () => void;
}

function parseArtContent(raw: string): { mode: 'ansi' | 'ascii'; color?: string; body: string } {
  const text = raw.trim();
  const lines = text.split('\n');
  const firstLine = lines[0].trim();

  // 1. Check for ascii#HEX or ascii (e.g. ascii#ffffff, ascii#123456, ascii)
  const asciiColorMatch = firstLine.match(/^ascii[:\s#]?([#a-f0-9]+)?$/i);
  if (asciiColorMatch) {
    let rawColor = (asciiColorMatch[1] || '').trim();
    if (rawColor && !rawColor.startsWith('#')) {
      rawColor = '#' + rawColor;
    }
    const color = rawColor || '#ffffff';
    const remainingLines = lines.slice(1);
    if (remainingLines[0] && remainingLines[0].trim() === '---') {
      remainingLines.shift();
    }
    return { mode: 'ascii', color, body: remainingLines.join('\n') };
  }

  // 2. Check for ansi header
  if (/^ansi\b|^mode:\s*ansi\b/i.test(firstLine)) {
    const remainingLines = lines.slice(1);
    if (remainingLines[0] && remainingLines[0].trim() === '---') {
      remainingLines.shift();
    }
    return { mode: 'ansi', body: remainingLines.join('\n') };
  }

  // 3. Fallback to detection
  const hasAnsiCodes = isAnsiContent(text);
  return {
    mode: hasAnsiCodes ? 'ansi' : 'ascii',
    body: text,
  };
}

export const AnsiArtRenderer: React.FC<AnsiArtRendererProps> = ({
  content,
  caption,
  title,
  showCopy = true,
  align = 'center',
  className = '',
  onFullscreen,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const parsed = useMemo(() => parseArtContent(content), [content]);
  const normalized = useMemo(() => normalizeAnsi(parsed.body), [parsed.body]);
  const spans = useMemo(() => {
    if (parsed.mode === 'ansi') {
      return parseAnsiToSpans(parsed.body);
    }
    return [];
  }, [parsed.mode, parsed.body]);

  const textColor = useMemo(() => {
    if (parsed.mode !== 'ascii') return undefined;
    if (parsed.color) {
      if (isLight) {
        return '#000000';
      }
      return parsed.color;
    }
    return isLight ? '#000000' : '#f0f6e4';
  }, [parsed.mode, parsed.color, isLight]);

  const alignClass =
    align === 'center'
      ? 'mx-auto text-center'
      : align === 'left'
      ? 'sm:float-left sm:mr-6 sm:mb-4 clear-both text-left'
      : 'sm:float-right sm:ml-6 sm:mb-4 clear-both text-right';

  return (
    <div className={`my-6 w-full max-w-full ${alignClass} ${className}`}>
      <div
        className={`p-4 sm:p-6 overflow-x-auto text-left relative group transition-colors ${
          isLight
            ? 'bg-[#baaf7d] border-2 border-black text-black shadow-sm'
            : 'bg-black border border-[#0d593d]/50 text-white'
        }`}
      >
        {/* Top header row with Title / ANSI Badge and Minimal Copy Button */}
        <div
          className={`flex items-center justify-between pb-2 mb-2 select-none border-b ${
            isLight ? 'border-black/30' : 'border-[#093522]/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-[10px] tracking-widest uppercase font-bold ${
                isLight ? 'text-black' : 'text-[#529d7c]'
              }`}
            >
              {parsed.mode === 'ansi' ? 'ANSI ART' : 'ASCII ART'}
            </span>
            {title && (
              <span className={`font-mono text-xs ${isLight ? 'text-black font-bold' : 'text-white'}`}>
                | {title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onFullscreen && (
              <button
                type="button"
                onClick={onFullscreen}
                className={`font-mono text-[11px] px-1 cursor-pointer transition-colors ${
                  isLight ? 'text-black hover:text-black font-bold' : 'text-[#87cbb0] hover:text-white'
                }`}
                title="بزرگ‌نمایی تمام صفحه"
              >
                [ Fullscreen ]
              </button>
            )}
            {showCopy && (
              <CopyButton textToCopy={normalized} label={parsed.mode === 'ansi' ? 'Copy ANSI' : 'Copy ASCII'} />
            )}
          </div>
        </div>

        {/* Art Content Area */}
        <pre
          className="ascii-art text-xs sm:text-sm font-mono inline-block text-left select-text leading-tight overflow-x-auto"
          dir="ltr"
          style={{
            color: textColor,
          }}
          onClick={onFullscreen}
        >
          {parsed.mode === 'ansi' ? (
            spans.map((span, idx) => {
              const style: React.CSSProperties = {};
              const fgColor = getThemedAnsiColor(span.fg, theme);
              if (fgColor) style.color = fgColor;
              if (span.bg) style.backgroundColor = span.bg;
              if (span.bold) style.fontWeight = 'bold';
              if (span.dim) style.opacity = 0.7;
              if (span.italic) style.fontStyle = 'italic';
              if (span.underline) style.textDecoration = 'underline';

              return (
                <span key={idx} style={style}>
                  {span.content}
                </span>
              );
            })
          ) : (
            parsed.body
          )}
        </pre>
      </div>

      {caption && (
        <div
          className={`font-vazir text-xs mt-1.5 px-1 text-right ${
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
