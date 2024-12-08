import type { TypographyProps } from '@mui/material';
import { useTheme } from '@mui/material';

export type UseMeasureTextWidthProps = Required<Pick<TypographyProps, 'variant'>> & {
  text: string;
};

export const useMeasureTextWidth = ({ text, variant }: UseMeasureTextWidthProps): number => {
  const theme = useTheme();
  const typography = theme.typography[variant];

  if (!typography) {
    throw new Error(`Unknown typography variant: ${variant}`);
  }

  const { fontSize, fontWeight, fontFamily, letterSpacing } = typography;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Failed to create canvas rendering context.');
  }

  context.font = `${fontWeight || 'normal'} ${fontSize} ${fontFamily}`;
  context.letterSpacing = `${letterSpacing || 'normal'}`;

  const metrics = context.measureText(text);
  return metrics.width;
};
