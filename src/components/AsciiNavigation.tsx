import React from 'react';
import { PageType } from '../types';
import { useTheme } from '../utils/themeContext';
import { ThemeToggle } from './ThemeToggle';
import { AsciiButton } from './AsciiButton';

interface AsciiNavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  pageTitleFa: string;
  pageTitleEn: string;
}

export const AsciiNavigation: React.FC<AsciiNavigationProps> = ({
  currentPage,
  onNavigate,
  pageTitleFa,
  pageTitleEn,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const navTabs: { id: PageType; labelFa: string; labelEn: string; code: string }[] = [
    { id: 'articles', labelFa: 'نوشته‌ها', labelEn: 'ARTICLES', code: '01' },
    { id: 'ascii', labelFa: 'هنر اسکی', labelEn: 'ASCII ART', code: '02' },
    { id: 'paintings', labelFa: 'نقاشی‌ها', labelEn: 'PAINTINGS', code: '03' },
    { id: 'photos', labelFa: 'عکس‌ها', labelEn: 'PHOTOS', code: '04' },
  ];

  return (
    <header className={`w-full mb-8 ${isLight ? 'text-[#121e0f]' : 'text-[#f4fbf7]'}`}>
      {/* Top action row: Back to Home + Status & ThemeToggle */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <AsciiButton
          id="nav-back-home"
          variant={isLight ? 'muted' : 'amber'}
          size="md"
          onClick={() => onNavigate('home')}
        >
          <span>&lt;-- [ بازگشت به خانه / HOME ]</span>
        </AsciiButton>

        {/* Status terminal info & Theme toggle */}
        <div className="flex items-center gap-3">
          <div
            className={`font-mono text-xs flex items-center gap-2 ${
              isLight ? 'text-[#243517]' : 'text-[#5eead4]'
            }`}
            dir="ltr"
          >
            <span
              className={`inline-block w-2 h-2 animate-pulse ${
                isLight ? 'bg-[#293d1b]' : 'bg-[#10b981]'
              }`}
            />
            <span>MODE: PURE_ASCII // VIEW: {pageTitleEn}</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* ASCII Section Tabs Bar */}
      <nav aria-label="بخش‌های سایت" className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
        {navTabs.map((tab) => {
          const isActive = currentPage === tab.id;
          return (
            <AsciiButton
              key={tab.id}
              id={`tab-${tab.id}`}
              variant={isActive ? 'emerald' : 'muted'}
              size="sm"
              fullWidth
              onClick={() => onNavigate(tab.id)}
            >
              <div className="flex items-center justify-between w-full text-xs">
                <span className="font-mono">{isActive ? `[*] ${tab.labelEn}` : `[ ] ${tab.labelEn}`}</span>
                <span className="font-sans font-bold text-xs">{tab.labelFa}</span>
              </div>
            </AsciiButton>
          );
        })}
      </nav>

      {/* Main Page Title Header */}
      <div
        className={`mt-6 flex flex-col sm:flex-row sm:items-end justify-between border-b pb-3 ${
          isLight ? 'border-[#384623]' : 'border-[#0d593d]'
        }`}
      >
        <div className="text-right">
          <div
            className={`font-mono text-xs tracking-widest uppercase mb-0.5 ${
              isLight ? 'text-[#283c1c]' : 'text-[#34d399]'
            }`}
            dir="ltr"
          >
            :: SECTION_{pageTitleEn} ::
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isLight ? 'text-[#0f1a0b]' : 'text-white'
            }`}
          >
            {pageTitleFa}
          </h1>
        </div>

        <div
          className={`font-mono text-xs mt-2 sm:mt-0 ${
            isLight ? 'text-[#2c3d1f]' : 'text-[#6ee7b7]'
          }`}
          dir="ltr"
        >
          [ UTF-8 // RETRO_ASCII_LAYOUT ]
        </div>
      </div>
    </header>
  );
};
