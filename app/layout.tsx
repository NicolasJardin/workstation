import { Html } from '@/components/app'
import { PomodoroProvider } from '@/components/pomodoro'
import { SettingsProvider } from '@/components/settings'
import { Toaster } from '@/components/ui/toaster'
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

  const settings = cookies.get('settings')?.value

  return (
    <SettingsProvider settings={settings ? JSON.parse(settings) : undefined}>
      <Html>
        <body className={inter.className}>
          <PomodoroProvider>{children}</PomodoroProvider>
          <Toaster />
        </body>
      </Html>
    </SettingsProvider>
  )
}
