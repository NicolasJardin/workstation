'use client'
import { NotificationsModeEnum, useSettingsContext } from '@/components/settings'
import { useToast } from '@/components/ui/use-toast'
import { useCallback, useMemo } from 'react'
import useSound from 'use-sound'
import { PomodoroFlow } from '../types'

export function useFlowNotification(
  currentFlow: PomodoroFlow,
  nextFlow: PomodoroFlow | undefined,
  hasNextPomodoroFlow: boolean
) {
  const {
    settings: {
      notifications: { mode, permissions },
      audio: { volume, src }
    }
  } = useSettingsContext()

  const { toast } = useToast()

  const [playSound] = useSound(`/sounds/${src}.mp3`, {
    volume
  })

  const title = useMemo(() => {
    switch (currentFlow?.type) {
      case 'long-break':
        return 'Suas energias foram renovadas!'

      case 'short-break':
        return 'Seu pequeno descanso chegou ao fim.'
    }

    return 'Pomodoro finalizado!'
  }, [currentFlow.type])

  const description = useMemo(() => {
    switch (nextFlow?.type) {
      case 'long-break':
        return 'É hora de uma pausa mais longa! Aproveite este tempo para relaxar, esticar e recarregar as energias.'

      case 'short-break':
        return 'Tempo para uma pausa curta! Aproveite os próximos minutos para relaxar, respirar fundo e recarregar suas energias rapidamente.'
    }

    return 'Vamos voltar à produtividade! Hora de mergulhar de volta no trabalho e fazer acontecer.'
  }, [nextFlow?.type])

  return useCallback(() => {
    if (mode === NotificationsModeEnum.BROWSER)
      return new Notification(title, {
        body: description
      })

    if (!hasNextPomodoroFlow && currentFlow.type === 'pomodoro') return

    if (permissions?.sound) playSound()

    if (permissions?.toast)
      toast({
        title,
        description
      })
  }, [
    title,
    description,
    toast,
    hasNextPomodoroFlow,
    currentFlow.type,
    mode,
    permissions,
    playSound
  ])
}
