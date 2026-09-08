import React from 'react';
import { useTheme } from '../utils/themeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      aria-label={isLight ? 'تغییر به تم تاریک' : 'تغییر به تم روشن'}
      title={isLight ? 'تغییر به تم دارک (تیره)' : 'تغییر به تم لایت (روشن)'}
      className={`ascii-link select-none font-mono text-[11px] sm:text-xs transition-all duration-150 cursor-pointer px-2 py-0.5 border ${
        isLight
          ? 'text-[#0a1406] border-[#1e2e10] bg-[#eef3db] hover:bg-[#ffffff] hover:border-black font-semibold'
          : 'text-[#87cbb0] border-[#0d593d] bg-[#022414]/80 hover:bg-[#064e3b] hover:text-white'
      } ${className}`}
      dir="ltr"
    >
      <span className="font-mono">
        {isLight ? '[ ☼ Light ]' : '[ ☾ Dark ]'}
      </span>
    </button>
  );
};
