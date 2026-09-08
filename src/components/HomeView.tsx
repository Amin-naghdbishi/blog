import React, { useState } from 'react';
import { PageType } from '../types';
import { getAllArticles, getAllAsciiArts, getAllPaintings, getAllPhotos } from '../utils/contentLoader';
import { useTheme } from '../utils/themeContext';
import { ThemeToggle } from './ThemeToggle';
import { AnsiArtRenderer } from './AnsiArtRenderer';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';
import { DualTitleRenderer } from './DualTitleRenderer';
import { AsciiBookshelf } from './AsciiBookshelf';

interface HomeViewProps {
  onNavigate: (page: PageType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const articles = getAllArticles();
  const photos = getAllPhotos();
  const paintings = getAllPaintings();
  const asciiArts = getAllAsciiArts();

  // Buttons order: Main content types first, and 'about' placed strictly below them
  const navItems: { id: PageType; titleEn: string; titleFa: string }[] = [
    {
      id: 'articles',
      titleEn: 'ARTICLES',
      titleFa: 'نوشته‌ها',
    },
    {
      id: 'ascii',
      titleEn: 'ASCII ART',
      titleFa: 'هنر اسکی',
    },
    {
      id: 'paintings',
      titleEn: 'PAINTINGS',
      titleFa: 'نقاشی‌ها',
    },
    {
      id: 'photos',
      titleEn: 'PHOTOS',
      titleFa: 'عکس‌ها',
    },
    {
      id: 'about',
      titleEn: 'ABOUT ME',
      titleFa: 'درباره من',
    },
  ];

  // Featured items
  const topAscii = asciiArts.find((a) => a.featured) || asciiArts[0];
  const topArticle = articles.find((a) => a.featured) || articles[0];
  const topPainting = paintings.find((p) => p.featured) || paintings[0];
  const topPhoto = photos.find((p) => p.featured) || photos[0];
  const hasFeaturedContent = Boolean(topAscii || topArticle || topPainting || topPhoto);

  return (
    <div
      id="home-page"
      className={`relative min-h-screen w-full flex flex-col justify-between transition-colors duration-150 ${
        isLight
          ? 'bg-[#9c9c5d] text-black selection:bg-black selection:text-white'
          : 'bg-[#011a0e] text-[#f2f7f4] selection:bg-white selection:text-[#011a0e]'
      }`}
    >
      {/* 
        Section 1: Full-height clean canvas with ASCII Bookshelf and centered-on-mobile Buttons
      */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-6">
        {/* Top bar with subtle Status and Theme Toggle */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-2 pt-2 select-none">
          <div
            className={`font-mono text-xs tracking-wider uppercase font-bold ${
              isLight ? 'text-black' : 'text-[#87cbb0]'
            }`}
          >
            SANCTUARY :: 2026
          </div>
          <ThemeToggle />
        </div>

        {/* Responsive container: Centered on mobile, balanced two-column centered on desktop */}
        <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 my-auto">
          
          {/* Colorful ANSI Bookshelf / Boy Art */}
          <div className="w-full lg:w-auto flex justify-center order-2 lg:order-1">
            <AsciiBookshelf />
          </div>

          {/* Buttons: Centered on mobile (<lg), positioned comfortably inward on desktop (lg) */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end justify-center order-1 lg:order-2">
            <div className="flex flex-col gap-4 sm:gap-5 w-fit">
              {navItems.map((item) => {
                const isHovered = hoveredId === item.id;
                return (
                  <a
                    key={item.id}
                    id={`nav-${item.id}`}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="ascii-link group cursor-pointer block select-none bg-transparent"
                  >
                    {/* ASCII Frame Box */}
                    <div
                      className={`font-mono whitespace-nowrap ${
                        isLight ? 'text-black' : 'text-[#87cbb0]'
                      }`}
                    >
                      {/* Top ASCII border */}
                      <div className="text-xs sm:text-sm tracking-tighter select-none whitespace-nowrap leading-none font-bold">
                        +----------------------------------+
                      </div>
                      
                      {/* Inner content box */}
                      <div
                        className={`flex items-center justify-between px-1 py-2 my-[1px] min-w-[250px] sm:min-w-[280px] bg-transparent ${
                          isLight ? 'text-black' : 'text-[#e2f4ec]'
                        }`}
                      >
                        <span className="text-xs sm:text-sm select-none pl-1 font-bold">
                          {isHovered ? '||' : '|'}
                        </span>
                        
                        <div className="flex-1 px-4 flex flex-col items-end text-right">
                          {/* English text (smaller, uppercase, aligned right) */}
                          <span
                            className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-widest ${
                              isLight
                                ? 'text-black font-semibold'
                                : 'text-[#87cbb0]'
                            }`}
                            dir="ltr"
                          >
                            {item.titleEn}
                          </span>

                          {/* Persian text (larger, bold, aligned right) */}
                          <span
                            className={`font-vazir text-xl sm:text-2xl font-bold leading-tight mt-0.5 ${
                              isLight
                                ? 'text-black'
                                : 'text-white'
                            }`}
                            dir="rtl"
                          >
                            {item.titleFa}
                          </span>
                        </div>

                        <span className="text-xs sm:text-sm select-none pr-1 font-bold">
                          {isHovered ? '||' : '|'}
                        </span>
                      </div>

                      {/* Bottom ASCII border */}
                      <div className="text-xs sm:text-sm tracking-tighter select-none whitespace-nowrap leading-none font-bold">
                        +----------------------------------+
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Minimal Scroll Down hint - only if there are featured items */}
        {hasFeaturedContent && (
          <div className="w-full text-center pb-4 select-none">
            <a
              href="#featured-section"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.getElementById('featured-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`ascii-link font-mono text-xs transition-colors ${
                isLight
                  ? 'text-black hover:text-black font-bold'
                  : 'text-[#87cbb0]/80 hover:text-white'
              }`}
              dir="ltr"
            >
              [اسکرول به پایین برای برگزیده‌ها] ↓
            </a>
          </div>
        )}
      </div>

      {/* 
        Section 2: Clean and quiet Featured previews (only when items exist)
        Order: 1. ASCII Art, 2. Article, 3. Painting, 4. Photo
      */}
      {hasFeaturedContent && (
        <div
          id="featured-section"
          className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-12 pt-16 pb-12 space-y-24"
        >
        
        {/* ۱. هنر اسکی برتر */}
        {topAscii && (
          <section id="featured-ascii" className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <DualTitleRenderer
                title={topAscii.title}
                englishTitle={topAscii.englishTitle}
                size="h2"
                linkHref="#ascii"
                onLinkClick={(e) => {
                  e.preventDefault();
                  onNavigate('ascii');
                }}
              />
              <a
                href="#ascii"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('ascii');
                }}
                className={`ascii-link font-mono text-sm sm:text-base shrink-0 mr-4 ${
                  isLight ? 'text-black hover:text-black font-bold' : 'text-[#9ee3c6] hover:text-white'
                }`}
                dir="ltr"
              >
                [هنر اسکی] -&gt;
              </a>
            </div>

            <div
              onClick={() => onNavigate('ascii')}
              className={`cursor-pointer p-6 overflow-x-auto text-center ${
                isLight ? 'bg-[#baaf7d] border-2 border-black shadow-sm' : 'bg-black'
              }`}
              title="کلیک برای مشاهده در گالری"
            >
              <AnsiArtRenderer
                content={topAscii.art}
                showCopy={false}
                className="!my-0 pointer-events-none"
              />
            </div>
          </section>
        )}

        {/* ۲. مقاله برتر */}
        {topArticle && (
          <section id="featured-article" className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <div
                className={`font-mono text-sm sm:text-base font-bold ${
                  isLight ? 'text-black' : 'text-[#6ee7b7]'
                }`}
                dir="ltr"
              >
                {topArticle.date}
              </div>
              <a
                href="#articles"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('articles');
                }}
                className={`ascii-link font-mono text-sm sm:text-base ${
                  isLight ? 'text-black hover:text-black font-bold' : 'text-[#9ee3c6] hover:text-white'
                }`}
                dir="ltr"
              >
                [نوشته‌ها] -&gt;
              </a>
            </div>

            <DualTitleRenderer
              title={topArticle.title}
              englishTitle={topArticle.englishTitle}
              size="h2"
              linkHref="#article-top"
              onLinkClick={(e) => {
                e.preventDefault();
                onNavigate('articles');
              }}
            />

            <p
              className={`font-vazir text-sm sm:text-base leading-relaxed max-w-4xl font-normal ${
                isLight ? 'text-black' : 'text-[#e2f4ec]'
              }`}
            >
              {topArticle.excerpt}
            </p>

            <div>
              <a
                href="#read-more"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('articles');
                }}
                className={`ascii-link font-mono text-xs sm:text-sm ${
                  isLight ? 'text-black hover:text-black font-bold' : 'text-[#34d399] hover:text-white'
                }`}
                dir="ltr"
              >
                &lt;- [ادامه مطلب را بخوانید]
              </a>
            </div>
          </section>
        )}

        {/* ۳. نقاشی برتر */}
        {topPainting && (
          <section id="featured-painting" className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <DualTitleRenderer
                title={topPainting.title}
                englishTitle={topPainting.englishTitle}
                size="h2"
                linkHref="#paintings"
                onLinkClick={(e) => {
                  e.preventDefault();
                  onNavigate('paintings');
                }}
              />
              <a
                href="#paintings"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('paintings');
                }}
                className={`ascii-link font-mono text-sm sm:text-base shrink-0 mr-4 ${
                  isLight ? 'text-black hover:text-black font-bold' : 'text-[#9ee3c6] hover:text-white'
                }`}
                dir="ltr"
              >
                [نقاشی‌ها] -&gt;
              </a>
            </div>

            <div
              onClick={() => onNavigate('paintings')}
              className={`cursor-pointer p-3 overflow-hidden flex justify-center ${
                isLight ? 'bg-[#baaf7d] border-2 border-black shadow-sm' : 'bg-black'
              }`}
            >
              <img
                src={topPainting.imageUrl}
                alt={topPainting.title}
                className="w-auto h-auto max-h-[500px] object-contain hover:scale-[1.01] transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>
        )}

        {/* ۴. عکس برتر */}
        {topPhoto && (
          <section id="featured-photo" className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <DualTitleRenderer
                title={topPhoto.title}
                englishTitle={topPhoto.englishTitle}
                size="h2"
                linkHref="#photos"
                onLinkClick={(e) => {
                  e.preventDefault();
                  onNavigate('photos');
                }}
              />
              <a
                href="#photos"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('photos');
                }}
                className={`ascii-link font-mono text-sm sm:text-base shrink-0 mr-4 ${
                  isLight ? 'text-black hover:text-black font-bold' : 'text-[#9ee3c6] hover:text-white'
                }`}
                dir="ltr"
              >
                [عکس‌ها] -&gt;
              </a>
            </div>

            <div
              onClick={() => onNavigate('photos')}
              className={`cursor-pointer p-3 overflow-hidden flex justify-center ${
                isLight ? 'bg-[#baaf7d] border-2 border-black shadow-sm' : 'bg-black'
              }`}
            >
              <img
                src={topPhoto.imageUrl}
                alt={topPhoto.title}
                className="w-auto h-auto max-h-[500px] object-contain hover:scale-[1.01] transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>
        )}
      </div>
    )}

      {/* Footer with colorful potted ASCII flowers */}
      <AsciiPottedFlowersFooter />
    </div>
  );
};
