'use client'
import { useGetDefaultFlow } from '@/components/pomodoro/hooks'
import { maxAge } from '@/constants'
import { setCookie } from 'cookies-next'
import { PropsWithChildren, createContext, useCallback, useState } from 'react'
import { NotificationsModeEnum } from '../enums'
import { Settings, SettingsStore } from '../types'

export const SettingsContext = createContext<SettingsStore>({} as SettingsStore)

type SettingsProviderProps = PropsWithChildren<{
  settings: Partial<Settings> | undefined
}>

export function SettingsProvider(props: SettingsProviderProps) {
  const defaultFlow = useGetDefaultFlow()

  const { appearance, audio, flow, notifications } = props.settings || {}

  const [settings, setSettings] = useState<Settings>({
    notifications: {
      mode:
        notifications?.mode || Notification.permission === 'granted'
          ? NotificationsModeEnum.BROWSER
          : NotificationsModeEnum.CUSTOM,
      permissions: {
        sound: notifications?.permissions?.sound || true,
        toast: notifications?.permissions?.toast || true
      }
    },
    appearance: {
      background: appearance?.background || 'rain',
      theme: appearance?.theme || 'dark'
    },
    audio: {
      src: audio?.src || 'success',
      volume: audio?.volume || 0.5
    },
    flow: flow || defaultFlow
  })

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prevValues => {
      const settings = {
        ...prevValues,
        ...newSettings
      }

      setCookie('settings', settings, {
        maxAge
      })

      return settings
    })
  }, [])

  return <SettingsContext.Provider value={{ settings, updateSettings }} {...props} />
}
