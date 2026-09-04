import { randoma11y, type Randoma11yResult } from 'randoma11y';

/**
 * Relative luminance per WCAG 2.x for a hex color (0 = black, 1 = white).
 */
export function relativeLuminance(hex: string): number {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return 1;
  const n = parseInt(m[1], 16);
  let r = (n >> 16) & 0xff;
  let g = (n >> 8) & 0xff;
  let b = n & 0xff;
  const linear = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/**
 * Ensures the generated background is light enough to keep dark text readable.
 * Rerolls the combo while the background stays too dark.
 */
function generateWithLightBackground(result: Randoma11yResult): Randoma11yResult {
  let current = result;
  for (let i = 0; i < 25; i++) {
    current = randoma11y({ algorithm: 'APCA', threshold: 75 });
    const value = relativeLuminance(current.colors[0]);
    if (value > 0.6) break;
  }
  const value = relativeLuminance(current.colors[0]);
  if (value > 0.6) return current;

  return {
    ...current,
    colors: ['#ffffff', current.colors[1]],
  };
}

/**
 * Returns an accessible background + foreground color pair for a deck.
 * colors[0] is the card background, colors[1] is the shape color.
 */
export function generateDeckColors(): { bg: string; fg: string } {
  let result: Randoma11yResult = randoma11y({ algorithm: 'APCA', threshold: 75 });
  result = generateWithLightBackground(result);
  return {
    bg: result.colors[0],
    fg: result.colors[1],
  };
}
