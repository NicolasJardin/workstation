import { create } from 'zustand'

type Theme = 'light' | 'dark'

type ThemeStore = {
  theme: Theme
  changeTheme: () => void
}

export const useThemeStore = create<ThemeStore>(set => ({
  theme: 'light',
  changeTheme: () => set(({ theme }) => ({ theme: theme === 'light' ? 'dark' : 'light' }))
}))
