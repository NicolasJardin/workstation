'use client'

import TopBar from '@/modules/surfaces/components/TopBar'
import { theme } from '@/theme/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <title>Workstation</title>
        <meta name="description" content="The better place for work" />
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>
          <TopBar />
          <main style={{ height: 'calc(100vh - 65px)' }}>{children}</main>
        </body>
      </ThemeProvider>
    </html>
  )
}
