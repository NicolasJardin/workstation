import { useContext } from 'react'
import { ThemeContext } from '.'

export function useThemeContext() {
  return useContext(ThemeContext)
}
