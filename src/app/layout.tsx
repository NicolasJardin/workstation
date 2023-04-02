'use client'

import TopBar from '@/modules/surfaces/TopBar'
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
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}
