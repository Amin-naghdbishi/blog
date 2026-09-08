import React, { useState, useEffect, useMemo } from 'react';
import { parseAnsiToSpans } from '../utils/ansi';
import { useTheme } from '../utils/themeContext';
import { getThemedAnsiColor } from '../utils/themeColors';
import bundledHomeArt from '../content/home-art.txt?raw';

interface ParsedHomeArt {
  mode: 'ansi' | 'ascii';
  color: string;
  body: string;
}

const FALLBACK_ART = bundledHomeArt;

function parseHomeArt(raw: string): ParsedHomeArt {
  const text = raw.trim();
  if (!text) {
    return { mode: 'ascii', color: '#ffffff', body: '' };
  }

  const lines = text.split('\n');
  const firstLine = lines[0].trim();

  // 1. Check for ascii#HEX or ascii #HEX or ascii:#HEX (e.g. ascii#ffffff, ascii#123456)
  const asciiColorMatch = firstLine.match(/^ascii[:\s#]?([#a-f0-9]+)?/i);
  if (asciiColorMatch) {
    let rawColor = (asciiColorMatch[1] || '').trim();
    if (rawColor && !rawColor.startsWith('#')) {
      rawColor = '#' + rawColor;
    }
    const color = rawColor || '#ffffff'; // default to white
    const remainingLines = lines.slice(1);
    if (remainingLines[0] && remainingLines[0].trim() === '---') {
      remainingLines.shift();
    }
    return {
      mode: 'ascii',
      color,
      body: remainingLines.join('\n'),
    };
  }

  // 2. Check for ansi or mode: ansi
  if (/^ansi\b|^mode:\s*ansi\b/i.test(firstLine)) {
    const remainingLines = lines.slice(1);
    if (remainingLines[0] && remainingLines[0].trim() === '---') {
      remainingLines.shift();
    }
    return {
      mode: 'ansi',
      color: '#ffffff',
      body: remainingLines.join('\n'),
    };
  }

  // 3. Check for color:#HEX without "ascii" keyword
  const colorHeaderMatch = firstLine.match(/^color:\s*([#a-z0-9]+)/i);
  if (colorHeaderMatch) {
    let color = colorHeaderMatch[1].trim();
    if (!color.startsWith('#') && /^[0-9a-f]{3,8}$/i.test(color)) {
      color = '#' + color;
    }
    const remainingLines = lines.slice(1);
    if (remainingLines[0] && remainingLines[0].trim() === '---') {
      remainingLines.shift();
    }
    return {
      mode: 'ascii',
      color,
      body: remainingLines.join('\n'),
    };
  }

  // 4. Auto-detect ANSI sequences
  if (text.includes('\x1b[') || text.includes('\\x1b[') || text.includes('\u001b[')) {
    return {
      mode: 'ansi',
      color: '#ffffff',
      body: text,
    };
  }

  // 5. Default: Pure ASCII with clean white text
  return {
    mode: 'ascii',
    color: '#ffffff',
    body: text,
  };
}

export const AsciiBookshelf: React.FC = () => {
  const { theme } = useTheme();
  const [artText, setArtText] = useState<string>(FALLBACK_ART);

  // Dynamic fetch of user-editable /home-art.txt file
  useEffect(() => {
    let active = true;
    fetch(`/home-art.txt?_t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Cannot fetch /home-art.txt');
        return res.text();
      })
      .then((fetched) => {
        if (active && fetched && fetched.trim()) {
          setArtText(fetched);
        }
      })
      .catch(() => {
        // Silently keep bundled FALLBACK_ART
      });

    return () => {
      active = false;
    };
  }, []);

  const parsed = useMemo(() => parseHomeArt(artText), [artText]);

  const spans = useMemo(() => {
    if (parsed.mode === 'ansi') {
      return parseAnsiToSpans(parsed.body);
    }
    return [];
  }, [parsed.mode, parsed.body]);

  const asciiColor = useMemo(() => {
    if (parsed.mode !== 'ascii') return undefined;
    if (theme === 'light') {
      if (parsed.color.toLowerCase() === '#ffffff' || parsed.color.toLowerCase() === '#fff') {
        return '#000000';
      }
    }
    return parsed.color;
  }, [parsed.mode, parsed.color, theme]);

  return (
    <div className="w-full overflow-x-auto select-text flex justify-center py-2">
      <pre
        className="font-mono text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.25] tracking-tight whitespace-pre text-left select-text"
        dir="ltr"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          textShadow: theme === 'dark' && parsed.mode === 'ansi' ? '0 0 2px rgba(110, 231, 183, 0.25)' : 'none',
          color: asciiColor,
        }}
      >
        {parsed.mode === 'ansi' ? (
          spans.map((span, idx) => {
            const style: React.CSSProperties = {};
            const fgColor = getThemedAnsiColor(span.fg, theme);
            if (fgColor) style.color = fgColor;
            if (span.bg) style.backgroundColor = span.bg;
            if (span.bold) style.fontWeight = 'bold';
            if (span.dim) style.opacity = 0.7;

            return (
              <span key={idx} style={style}>
                {span.content}
              </span>
            );
          })
        ) : (
          parsed.body
        )}
      </pre>
    </div>
  );
};
