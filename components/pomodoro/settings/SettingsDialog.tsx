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
import { SettingsForm } from './components'

export function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings className="transition cursor-pointer hover:text-primary" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configurar pomodoro</DialogTitle>
          <DialogDescription>
            Customize seu pomodoro do jeito que funcionar melhor para você!
          </DialogDescription>
        </DialogHeader>
        <SettingsForm className="mt-4" />
      </DialogContent>
    </Dialog>
  )
}
