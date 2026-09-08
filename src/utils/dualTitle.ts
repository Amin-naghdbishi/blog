// Split a title string that might contain Persian and English parts
// Examples:
// 1. "ترمینال زمردی (EMERALD CYBER MATRIX)" -> { primary: "ترمینال زمردی", secondary: "EMERALD CYBER MATRIX" }
// 2. "غروب نئونی // SYNTHWAVE SUNSET" -> { primary: "غروب نئونی", secondary: "SYNTHWAVE SUNSET" }
// 3. "زیبایی فرمول‌ها - The Beauty of Math" -> { primary: "زیبایی فرمول‌ها", secondary: "The Beauty of Math" }
// 4. "فانوس دریایی در مه" -> { primary: "فانوس دریایی در مه", secondary: undefined }

export interface DualTitleParts {
  persian?: string;
  english?: string;
  raw: string;
}

export function isPersianText(text: string): boolean {
  if (!text) return true;
  const persianRegex = /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return persianRegex.test(text);
}

export function parseDualTitle(title: string, explicitEnglish?: string): DualTitleParts {
  if (explicitEnglish) {
    return {
      persian: title,
      english: explicitEnglish,
      raw: `${title} (${explicitEnglish})`,
    };
  }

  if (!title) {
    return { raw: '' };
  }

  // Pattern 1: Title (ENGLISH_SUBTITLE) or Title (English Subtitle)
  const parenMatch = title.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (parenMatch) {
    const part1 = parenMatch[1].trim();
    const part2 = parenMatch[2].trim();
    const isP1Fa = isPersianText(part1);
    const isP2Fa = isPersianText(part2);

    if (isP1Fa && !isP2Fa) {
      return { persian: part1, english: part2, raw: title };
    }
    if (!isP1Fa && isP2Fa) {
      return { persian: part2, english: part1, raw: title };
    }
  }

  // Pattern 2: Title // ENGLISH_SUBTITLE or Title / ENGLISH_SUBTITLE
  const slashMatch = title.match(/^(.+?)\s*(?:\/\/|\/)\s*(.+)$/);
  if (slashMatch) {
    const part1 = slashMatch[1].trim();
    const part2 = slashMatch[2].trim();
    const isP1Fa = isPersianText(part1);
    const isP2Fa = isPersianText(part2);

    if (isP1Fa && !isP2Fa) {
      return { persian: part1, english: part2, raw: title };
    }
    if (!isP1Fa && isP2Fa) {
      return { persian: part2, english: part1, raw: title };
    }
  }

  // Pattern 3: Persian Title - English Subtitle
  const dashMatch = title.match(/^(.+?)\s*[-—–]\s*(.+)$/);
  if (dashMatch) {
    const part1 = dashMatch[1].trim();
    const part2 = dashMatch[2].trim();
    const isP1Fa = isPersianText(part1);
    const isP2Fa = isPersianText(part2);

    if (isP1Fa && !isP2Fa) {
      return { persian: part1, english: part2, raw: title };
    }
    if (!isP1Fa && isP2Fa) {
      return { persian: part2, english: part1, raw: title };
    }
  }

  // Default: Single language title
  if (isPersianText(title)) {
    return { persian: title, raw: title };
  } else {
    return { english: title, raw: title };
  }
}
