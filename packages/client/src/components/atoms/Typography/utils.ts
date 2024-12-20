import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material';

interface UseMeasureTextWidthProps {
  text: string;
  variant: TypographyProps['variant'];
}

export function useMeasureTextWidth({
  text,
  variant,
}: UseMeasureTextWidthProps): number {
  const theme = useTheme();

  // Extract the typography variant styles from the MUI theme.
  const { fontSize, fontWeight, fontFamily, letterSpacing } = useMemo(() => {
    const variantStyles =
      // @ts-ignore
      (theme.typography[variant] as {
        fontSize?: string | number;
        fontWeight?: number | string;
        fontFamily?: string;
        letterSpacing?: string | number;
      }) || {};

    // Convert all to proper units
    // By default, MUI uses `rem` units. We need them in px for measuring.
    // We'll assume a base font-size of 16px for `rem` unless theme explicitly differs.
    const baseFontSize = 16;
    const toPx = (val: string | number | undefined): number => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') {
        if (val.endsWith('rem')) {
          const num = parseFloat(val);
          return num * baseFontSize;
        }
        if (val.endsWith('px')) {
          return parseFloat(val);
        }
        return parseFloat(val);
      }
      return 16; // fallback
    };

    return {
      fontSize: toPx(variantStyles.fontSize) || 16,
      fontWeight: variantStyles.fontWeight ?? 'normal',
      fontFamily: variantStyles.fontFamily ?? 'Arial, sans-serif',
      letterSpacing: variantStyles.letterSpacing
        ? `${toPx(variantStyles.letterSpacing)}px`
        : 'normal',
    };
  }, [theme, variant]);

  // Use a single shared canvas for performance if desired, or create a new one each time.
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    // Set the font on the canvas context to match the MUI typography variant exactly.
    // The canvas expects something like "italic small-caps bold 16px 'Helvetica Neue'"
    // We only have normal variants here, so it would look like "normal normal 400 16px Arial"
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    if (letterSpacing !== 'normal') {
      // measureText doesn't directly support letterSpacing, so we sum up the widths of
      // each character and add letterSpacing between them.
      let totalWidth = 0;
      const spacing = parseFloat(letterSpacing);
      for (let i = 0; i < text.length; i++) {
        const charWidth = ctx.measureText(text[i]).width;
        totalWidth += charWidth + (i < text.length - 1 ? spacing : 0);
      }
      return totalWidth;
    } else {
      // Direct measurement if no letterSpacing is required
      return ctx.measureText(text).width;
    }
  }, [fontFamily, fontSize, fontWeight, letterSpacing, text]);
}
