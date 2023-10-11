import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SettingsDialog } from '.'
import { CircularProgressbar, Countdown, PomodoroControls } from './components'

export function Pomodoro() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card>
        <CardHeader className="items-end">
          <SettingsDialog />
        </CardHeader>
        <CardContent className="pt-12 px-24 pb-8">
          <div className="flex flex-col items-center gap-8">
            <CircularProgressbar />
            <Countdown />
            <PomodoroControls />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
