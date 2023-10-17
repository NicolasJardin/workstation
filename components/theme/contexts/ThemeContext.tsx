'use client'
import { maxAge } from '@/constants'
import { setCookie } from 'cookies-next'
import { PropsWithChildren, createContext, useCallback, useState } from 'react'

type Theme = 'light' | 'dark'

export type ThemeStore = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeStore>({} as ThemeStore)

export function ThemeProvider({
  defaultTheme,
  ...props
}: PropsWithChildren<{ defaultTheme?: string }>) {
  const [theme, setTheme] = useState<Theme>((defaultTheme as Theme) || 'dark')

  const toggleTheme = useCallback(() => {
    setTheme(prevValue => {
      const newTheme = prevValue === 'light' ? 'dark' : 'light'
      setCookie('theme', newTheme, {
        maxAge
      })

      return newTheme
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }} {...props} />
}
