import React from 'react';
import { parseDualTitle } from '../utils/dualTitle';
import { useTheme } from '../utils/themeContext';

export type DualHeadingSize = 'hero' | 'h1' | 'h2' | 'h3' | 'card' | 'inline';

interface DualTitleRendererProps {
  title: string;
  englishTitle?: string;
  size?: DualHeadingSize;
  className?: string;
  linkHref?: string;
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  id?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
}

export const DualTitleRenderer: React.FC<DualTitleRendererProps> = ({
  title,
  englishTitle,
  size = 'h1',
  className = '',
  linkHref,
  onLinkClick,
  id,
  as: Component = 'div',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { persian, english } = parseDualTitle(title, englishTitle);

  // Styling configs for Persian (Vazirmatn) and English (monospace/sans) with halved heading sizes
  const styles = {
    hero: {
      persian: `font-vazir text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${
        isLight ? 'text-black' : 'text-white'
      }`,
      english: `font-mono text-xs sm:text-sm md:text-base tracking-wider uppercase font-medium mt-1 ${
        isLight ? 'text-black' : 'text-[#87cbb0]'
      }`,
      container: 'flex flex-col gap-0.5',
    },
    h1: {
      persian: `font-vazir text-xl sm:text-2xl md:text-3xl font-bold leading-tight ${
        isLight ? 'text-black' : 'text-white'
      }`,
      english: `font-mono text-xs sm:text-sm tracking-wider uppercase font-medium mt-0.5 ${
        isLight ? 'text-black' : 'text-[#87cbb0]'
      }`,
      container: 'flex flex-col gap-0.5',
    },
    h2: {
      persian: `font-vazir text-lg sm:text-xl md:text-2xl font-bold leading-snug ${
        isLight ? 'text-black' : 'text-white'
      }`,
      english: `font-mono text-[11px] sm:text-xs tracking-wider uppercase font-medium mt-0.5 ${
        isLight ? 'text-black' : 'text-[#7ecba9]'
      }`,
      container: 'flex flex-col gap-0.5',
    },
    h3: {
      persian: `font-vazir text-base sm:text-lg font-bold leading-snug ${
        isLight ? 'text-black' : 'text-[#b4f0d6]'
      }`,
      english: `font-mono text-[10px] sm:text-xs tracking-wider uppercase font-normal mt-0.5 ${
        isLight ? 'text-black' : 'text-[#67b995]'
      }`,
      container: 'flex flex-col gap-0.5',
    },
    card: {
      persian: `font-vazir text-base sm:text-lg font-bold leading-snug ${
        isLight ? 'text-black' : 'text-white'
      }`,
      english: `font-mono text-[10px] sm:text-xs tracking-wider uppercase font-normal mt-0.5 ${
        isLight ? 'text-black' : 'text-[#7ecba9]'
      }`,
      container: 'flex flex-col gap-0.5',
    },
    inline: {
      persian: `font-vazir text-sm sm:text-base font-bold inline-block ${
        isLight ? 'text-black' : 'text-white'
      }`,
      english: `font-mono text-xs tracking-wider uppercase inline-block mx-1.5 ${
        isLight ? 'text-black' : 'text-[#87cbb0]'
      }`,
      container: 'inline-flex items-baseline flex-wrap gap-1.5',
    },
  }[size];

  const content = (
    <>
      {persian && (
        <span className={styles.persian} dir="rtl">
          {persian}
        </span>
      )}
      {english && (
        <span className={styles.english} dir="ltr">
          {english}
        </span>
      )}
      {!persian && !english && (
        <span className={styles.persian}>
          {title}
        </span>
      )}
    </>
  );

  if (linkHref) {
    return (
      <Component id={id} className={`${styles.container} ${className}`}>
        <a
          href={linkHref}
          onClick={onLinkClick}
          className="ascii-link hover:text-[#9ee3c6] transition-colors group block"
        >
          {content}
        </a>
      </Component>
    );
  }

  return (
    <Component id={id} className={`${styles.container} ${className}`}>
      {content}
    </Component>
  );
};
