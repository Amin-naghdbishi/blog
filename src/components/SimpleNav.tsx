import React from 'react';
import { useTheme } from '../utils/themeContext';
import { ThemeToggle } from './ThemeToggle';

interface SimpleNavProps {
  onBack: () => void;
  label?: string;
}

export const SimpleNav: React.FC<SimpleNavProps> = ({
  onBack,
  label = 'بازگشت به خانه',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="mb-10 flex items-center justify-between">
      <a
        href="#back"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
        className={`ascii-link font-mono text-sm transition-colors select-none ${
          isLight
            ? 'text-[#1e2e10] hover:text-[#000000] font-bold'
            : 'text-[#9ee3c6] hover:text-white'
        }`}
        dir="ltr"
      >
        &lt;- [{label}]
      </a>

      <ThemeToggle />
    </div>
  );
};
