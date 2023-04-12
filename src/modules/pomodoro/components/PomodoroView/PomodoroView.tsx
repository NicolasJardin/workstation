import CircularTimer from '../CircularTimer'
import TimerControls from '../TimerControls'

export default function PomodoroView() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <CircularTimer />

      <TimerControls />
    </div>
  )
}
