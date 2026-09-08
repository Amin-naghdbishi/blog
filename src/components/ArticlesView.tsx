import React, { useState } from 'react';
import { PageType } from '../types';
import { getAllArticles } from '../utils/contentLoader';
import { useTheme } from '../utils/themeContext';
import { SimpleNav } from './SimpleNav';
import { ArticleContentRenderer } from './ArticleContentRenderer';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';
import { DualTitleRenderer } from './DualTitleRenderer';

interface ArticlesViewProps {
  onNavigate: (page: PageType) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const articles = getAllArticles();
  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <div
      id="articles-page"
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-150 ${
        isLight
          ? 'bg-[#9c9c5d] text-black selection:bg-black selection:text-white'
          : 'bg-[#011a0e] text-[#f4fbf7] selection:bg-white selection:text-[#011a0e]'
      }`}
    >
      <div className="max-w-4xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1">
        {selectedArticle ? (
          /* Single Article Reader */
          <article>
            <SimpleNav
              onBack={() => setSelectedArticleId(null)}
              label="بازگشت به فهرست"
            />

            <div
              className={`font-mono text-xs sm:text-sm mb-3 font-bold ${
                isLight ? 'text-black' : 'text-[#87cbb0]'
              }`}
              dir="ltr"
            >
              {selectedArticle.date} {selectedArticle.readTime ? `| ${selectedArticle.readTime}` : ''}
            </div>

            <div className="mb-8">
              <DualTitleRenderer
                title={selectedArticle.title}
                englishTitle={selectedArticle.englishTitle}
                size="h1"
                as="h1"
              />
            </div>

            <ArticleContentRenderer
              content={selectedArticle.content}
              htmlContent={selectedArticle.htmlContent}
              blocks={selectedArticle.blocks}
            />

            <div
              className={`mt-16 pt-10 border-t ${
                isLight ? 'border-black/30' : 'border-[#093522]'
              }`}
            >
              <SimpleNav
                onBack={() => setSelectedArticleId(null)}
                label="بازگشت به فهرست"
              />
            </div>
          </article>
        ) : (
          /* Articles List */
          <div>
            <SimpleNav
              onBack={() => onNavigate('home')}
              label="بازگشت به خانه"
            />

            <div className="space-y-12 mt-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className={`group pb-8 border-b last:border-b-0 ${
                    isLight ? 'border-black/30' : 'border-[#093522]/60'
                  }`}
                >
                  <div
                    className={`font-mono text-xs sm:text-sm mb-2 font-bold ${
                      isLight ? 'text-black' : 'text-[#87cbb0]'
                    }`}
                    dir="ltr"
                  >
                    {article.date} {article.readTime ? `| ${article.readTime}` : ''}
                  </div>

                  <div className="mb-3">
                    <DualTitleRenderer
                      title={article.title}
                      englishTitle={article.englishTitle}
                      size="h2"
                      linkHref={`#article-${article.id}`}
                      onLinkClick={(e) => {
                        e.preventDefault();
                        setSelectedArticleId(article.id);
                      }}
                      id={`article-item-${article.id}`}
                    />
                  </div>

                  <p
                    className={`font-vazir text-sm sm:text-base leading-relaxed line-clamp-3 font-normal ${
                      isLight ? 'text-black' : 'text-[#beded0]'
                    }`}
                  >
                    {article.excerpt}
                  </p>
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

