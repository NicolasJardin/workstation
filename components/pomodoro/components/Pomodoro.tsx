import { CircularProgressbar } from './CircularProgressbar'
import { Countdown } from './Countdown'

export function Pomodoro() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-8">
        <CircularProgressbar />
        <Countdown />
      </div>
    </div>
  )
}
