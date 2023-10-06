export type AppStore = {
  pomodoro: {
    time: PomodoroTime
    isPlaying: boolean
    play: () => void
    pause: () => void
    skip: () => void
  }
}

export type PomodoroTime = {
  value: number
  minutes: string
  seconds: string
}
