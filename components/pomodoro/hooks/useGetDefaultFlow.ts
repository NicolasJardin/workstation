import { PomodoroFlow } from '../types'

export function useGetDefaultFlow(): PomodoroFlow[] {
  return [
    {
      position: 0,
      seconds: 1500,
      type: 'pomodoro'
    },
    {
      position: 1,
      seconds: 300,
      type: 'short-break'
    },
    {
      position: 2,
      seconds: 1500,
      type: 'pomodoro'
    },
    {
      position: 3,
      seconds: 300,
      type: 'short-break'
    },
    {
      position: 4,
      seconds: 1500,
      type: 'pomodoro'
    },
    {
      position: 5,
      seconds: 300,
      type: 'short-break'
    },
    {
      position: 6,
      seconds: 1500,
      type: 'pomodoro'
    },
    {
      position: 7,
      seconds: 1200,
      type: 'long-break'
    }
  ]
}
