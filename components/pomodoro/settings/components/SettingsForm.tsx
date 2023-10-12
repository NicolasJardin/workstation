'use client'

import { useThemeContext } from '@/components/theme'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { HtmlHTMLAttributes } from 'react'

export function SettingsForm(props: HtmlHTMLAttributes<HTMLDivElement>) {
  const { toggleTheme, theme } = useThemeContext()

  return (
    <div {...props}>
      <div className="flex items-center space-x-4">
        <Switch id="dark-mode" onClick={toggleTheme} checked={theme === 'dark'} />
        <Label htmlFor="dark-mode">Tema escuro</Label>
      </div>
    </div>
  )
}
