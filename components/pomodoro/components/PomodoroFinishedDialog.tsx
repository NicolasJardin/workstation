'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { usePomodoroContext } from '..'

export function PomodoroFinishedDialog() {
  const { isFinished, reset } = usePomodoroContext()

  return (
    <Dialog open={isFinished} onOpenChange={reset}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pomodoro finalizado!</DialogTitle>
          <DialogDescription>
            Parabéns pelo seu foco e produtividade! Você acaba de concluir seu pomodoro. Agora,
            aproveite essa sensação de realização e faça uma breve pausa para recarregar suas
            energias antes de continuar com suas tarefas. O trabalho bem feito é motivo de orgulho!
            💪🍅😊
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
