'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Settings } from 'lucide-react'
import {
  SettingsAppearance,
  SettingsNotifications,
  SettingsPomodoro,
  SettingsAudio
} from './components'
import { Accordion } from '@/components/ui/accordion'

export function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings className="transition cursor-pointer hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>
            Customize seu pomodoro do jeito que funcionar melhor para você!
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible>
          <SettingsPomodoro />
          <SettingsAppearance />
          <SettingsNotifications />
          <SettingsAudio />
        </Accordion>
      </DialogContent>
    </Dialog>
  )
}
