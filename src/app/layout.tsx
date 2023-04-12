import TopBar from '@/modules/surfaces/components/TopBar'
import '../globals.css'
import Body from '@/modules/layout/Body'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <title>Workstation</title>
        <meta name="description" content="The better place for work" />
      </head>

      <Body>
        <TopBar />

        <main style={{ height: 'calc(100vh - 65px)' }}>{children}</main>
      </Body>
    </html>
  )
}
