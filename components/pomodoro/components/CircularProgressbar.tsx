'use client'
import { usePomodoroContext } from '@/components/pomodoro'
import {
  CircularProgressbar as ReactCircularProgressbar,
  buildStyles
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export function CircularProgressbar() {
  const {
    time: { value },
    currentFlow
  } = usePomodoroContext()

  return (
    <div className="h-72 w-72">
      <ReactCircularProgressbar
        value={value}
        maxValue={currentFlow.seconds}
        styles={buildStyles({
          pathColor: `#E11D48`
        })}
      />
    </div>
  )
}
