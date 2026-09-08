import Anser, { AnserJsonEntry } from 'anser';

/**
 * Normalizes string representation of ANSI escape codes (e.g. literal "\x1b[", "\u001b[", "\033[", "\e[")
 * into real ASCII 27 escape characters (\u001b[).
 */
export function normalizeAnsi(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\x1b\[/gi, '\u001b[')
    .replace(/\\u001b\[/gi, '\u001b[')
    .replace(/\\033\[/g, '\u001b[')
    .replace(/\\e\[/gi, '\u001b[');
}

// Regex to detect ANSI escape sequences (both real ASCII 27 and escaped literal representations)
const ANSI_REGEX = /(?:\u001b\[|\\x1b\[|\\u001b\[|\\033\[|\\e\[)[0-9;]*[a-zA-Z]/i;

export function isAnsiContent(text: string): boolean {
  if (!text) return false;
  return ANSI_REGEX.test(text);
}

export interface AnsiSpan {
  content: string;
  fg?: string;
  bg?: string;
  bold?: boolean;
  dim?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export function parseAnsiToSpans(rawText: string): AnsiSpan[] {
  if (!rawText) return [];

  try {
    const normalized = normalizeAnsi(rawText);
    const jsonEntries: AnserJsonEntry[] = Anser.ansiToJson(normalized, {
      use_classes: false,
      remove_empty: false,
    });

    return jsonEntries.map((entry) => {
      const fg = entry.fg ? (entry.fg.startsWith('rgb') ? entry.fg : `rgb(${entry.fg})`) : undefined;
      const bg = entry.bg ? (entry.bg.startsWith('rgb') ? entry.bg : `rgb(${entry.bg})`) : undefined;
      
      const decoration = entry.decoration || '';
      const bold = decoration.includes('bold');
      const dim = decoration.includes('dim');
      const italic = decoration.includes('italic');
      const underline = decoration.includes('underline');

      return {
        content: entry.content,
        fg,
        bg,
        bold,
        dim,
        italic,
        underline,
      };
    });
  } catch (err) {
    console.warn('Error parsing ANSI string:', err);
    return [{ content: rawText }];
  }
}

