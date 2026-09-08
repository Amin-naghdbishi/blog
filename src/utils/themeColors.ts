import { ThemeMode } from './themeContext';

/**
 * Maps ANSI colors to rich, warm, harmonious tones when in Light Mode on #9c9c5d background.
 */
export function getThemedAnsiColor(color: string | undefined, theme: ThemeMode): string | undefined {
  if (!color) {
    return theme === 'light' ? '#0a1406' : undefined;
  }

  if (theme === 'dark') {
    return color;
  }

  // Light Mode (#9c9c5d background): Convert to deep, warm, earthy tones
  const c = color.toLowerCase().replace(/\s+/g, '');

  // Greens -> Deep Forest Olive
  if (c.includes('0,187,0') || c.includes('0,255,0') || c.includes('52,211,153') || c.includes('16,185,129') || c.includes('74,222,128') || c.includes('#34d399') || c.includes('#10b981')) {
    return '#172d15';
  }

  // Yellows / Ambers -> Warm Chocolate Amber
  if (c.includes('187,187,0') || c.includes('255,255,0') || c.includes('251,191,36') || c.includes('253,224,71') || c.includes('245,158,11') || c.includes('#fbbf24') || c.includes('#fde047')) {
    return '#4e2a07';
  }

  // Cyans -> Deep Petrol Teal
  if (c.includes('0,187,187') || c.includes('0,255,255') || c.includes('103,232,249') || c.includes('56,189,248') || c.includes('#67e8f9') || c.includes('#38bdf8')) {
    return '#0e3f49';
  }

  // Magentas / Pinks -> Warm Wine / Deep Berry
  if (c.includes('187,0,187') || c.includes('255,0,255') || c.includes('192,132,252') || c.includes('244,114,182') || c.includes('#c084fc') || c.includes('#f472b6')) {
    return '#571444';
  }

  // Reds -> Warm Terracotta Rust
  if (c.includes('187,0,0') || c.includes('255,0,0') || c.includes('248,113,113') || c.includes('239,68,68') || c.includes('#f87171') || c.includes('#ef4444')) {
    return '#751814';
  }

  // Whites -> Deep Charcoal / Dark ink
  if (c.includes('255,255,255') || c.includes('#ffffff') || c.includes('rgb(255,255,255)')) {
    return '#0a1406';
  }

  // Dims / Grays
  if (c.includes('187,187,187') || c.includes('226,244,236')) {
    return '#213019';
  }

  return color;
}
