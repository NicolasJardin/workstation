import { create } from 'zustand'

type TimerStore = {
  duration: number
  isPlaying: boolean

  setDuration: (duration: number) => void
  play: () => void
  pause: () => void
  stop: () => void
}

export const useTimerStore = create<TimerStore>(set => ({
  duration: 1500,
  isPlaying: false,

  setDuration: (duration: number) => set(() => ({ duration })),
  play: () => set(() => ({ isPlaying: true })),
  pause: () => set(() => ({ isPlaying: false })),
  stop: () => set(() => ({ isPlaying: false, duration: 1500 }))
}))
