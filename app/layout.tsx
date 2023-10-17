import { Html } from '@/components/app'
import { PomodoroProvider } from '@/components/pomodoro'
import { ThemeProvider } from '@/components/theme'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies as nextCookies } from 'next/headers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Workstation'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookies = nextCookies()

  const defaultTheme = cookies.get('theme')?.value

  const pomodoroFlow = cookies.get('flow')?.value

  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <Html>
        <body className={inter.className}>
          <PomodoroProvider pomodoroFlow={pomodoroFlow}>{children}</PomodoroProvider>
        </body>
      </Html>
    </ThemeProvider>
  )
}
