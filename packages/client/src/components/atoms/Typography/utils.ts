import { useTheme } from '@mui/material';
import type { TypographyPropsVariantOverrides } from '@mui/material';

export type UseMeasureTextWidthProps = {
  text: string;
  variant: TypographyPropsVariantOverrides;
};

export const useMeasureTextWidth = ({ text, variant }: UseMeasureTextWidthProps): number => {
  const theme = useTheme();
  // @ts-expect-error I don't wanna fuck with this
  const typography = theme.typography[variant];

  if (!typography) {
    throw new Error(`Unknown typography variant: ${variant}`);
  }

  const { fontSize, fontWeight, fontFamily, letterSpacing } = typography;
  if (!fontSize || !fontWeight || !fontFamily || !letterSpacing) {
    console.error(
      `useMeasureTextWidth theme.typography[variant] as theme.typography[${variant}] returned ${typeof typography}`
    );
  }

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
