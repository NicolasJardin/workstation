import type { PomodoroFlow } from '@/components/pomodoro/types'
import { NotificationsModeEnum } from '../enums'

export type SettingsStore = {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

export type Settings = {
  notifications: {
    mode: NotificationsModeEnum
    permissions?: {
      sound: boolean
      toast: boolean
    }
  }
  appearance: {
    theme: 'light' | 'dark'
    background: string
  }
  audio: {
    src: string
    volume: number
  }
  flow: PomodoroFlow[]
}
