export const FONTS = {
  PRIMARY: '"Roboto", sans-serif',
  SECONDARY: '"Open Sans", sans-serif',
}

export const COLORS = {
  background: (theme: ThemeType) => theme === ThemeType.LIGHT ? '#F8F0E5' : '#102C57',

  text: (theme: ThemeType) =>
    theme === ThemeType.LIGHT ? {
      primary: '#102C57',
      secondary: '#102C57',
      tertiary: '#102C57',
    } : {
      primary: '#F8F0E5',
      secondary: '#F8F0E5',
      tertiary: '#F8F0E5',
    },
}

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}


// TODO: more colors:
// #DAC0A3
// #EADBC8
// #F8F0E5
