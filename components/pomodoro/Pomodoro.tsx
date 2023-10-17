import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SettingsDialog } from '.'
import {
  CircularProgressbar,
  Countdown,
  PomodoroControls,
  PomodoroFinishedDialog,
  PomodoroTitle
} from './components'

export function Pomodoro() {
  return (
    <div className="flex items-center justify-center h-full bg-[url('/img/background.jpg')] bg-cover">
      <PomodoroFinishedDialog />
      <Card>
        <CardHeader className="items-end">
          <SettingsDialog />
        </CardHeader>
        <CardContent className="px-24 pb-8">
          <div className="flex flex-col items-center gap-8">
            <PomodoroTitle />
            <CircularProgressbar />
            <Countdown />
            <PomodoroControls />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
