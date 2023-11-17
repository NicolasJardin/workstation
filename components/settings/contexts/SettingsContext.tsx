'use client'
import { PropsWithChildren, createContext, useCallback, useState } from 'react'
import { Settings, SettingsStore } from '../types'
import { NotificationsModeEnum } from '../enums'
import { setCookie } from 'cookies-next'
import { maxAge } from '@/constants'
import { useGetDefaultFlow } from '@/components/pomodoro/hooks'

export const SettingsContext = createContext<SettingsStore>({} as SettingsStore)

type SettingsProviderProps = PropsWithChildren<{
  settings: Partial<Settings> | undefined
}>

export function SettingsProvider(props: SettingsProviderProps) {
  const defaultFlow = useGetDefaultFlow()

  const [settings, setSettings] = useState<Settings>({
    notifications: {
      mode:
        props.settings?.notifications?.mode || Notification.permission === 'granted'
          ? NotificationsModeEnum.BROWSER
          : NotificationsModeEnum.CUSTOM,
      permissions: {
        sound: props.settings?.notifications?.permissions?.sound || true,
        toast: props.settings?.notifications?.permissions?.toast || true
      }
    },
    appearance: {
      background: props.settings?.appearance?.background || 'rain',
      theme: props.settings?.appearance?.theme || 'dark'
    },
    flow: props.settings?.flow || defaultFlow
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
