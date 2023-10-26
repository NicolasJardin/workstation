'use client'

import { useThemeContext } from '@/components/theme'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Fragment } from 'react'

export function SettingsAppearance() {
  const { toggleTheme, theme } = useThemeContext()

  return (
    <AccordionItem value="appearance">
      <AccordionTrigger>Aparência</AccordionTrigger>
      <AccordionContent>
        <div className="flex items-center space-x-4">
          <Switch id="dark-mode" onClick={toggleTheme} checked={theme === 'dark'} />
          <Label htmlFor="dark-mode">Tema escuro</Label>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
