'use client'
import { PropsWithChildren, createContext, useCallback, useState } from 'react'
import { Settings, SettingsStore } from '../types'
import { NotificationsModeEnum } from '../enums'
import { setCookie } from 'cookies-next'
import { maxAge } from '@/constants'

export const SettingsContext = createContext<SettingsStore>({} as SettingsStore)

type SettingsProviderProps = PropsWithChildren<{
  settings: Settings | undefined
}>

export function SettingsProvider(props: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings>(
    props.settings || {
      notifications: {
        mode:
          Notification.permission === 'granted'
            ? NotificationsModeEnum.BROWSER
            : NotificationsModeEnum.CUSTOM,
        permissions: {
          sound: true,
          toast: true
        }
      }
    }
  )

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
