import React, { createContext, useCallback, useContext, useState } from 'react'
import { ThemeType } from '../styles'


interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [ theme, setTheme ] = useState(ThemeType.LIGHT)

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
