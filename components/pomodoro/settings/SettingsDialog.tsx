import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Settings } from 'lucide-react'

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

        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
