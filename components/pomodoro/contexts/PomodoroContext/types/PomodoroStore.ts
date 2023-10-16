export type PomodoroStore = {
  time: PomodoroTime
  isPlaying: boolean
  currentFlow: PomodoroFlow
  play: () => void
  pause: () => void
  skip: () => void
}

export type PomodoroTime = {
  value: number
  minutes: string
  seconds: string
}

export type PomodoroFlow = {
  seconds: number
  position: number
  type: 'pomodoro' | 'short-break' | 'long-break'
}
