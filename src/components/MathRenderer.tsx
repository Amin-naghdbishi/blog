import React, { useMemo } from 'react';
import katex from 'katex';
import { useTheme } from '../utils/themeContext';
import { CopyButton } from './CopyButton';

interface MathRendererProps {
  latex: string;
  displayMode?: boolean;
  caption?: string;
  showCopy?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  latex,
  displayMode = true,
  caption,
  showCopy = true,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const { html, isError, errorMessage } = useMemo(() => {
    try {
      const rendered = katex.renderToString(latex.trim(), {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
      return { html: rendered, isError: false, errorMessage: null };
    } catch (err: any) {
      console.warn('KaTeX rendering error:', err);
      return {
        html: '',
        isError: true,
        errorMessage: err?.message || 'خطا در تبدیل فرمول ریاضی',
      };
    }
  }, [latex, displayMode]);

  if (!displayMode) {
    if (isError) {
      return (
        <span className="font-mono text-xs text-red-400 px-1 bg-red-950/40" title={errorMessage || 'LaTeX Error'}>
          {latex}
        </span>
      );
    }
    return <span className="inline-math px-1" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <div className="my-6 w-full max-w-full">
      <div
        className={`p-4 sm:p-6 overflow-x-auto relative group transition-colors ${
          isLight
            ? 'bg-[#152212] border-2 border-[#384623] text-white shadow-md'
            : 'bg-black/90 text-white'
        }`}
      >
        {showCopy && (
          <div className="flex justify-end mb-2">
            <CopyButton textToCopy={latex} label="Copy LaTeX" />
          </div>
        )}

        {isError ? (
          <div className="space-y-2 text-left" dir="ltr">
            <div className="text-xs font-mono text-red-400">LaTeX Render Notice: {errorMessage}</div>
            <pre
              className={`font-mono text-xs p-2 overflow-x-auto ${
                isLight ? 'text-[#e2f0cf] bg-[#0c160a]' : 'text-[#87cbb0] bg-black'
              }`}
            >
              {latex}
            </pre>
          </div>
        ) : (
          <div
            className="flex justify-center items-center py-2 text-white overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>

      {caption && (
        <div
          className={`font-vazir text-xs sm:text-sm mt-2 px-1 text-right ${
            isLight ? 'text-[#182813]' : 'text-[#87cbb0]'
          }`}
          dir="rtl"
        >
          {caption}
        </div>
      )}
    </div>
  );
};
