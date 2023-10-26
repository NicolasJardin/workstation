import { useContext } from 'react'
import { SettingsContext } from '..'

export function useSettingsContext() {
  return useContext(SettingsContext)
}
