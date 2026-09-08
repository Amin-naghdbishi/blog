import React, { useState, useEffect, useMemo } from 'react';
import { ContentBlock } from '../types';
import { useTheme } from '../utils/themeContext';
import { RichMarkdownRenderer } from './RichMarkdownRenderer';
import { MathRenderer } from './MathRenderer';
import { CodeBlockRenderer } from './CodeBlockRenderer';
import { WritingBoxRenderer } from './WritingBoxRenderer';
import { AnsiArtRenderer } from './AnsiArtRenderer';
import { CopyButton } from './CopyButton';
import { isAnsiContent } from '../utils/ansi';

interface ArticleContentRendererProps {
  content?: string;
  htmlContent?: string;
  blocks?: ContentBlock[];
}

/**
 * Parses raw HTML or mixed Markdown/HTML into structured interactive blocks
 */
function parseMixedContentToBlocks(rawText: string): ContentBlock[] {
  if (!rawText || !rawText.trim()) return [];

  const blocks: ContentBlock[] = [];
  
  // Normalize self-closing breaks / clean outer wrapper if any
  let remaining = rawText.trim();
  const bodyMatch = remaining.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    remaining = bodyMatch[1].trim();
  }

  // Regex to identify rich block elements (HTML tags & custom markers)
  const blockRegex = /(?:<div\s+class=["'](?:math|math-block)["'][^>]*>([\s\S]*?)<\/div>|<math-block(?:\s+caption=["']([^"']*)["'])?>([\s\S]*?)<\/math-block>|\$\$([\s\S]*?)\$\$|<pre\s+class=["']ansi["'][^>]*>([\s\S]*?)<\/pre>|\[(?:ansi|ansicenter|ansileft|ansiright)(?::\s*([^\]]*))?\]([\s\S]*?)\[\/(?:ansi|ansicenter|ansileft|ansiright)\]|<pre><code(?:\s+class=["'](?:language-)?([a-zA-Z0-9_-]+)["'])?>([\s\S]*?)<\/code><\/pre>|\[code(?::\s*([^\]]*))?\]([\s\S]*?)\[\/code\]|<div\s+class=["']writing["'][^>]*>([\s\S]*?)<\/div>|\[(?:writing|raw)(?::\s*([^\]]*))?\]([\s\S]*?)\[\/(?:writing|raw)\]|<div\s+class=["'](?:ascii|ascii-block)["'][^>]*>([\s\S]*?)<\/div>|\[(?:asciicenter|asciileft|asciiright)(?::\s*([^\]]*))?\]([\s\S]*?)\[\/(?:asciicenter|asciileft|asciiright)\]|<img\s+[^>]*src=["']([^"']+)["'][^>]*>|\[(?:imgcenter|imgleft|imgright):\s*([^\]]+)\])/gi;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = blockRegex.exec(remaining)) !== null) {
    const preText = remaining.substring(lastIndex, match.index).trim();
    if (preText) {
      blocks.push({ type: 'markdown', content: preText });
    }

    const fullMatch = match[0];

    // 1. Math block: <div class="math" ...>...</div>
    if (fullMatch.startsWith('<div class="math"') || fullMatch.startsWith("<div class='math'")) {
      const captionMatch = fullMatch.match(/data-caption=["']([^"']*)["']/i);
      const innerLatex = match[1] || '';
      const cleanLatex = innerLatex.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
      blocks.push({
        type: 'math',
        latex: cleanLatex,
        caption: captionMatch ? captionMatch[1].trim() : undefined,
      });
    }
    // 2. <math-block caption="...">...
    else if (fullMatch.startsWith('<math-block')) {
      const caption = match[2];
      const latex = (match[3] || '').replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
      blocks.push({
        type: 'math',
        latex,
        caption: caption ? caption.trim() : undefined,
      });
    }
    // 3. $$...$$
    else if (fullMatch.startsWith('$$')) {
      const latex = (match[4] || '').trim();
      blocks.push({
        type: 'math',
        latex,
      });
    }
    // 4. <pre class="ansi" ...>...
    else if (fullMatch.startsWith('<pre class="ansi"') || fullMatch.startsWith("<pre class='ansi'")) {
      const titleMatch = fullMatch.match(/data-title=["']([^"']*)["']/i);
      const captionMatch = fullMatch.match(/data-caption=["']([^"']*)["']/i);
      const ansiContent = (match[5] || '').trim();
      blocks.push({
        type: 'ansi',
        content: ansiContent,
        title: titleMatch ? titleMatch[1].trim() : undefined,
        caption: captionMatch ? captionMatch[1].trim() : undefined,
      });
    }
    // 5. [ansi]...[/ansi]
    else if (fullMatch.toLowerCase().startsWith('[ansi') || fullMatch.toLowerCase().startsWith('[ansicenter')) {
      const meta = match[6] || '';
      const content = (match[7] || '').trim();
      const metaParts = meta.split('|');
      const title = metaParts[0]?.trim() || undefined;
      const caption = metaParts[1]?.trim() || undefined;
      blocks.push({
        type: 'ansi',
        content,
        title,
        caption,
      });
    }
    // 6. <pre><code ...>...</code></pre>
    else if (fullMatch.startsWith('<pre><code')) {
      const language = match[8] || 'text';
      const codeRaw = match[9] || '';
      const cleanCode = codeRaw
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      blocks.push({
        type: 'code',
        language,
        code: cleanCode.trim(),
      });
    }
    // 7. [code:python | caption]...[/code]
    else if (fullMatch.startsWith('[code')) {
      const meta = match[10] || '';
      const code = (match[11] || '').trim();
      const parts = meta.split('|');
      const language = parts[0]?.trim() || 'text';
      const caption = parts[1]?.trim() || undefined;
      blocks.push({
        type: 'code',
        language,
        code,
        caption,
      });
    }
    // 8. <div class="writing" ...>...
    else if (fullMatch.startsWith('<div class="writing"') || fullMatch.startsWith("<div class='writing'")) {
      const titleMatch = fullMatch.match(/data-title=["']([^"']*)["']/i);
      const captionMatch = fullMatch.match(/data-caption=["']([^"']*)["']/i);
      const content = match[12] || '';
      blocks.push({
        type: 'writing',
        content: content.trim(),
        title: titleMatch ? titleMatch[1].trim() : 'WRITING NOTE',
        caption: captionMatch ? captionMatch[1].trim() : undefined,
      });
    }
    // 9. [writing]...[/writing]
    else if (fullMatch.startsWith('[writing') || fullMatch.startsWith('[raw')) {
      const meta = match[13] || '';
      const content = (match[14] || '').trim();
      const parts = meta.split('|');
      const title = parts[0]?.trim() || 'WRITING NOTE';
      const caption = parts[1]?.trim() || undefined;
      blocks.push({
        type: 'writing',
        content,
        title,
        caption,
      });
    }
    // 10. <div class="ascii"...>
    else if (fullMatch.startsWith('<div class="ascii"') || fullMatch.startsWith("<div class='ascii'")) {
      const captionMatch = fullMatch.match(/data-caption=["']([^"']*)["']/i);
      const titleMatch = fullMatch.match(/data-title=["']([^"']*)["']/i);
      const content = (match[15] || '').trim();
      const isAnsi = isAnsiContent(content);
      blocks.push({
        type: isAnsi ? 'ansi' : 'ascii',
        content,
        title: titleMatch ? titleMatch[1].trim() : undefined,
        caption: captionMatch ? captionMatch[1].trim() : undefined,
        align: 'center',
      });
    }
    // 11. [asciicenter]...[/asciicenter]
    else if (fullMatch.startsWith('[ascii')) {
      const meta = match[16] || '';
      const content = (match[17] || '').trim();
      const isAnsi = isAnsiContent(content);
      blocks.push({
        type: isAnsi ? 'ansi' : 'ascii',
        content,
        caption: meta ? meta.trim() : undefined,
        align: 'center',
      });
    }
    // 12. <img src="..." alt="...">
    else if (fullMatch.startsWith('<img')) {
      const src = match[18];
      const altMatch = fullMatch.match(/alt=["']([^"']*)["']/i);
      const captionMatch = fullMatch.match(/data-caption=["']([^"']*)["']/i);
      blocks.push({
        type: 'image',
        url: src,
        alt: altMatch ? altMatch[1].trim() : undefined,
        caption: captionMatch ? captionMatch[1].trim() : (altMatch ? altMatch[1].trim() : undefined),
        align: 'center',
      });
    }
    // 13. [imgcenter: URL | Caption]
    else if (fullMatch.startsWith('[img')) {
      const payload = (match[19] || '').trim();
      const parts = payload.split('|');
      const url = parts[0]?.trim() || '';
      const caption = parts[1]?.trim() || undefined;
      blocks.push({
        type: 'image',
        url,
        caption,
        align: 'center',
      });
    }

    lastIndex = blockRegex.lastIndex;
  }

  const remainingTail = remaining.substring(lastIndex).trim();
  if (remainingTail) {
    blocks.push({ type: 'markdown', content: remainingTail });
  }

  return blocks;
}

