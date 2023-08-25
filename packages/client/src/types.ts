import { ThemeType } from './styles'

export type WithTheme<T> = {
  theme: ThemeType
} & T