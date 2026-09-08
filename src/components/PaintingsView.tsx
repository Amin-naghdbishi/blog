import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { getAllPaintings } from '../utils/contentLoader';
import { useTheme } from '../utils/themeContext';
import { SimpleNav } from './SimpleNav';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';
import { RichMarkdownRenderer } from './RichMarkdownRenderer';
import { DualTitleRenderer } from './DualTitleRenderer';

interface PaintingsViewProps {
  onNavigate: (page: PageType) => void;
}

export const PaintingsView: React.FC<PaintingsViewProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedPaintingId, setSelectedPaintingId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const paintings = getAllPaintings();
  const selectedPainting = paintings.find((p) => p.id === selectedPaintingId);

  // Close fullscreen on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Fullscreen view
  if (selectedPainting && isFullscreen) {
    return (
      <div
        id="fullscreen-painting-overlay"
        className={`fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 ${
          isLight ? 'bg-[#9c9c5d] text-black' : 'bg-black text-white'
        }`}
      >
        <div className="flex items-center justify-between z-10">
          <a
            href="#close-fullscreen"
            onClick={(e) => {
              e.preventDefault();
              setIsFullscreen(false);
            }}
            className={`ascii-link font-mono text-sm transition-colors select-none ${
              isLight ? 'text-black hover:text-black font-bold' : 'text-[#9ee3c6] hover:text-white'
            }`}
            dir="ltr"
          >
            &lt;- [بازگشت]
          </a>

          <span
            className={`font-mono text-xs font-bold ${isLight ? 'text-black' : 'text-[#6ee7b7]'}`}
            dir="ltr"
          >
            {selectedPainting.title}
          </span>
        </div>

        <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden my-auto p-2">
          <img
            src={selectedPainting.imageUrl}
            alt={selectedPainting.title}
            className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div
          className={`font-mono text-xs text-center select-none z-10 font-bold ${
            isLight ? 'text-black' : 'text-[#529d7c]'
          }`}
          dir="ltr"
        >
          [ESC] یا کلیک روی بازگشت
        </div>
      </div>
    );
  }

  return (
    <div
      id="paintings-page"
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-150 ${
        isLight
          ? 'bg-[#9c9c5d] text-black selection:bg-black selection:text-white'
          : 'bg-[#011a0e] text-[#f4fbf7] selection:bg-white selection:text-[#011a0e]'
      }`}
    >
      <div className="max-w-4xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1">
        {selectedPainting ? (
          /* Single Painting View */
          <div>
            <div className="mb-8 flex items-center justify-between">
              <SimpleNav
                onBack={() => setSelectedPaintingId(null)}
                label="بازگشت به فهرست"
              />

              <a
                id="expand-painting-btn"
                href="#fullscreen"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFullscreen(true);
                }}
                className={`ascii-link font-mono text-xs sm:text-sm transition-colors select-none mb-10 ${
                  isLight
                    ? 'text-black hover:text-black font-bold'
                    : 'text-[#9ee3c6] hover:text-white'
                }`}
                dir="ltr"
              >
                [بزرگ‌نمایی تمام صفحه] -&gt;
              </a>
            </div>

            <div
              onClick={() => setIsFullscreen(true)}
              className={`cursor-pointer w-full flex justify-center py-4 mb-4 ${
                isLight ? 'bg-[#baaf7d] border-2 border-black shadow-sm' : 'bg-black'
              }`}
              title="کلیک برای نمایش تمام صفحه"
            >
              <img
                src={selectedPainting.imageUrl}
                alt={selectedPainting.title}
                className="max-h-[75vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div
              className={`font-mono text-xs sm:text-sm mb-2 font-bold ${
                isLight ? 'text-black' : 'text-[#87cbb0]'
              }`}
              dir="ltr"
            >
              {selectedPainting.date} {selectedPainting.medium ? `| ${selectedPainting.medium}` : ''}
            </div>

            <div className="mb-6">
              <DualTitleRenderer
                title={selectedPainting.title}
                englishTitle={selectedPainting.englishTitle}
                size="h1"
                as="h1"
              />
            </div>

            {selectedPainting.description && (
              <div
                className={`mt-8 pt-6 border-t ${
                  isLight ? 'border-black/30' : 'border-[#093522]'
                }`}
              >
                <RichMarkdownRenderer
                  content={selectedPainting.description}
                  className={`text-sm sm:text-base ${
                    isLight ? 'text-black' : 'text-[#beded0]'
                  }`}
                />
              </div>
            )}
          </div>
        ) : (
          /* Paintings Grid */
          <div>
            <SimpleNav
              onBack={() => onNavigate('home')}
              label="بازگشت به خانه"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
              {paintings.map((painting) => (
                <div key={painting.id} className="group">
                  <div
                    onClick={() => setSelectedPaintingId(painting.id)}
                    className={`cursor-pointer aspect-square mb-3 overflow-hidden ${
                      isLight ? 'bg-[#baaf7d] border-2 border-black shadow-sm' : 'bg-black'
                    }`}
                  >
                    <img
                      src={painting.imageUrl}
                      alt={painting.title}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div
                    className={`font-mono text-xs mb-0.5 font-bold ${
                      isLight ? 'text-black' : 'text-[#87cbb0]'
                    }`}
                    dir="ltr"
                  >
                    {painting.date}
                  </div>

                  <div className="mt-1">
                    <DualTitleRenderer
                      title={painting.title}
                      englishTitle={painting.englishTitle}
                      size="card"
                      linkHref={`#painting-${painting.id}`}
                      onLinkClick={(e) => {
                        e.preventDefault();
                        setSelectedPaintingId(painting.id);
                      }}
                      id={`painting-item-${painting.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Potted flowers footer */}
      <AsciiPottedFlowersFooter />
    </div>
  );
};
