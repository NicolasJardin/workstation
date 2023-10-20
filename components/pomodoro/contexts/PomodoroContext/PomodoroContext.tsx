'use client'
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react'
import useSound from 'use-sound'
import { useFlowNotification, useGetDefaultFlow } from '../../hooks'
import type { PomodoroFlow, PomodoroStore } from '../../types'

export const PomodoroContext = createContext<PomodoroStore>({} as PomodoroStore)

type PomodoroProviderProps = PropsWithChildren<{
  pomodoroFlow: string | undefined
}>

export function PomodoroProvider({ pomodoroFlow, ...props }: PomodoroProviderProps) {
  const defaultFlow = useGetDefaultFlow()

  const flow = useMemo(
    () => (pomodoroFlow ? (JSON.parse(pomodoroFlow) as PomodoroFlow[]) : defaultFlow),
    [defaultFlow, pomodoroFlow]
  )

  const [time, setTime] = useState<number>(flow[0].seconds)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [currentFlow, setCurrentFlow] = useState<PomodoroFlow>(flow[0])

  const minutes = useMemo(
    () =>
      Math.floor(time / 60)
        .toString()
        .padStart(2, '0'),
    [time]
  )

  const seconds = useMemo(() => (time % 60).toString().padStart(2, '0'), [time])

  const nextFlow = flow.find(({ position }) => position > currentFlow.position)
  const hasNextPomodoroFlow = flow.some(
    ({ position, type }) => position > currentFlow.position && type === 'pomodoro'
  )

  const showNotification = useFlowNotification(currentFlow, nextFlow, hasNextPomodoroFlow)

  const play = useCallback(() => setIsPlaying(true), [])
  const pause = useCallback(() => setIsPlaying(false), [])
  const reset = useCallback(() => setIsFinished(false), [])

  const skip = useCallback(() => {
    setCurrentFlow(prevValue => {
      if (!hasNextPomodoroFlow && prevValue.type === 'pomodoro') setIsFinished(true)
      const newFlow = nextFlow || flow[0]
      setTime(newFlow.seconds)
      return newFlow
    })
    setIsPlaying(false)
  }, [flow, hasNextPomodoroFlow, nextFlow])

  const [playSound] = useSound('/sounds/success.mp3', {
    volume: 0.5
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        if (time > 0) {
          setTime(time - 1)
          document.title = `${minutes}:${seconds} - Workstation`
        } else {
          clearInterval(timer)
          document.title = 'Workstation'
          if (Notification.permission !== 'granted') playSound()
          showNotification()
          skip()
        }
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [time, playSound, isPlaying, skip, seconds, minutes, showNotification])

  useEffect(() => {
    if ('Notification' in window) Notification.requestPermission()
  }, [])

  return (
    <PomodoroContext.Provider
      value={{
        time: {
          value: time,
          minutes,
          seconds
        },
        currentFlow,
        isPlaying,
        isFinished,
        reset,
        play,
        pause,
        skip
      }}
      {...props}
    />
  )
}