export const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({
  content,
  htmlContent,
  blocks: explicitBlocks,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [fullscreenMedia, setFullscreenMedia] = useState<{
    type: 'img' | 'ascii' | 'ansi';
    data: string;
    caption?: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenMedia) {
        setFullscreenMedia(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenMedia]);

  // Determine structured blocks
  const blocks: ContentBlock[] = useMemo(() => {
    if (explicitBlocks && explicitBlocks.length > 0) {
      return explicitBlocks;
    }

    const source = htmlContent || content || '';
    if (!source) return [];

    return parseMixedContentToBlocks(source);
  }, [content, htmlContent, explicitBlocks]);

  return (
    <div
      className={`article-content space-y-6 font-vazir text-sm sm:text-base leading-relaxed ${
        isLight ? 'text-black' : 'text-[#e2f4ec]'
      }`}
    >
      {/* Fullscreen Overlay */}
      {fullscreenMedia && (
        <div
          id="article-fullscreen-overlay"
          className={`fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-8 ${
            isLight ? 'bg-[#9c9c5d] text-black' : 'bg-black text-white'
          }`}
        >
          <div className="flex items-center justify-between z-10">
            <a
              href="#close"
              onClick={(e) => {
                e.preventDefault();
                setFullscreenMedia(null);
              }}
              className={`ascii-link font-mono text-sm transition-colors select-none ${
                isLight ? 'text-black hover:text-black font-bold' : 'text-[#9ee3c6] hover:text-white'
              }`}
              dir="ltr"
            >
              &lt;- [بازگشت]
            </a>

            {fullscreenMedia.caption && (
              <span
                className={`font-mono text-xs font-bold ${
                  isLight ? 'text-black' : 'text-[#6ee7b7]'
                }`}
                dir="rtl"
              >
                {fullscreenMedia.caption}
              </span>
            )}
          </div>

          <div className="flex-1 w-full h-full flex items-center justify-center overflow-auto my-auto p-2">
            {fullscreenMedia.type === 'img' ? (
              <img
                src={fullscreenMedia.data}
                alt={fullscreenMedia.caption || 'Article media'}
                className="max-h-[90vh] max-w-[95vw] w-auto h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            ) : fullscreenMedia.type === 'ansi' ? (
              <div className="overflow-auto max-w-[95vw] max-h-[85vh]">
                <AnsiArtRenderer
                  content={fullscreenMedia.data}
                  showCopy={true}
                  align="center"
                />
              </div>
            ) : (
              <pre
                className={`ascii-art text-xs sm:text-sm md:text-base font-mono inline-block text-left select-text ${
                  isLight ? 'text-black' : 'text-white'
                }`}
                dir="ltr"
              >
                {fullscreenMedia.data.trim()}
              </pre>
            )}
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
      )}

      {/* Render all content blocks */}
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'markdown':
            return (
              <RichMarkdownRenderer
                key={idx}
                content={block.content}
                className="my-3"
              />
            );

          case 'math':
            return (
              <MathRenderer
                key={idx}
                latex={block.latex}
                caption={block.caption}
                displayMode={true}
                showCopy={true}
              />
            );

          case 'code':
            return (
              <CodeBlockRenderer
                key={idx}
                code={block.code}
                language={block.language}
                filename={block.filename}
                caption={block.caption}
                showCopy={true}
              />
            );

          case 'writing':
            return (
              <WritingBoxRenderer
                key={idx}
                content={block.content}
                title={block.title}
                caption={block.caption}
                showCopy={true}
              />
            );

          case 'image': {
            const alignClass =
              block.align === 'center'
                ? 'mx-auto text-center'
                : block.align === 'left'
                ? 'sm:float-left sm:mr-6 sm:mb-4 sm:max-w-sm clear-both text-left'
                : 'sm:float-right sm:ml-6 sm:mb-4 sm:max-w-sm clear-both text-right';

            return (
              <div key={idx} className={`my-6 my-img-block ${alignClass}`}>
                <div
                  onClick={() =>
                    setFullscreenMedia({
                      type: 'img',
                      data: block.url,
                      caption: block.caption,
                    })
                  }
                  className={`inline-block cursor-pointer p-2 ${
                    isLight ? 'bg-[#baaf7d] border-2 border-black shadow-sm' : 'bg-black'
                  }`}
                  title="کلیک برای بزرگ‌نمایی"
                >
                  <img
                    src={block.url}
                    alt={block.alt || block.caption || 'تصویر مقاله'}
                    className="max-h-[60vh] max-w-full w-auto object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {block.caption && (
                  <div className="mt-2 px-1">
                    <RichMarkdownRenderer
                      content={block.caption}
                      className={`text-xs sm:text-sm ${
                        isLight ? 'text-black font-medium' : 'text-[#87cbb0]'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          }

          case 'ascii': {
            const isAnsi = isAnsiContent(block.content);
            if (isAnsi) {
              return (
                <AnsiArtRenderer
                  key={idx}
                  content={block.content}
                  caption={block.caption}
                  title={block.title}
                  align={block.align || 'center'}
                  showCopy={true}
                  onFullscreen={() =>
                    setFullscreenMedia({
                      type: 'ansi',
                      data: block.content,
                      caption: block.caption,
                    })
                  }
                />
              );
            }

            const alignClass =
              block.align === 'center'
                ? 'mx-auto text-center'
                : block.align === 'left'
                ? 'sm:float-left sm:mr-6 sm:mb-4 clear-both text-left'
                : 'sm:float-right sm:ml-6 sm:mb-4 clear-both text-right';

            return (
              <div key={idx} className={`my-6 my-ascii-block ${alignClass}`}>
                <div
                  className={`p-4 max-w-full overflow-x-auto text-left relative group ${
                    isLight ? 'bg-[#baaf7d] border-2 border-black shadow-sm' : 'bg-black'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between pb-2 mb-2 border-b select-none ${
                      isLight ? 'border-black/30' : 'border-[#093522]/60'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-widest font-bold ${
                        isLight ? 'text-black' : 'text-[#529d7c]'
                      }`}
                    >
                      ASCII ART {block.title ? `| ${block.title}` : ''}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFullscreenMedia({
                            type: 'ascii',
                            data: block.content,
                            caption: block.caption,
                          })
                        }
                        className={`font-mono text-[11px] px-1 cursor-pointer transition-colors ${
                          isLight
                            ? 'text-black hover:text-black font-bold'
                            : 'text-[#87cbb0] hover:text-white'
                        }`}
                        title="بزرگ‌نمایی تمام صفحه"
                      >
                        [ Fullscreen ]
                      </button>
                      <CopyButton textToCopy={block.content} label="Copy ASCII" />
                    </div>
                  </div>

                  <pre
                    onClick={() =>
                      setFullscreenMedia({
                        type: 'ascii',
                        data: block.content,
                        caption: block.caption,
                      })
                    }
                    className={`ascii-art text-xs sm:text-sm font-mono inline-block text-left select-text cursor-pointer leading-tight ${
                      isLight ? 'text-black' : 'text-white'
                    }`}
                    dir="ltr"
                    title="کلیک برای بزرگ‌نمایی"
                  >
                    {block.content.trim()}
                  </pre>
                </div>

                {block.caption && (
                  <div className="mt-2 px-1 text-right">
                    <RichMarkdownRenderer
                      content={block.caption}
                      className={`text-xs sm:text-sm ${
                        isLight ? 'text-black font-medium' : 'text-[#87cbb0]'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          }

          case 'ansi':
            return (
              <AnsiArtRenderer
                key={idx}
                content={block.content}
                caption={block.caption}
                title={block.title}
                align={block.align || 'center'}
                showCopy={true}
                onFullscreen={() =>
                  setFullscreenMedia({
                    type: 'ansi',
                    data: block.content,
                    caption: block.caption,
                  })
                }
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

