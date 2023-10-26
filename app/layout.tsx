import { Html } from '@/components/app'
import { PomodoroProvider } from '@/components/pomodoro'
import { ThemeProvider } from '@/components/theme'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies as nextCookies } from 'next/headers'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { SettingsProvider } from '@/components/settings'
import { Settings } from '@/components/settings/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workstation'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookies = nextCookies()

  const defaultTheme = cookies.get('theme')?.value

  const pomodoroFlow = cookies.get('flow')?.value

  const settings = cookies.get('settings')?.value

  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <Html>
        <body className={inter.className}>
          <SettingsProvider settings={settings ? JSON.parse(settings) : undefined}>
            <PomodoroProvider pomodoroFlow={pomodoroFlow}>{children}</PomodoroProvider>
          </SettingsProvider>
          <Toaster />
        </body>
      </Html>
    </ThemeProvider>
  )
}
