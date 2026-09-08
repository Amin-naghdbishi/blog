import React, { useState } from 'react';
import { useTheme } from '../utils/themeContext';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = 'Copy',
  className = '',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for non-secure or iframe contexts
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="کپی کردن متن خام"
      className={`font-mono text-[11px] sm:text-xs transition-colors px-2 py-0.5 select-none cursor-pointer tracking-wider ${
        copied
          ? isLight
            ? 'text-black font-bold underline'
            : 'text-[#34d399] font-bold'
          : isLight
          ? 'text-black hover:text-black font-bold'
          : 'text-[#87cbb0] hover:text-white'
      } ${className}`}
      dir="ltr"
    >
      [ {copied ? 'Copied' : label} ]
    </button>
  );
};

