import { Card, CardContent } from '@/components/ui/card'
import { CircularProgressbar, Countdown, PomodoroControls } from './components'

export function Pomodoro() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card>
        <CardContent className="pt-24 px-24 pb-8">
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
