import React, { useState, useEffect } from 'react';
import { PageType } from '../types';
import { getAllAsciiArts } from '../utils/contentLoader';
import { useTheme } from '../utils/themeContext';
import { SimpleNav } from './SimpleNav';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';
import { AnsiArtRenderer } from './AnsiArtRenderer';
import { RichMarkdownRenderer } from './RichMarkdownRenderer';
import { CopyButton } from './CopyButton';
import { isAnsiContent } from '../utils/ansi';
import { DualTitleRenderer } from './DualTitleRenderer';

interface AsciiGalleryViewProps {
  onNavigate: (page: PageType) => void;
}

export const AsciiGalleryView: React.FC<AsciiGalleryViewProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedArtId, setSelectedArtId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const asciiArts = getAllAsciiArts();
  const selectedArt = asciiArts.find((item) => item.id === selectedArtId);

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
  if (selectedArt && isFullscreen) {
    const isAnsi = isAnsiContent(selectedArt.art);

    return (
      <div
        id="fullscreen-ascii-overlay"
        className={`fixed inset-0 z-50 p-6 sm:p-10 flex flex-col justify-between overflow-auto ${
          isLight ? 'bg-[#9c9c5d] text-black' : 'bg-black text-white'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
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

          <div className="flex items-center gap-3">
            <span
              className={`font-mono text-xs font-bold ${isLight ? 'text-black' : 'text-[#6ee7b7]'}`}
              dir="ltr"
            >
              {selectedArt.title}
            </span>
            <CopyButton
              textToCopy={selectedArt.art}
              label={isAnsi ? 'Copy ANSI' : 'Copy ASCII'}
            />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center my-auto overflow-auto py-6">
          {isAnsi ? (
            <AnsiArtRenderer
              content={selectedArt.art}
              showCopy={false}
              className="!my-0 max-w-full"
            />
          ) : (
            <pre
              className={`ascii-art text-xs sm:text-sm md:text-base font-mono inline-block text-left select-text leading-tight ${
                isLight ? 'text-black' : 'text-white'
              }`}
              dir="ltr"
            >
              {selectedArt.art.trim()}
            </pre>
          )}
        </div>

        <div
          className={`font-mono text-xs text-center mt-4 select-none font-bold ${
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
      id="ascii-gallery-page"
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-150 ${
        isLight
          ? 'bg-[#9c9c5d] text-black selection:bg-black selection:text-white'
          : 'bg-[#011a0e] text-[#f4fbf7] selection:bg-white selection:text-[#011a0e]'
      }`}
    >
      <div className="max-w-3xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1">
        {selectedArt ? (
          /* Single ASCII/ANSI Art view */
          <div>
            <div className="mb-8 flex items-center justify-between">
              <SimpleNav
                onBack={() => setSelectedArtId(null)}
                label="بازگشت به فهرست"
              />

              <a
                id="expand-ascii-btn"
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
              className={`font-mono text-xs sm:text-sm mb-2 font-bold ${
                isLight ? 'text-black' : 'text-[#87cbb0]'
              }`}
              dir="ltr"
            >
              {selectedArt.date}
            </div>

            <div className="mb-6">
              <DualTitleRenderer
                title={selectedArt.title}
                englishTitle={selectedArt.englishTitle}
                size="h1"
                as="h1"
              />
            </div>

            {/* Themed ASCII/ANSI Canvas with Copy button */}
            <AnsiArtRenderer
              content={selectedArt.art}
              showCopy={true}
              align="center"
              onFullscreen={() => setIsFullscreen(true)}
            />

            {/* Rich Markdown / Math Description if present */}
            {selectedArt.description && (
              <div
                className={`mt-8 pt-6 border-t ${
                  isLight ? 'border-black/30' : 'border-[#093522]'
                }`}
              >
                <RichMarkdownRenderer
                  content={selectedArt.description}
                  className={`text-sm sm:text-base ${
                    isLight ? 'text-black' : 'text-[#beded0]'
                  }`}
                />
              </div>
            )}
          </div>
        ) : (
          /* ASCII/ANSI List */
          <div>
            <SimpleNav
              onBack={() => onNavigate('home')}
              label="بازگشت به خانه"
            />

            <div className="space-y-12 mt-4">
              {asciiArts.map((item) => {
                const isAnsi = isAnsiContent(item.art);

                return (
                  <div key={item.id} className="group">
                    <div
                      className={`flex items-center justify-between font-mono text-xs mb-1 font-bold ${
                        isLight ? 'text-black' : 'text-[#87cbb0]'
                      }`}
                      dir="ltr"
                    >
                      <span>{item.date}</span>
                      <span
                        className={`text-[10px] uppercase font-bold ${
                          isLight ? 'text-black' : 'text-[#529d7c]'
                        }`}
                      >
                        {isAnsi ? 'ANSI' : 'ASCII'}
                      </span>
                    </div>

                    <div className="mb-3">
                      <DualTitleRenderer
                        title={item.title}
                        englishTitle={item.englishTitle}
                        size="h2"
                        linkHref={`#ascii-${item.id}`}
                        onLinkClick={(e) => {
                          e.preventDefault();
                          setSelectedArtId(item.id);
                        }}
                        id={`ascii-item-${item.id}`}
                      />
                    </div>

                    {/* ASCII/ANSI Preview with theme-framed container */}
                    <div
                      onClick={() => setSelectedArtId(item.id)}
                      className={`cursor-pointer p-4 overflow-x-auto text-center ${
                        isLight ? 'bg-[#baaf7d] border-2 border-black shadow-sm' : 'bg-black'
                      }`}
                    >
                      {isAnsi ? (
                        <AnsiArtRenderer
                          content={item.art}
                          showCopy={false}
                          className="!my-0 pointer-events-none"
                        />
                      ) : (
                        <pre
                          className={`ascii-art text-xs font-mono inline-block text-left select-none leading-tight ${
                            isLight ? 'text-black' : 'text-white'
                          }`}
                          dir="ltr"
                        >
                          {item.art.trim()}
                        </pre>
                      )}
                    </div>

                    {item.description && (
                      <div
                        className={`mt-2 text-xs sm:text-sm line-clamp-2 ${
                          isLight ? 'text-black' : 'text-[#87cbb0]'
                        }`}
                      >
                        {item.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Potted flowers footer */}
      <AsciiPottedFlowersFooter />
    </div>
  );
};
