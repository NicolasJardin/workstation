import { CircularTimer, TimerControls } from '@/modules/pomodoro'

export function Pomodoro() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <CircularTimer />

      <TimerControls />
    </div>
  )
}
