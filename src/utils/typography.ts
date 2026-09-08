// Helper to check if text contains predominantly Persian / Arabic characters
export function isPersianText(text: string): boolean {
  if (!text) return true;
  // Persian & Arabic Unicode range: \u0600-\u06FF, \u0750-\u077F, \u08A0-\u08FF, \uFB50-\uFDFF, \uFE70-\uFEFF
  const persianRegex = /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return persianRegex.test(text);
}

// Generates dynamic heading classes based on language (Persian vs English/Latin)
export function getHeadingClasses(level: 'h1' | 'h2' | 'h3' | 'hero', text: string): string {
  const isFa = isPersianText(text);

  if (isFa) {
    // Persian titles: 4x very large with Amiri display font
    switch (level) {
      case 'hero':
        return 'font-amiri text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight';
      case 'h1':
        return 'font-amiri text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-14 mb-8 border-b-2 border-[#0d593d]/60 pb-4 leading-tight';
      case 'h2':
        return 'font-amiri text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-12 mb-6 leading-tight';
      case 'h3':
        return 'font-amiri text-3xl sm:text-4xl md:text-5xl font-bold text-[#b4f0d6] mt-10 mb-5 leading-snug';
    }
  } else {
    // English/Latin titles: Balanced, elegant, standard size
    switch (level) {
      case 'hero':
        return 'font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide leading-snug';
      case 'h1':
        return 'font-mono text-2xl sm:text-3xl font-bold text-white mt-8 mb-4 border-b border-[#0d593d]/60 pb-2 tracking-wide leading-snug';
      case 'h2':
        return 'font-mono text-xl sm:text-2xl font-bold text-white mt-6 mb-3 tracking-wide leading-snug';
      case 'h3':
        return 'font-mono text-lg sm:text-xl font-bold text-[#b4f0d6] mt-5 mb-2.5 tracking-wide leading-snug';
    }
  }
}
