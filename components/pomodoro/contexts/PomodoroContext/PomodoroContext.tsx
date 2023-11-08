'use client'
import { useSettingsContext } from '@/components/settings'
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useFlowNotification } from '../../hooks'
import type { PomodoroFlow, PomodoroStore } from '../../types'

export const PomodoroContext = createContext<PomodoroStore>({} as PomodoroStore)

type PomodoroProviderProps = PropsWithChildren<{
  pomodoroFlow: string | undefined
}>

export function PomodoroProvider({ pomodoroFlow, ...props }: PomodoroProviderProps) {
  const {
    settings: { flow }
  } = useSettingsContext()

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
  const finish = useCallback(() => setIsFinished(false), [])
  const reset = useCallback(
    (flow: PomodoroFlow) => {
      setCurrentFlow(flow)
      setTime(flow.seconds)
      pause()
    },
    [pause]
  )

  const skip = useCallback(() => {
    setCurrentFlow(prevValue => {
      if (!hasNextPomodoroFlow && prevValue.type === 'pomodoro') setIsFinished(true)
      const newFlow = nextFlow || flow[0]
      setTime(newFlow.seconds)
      return newFlow
    })
    setIsPlaying(false)
  }, [flow, hasNextPomodoroFlow, nextFlow])

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        if (time > 0) {
          setTime(time - 1)
          document.title = `${minutes}:${seconds} - Workstation`
        } else {
          clearInterval(timer)
          document.title = 'Workstation'

          showNotification()
          skip()
        }
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [time, isPlaying, skip, seconds, minutes, showNotification])

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
        finish,
        reset,
        play,
        pause,
        skip
      }}
      {...props}
    />
  )
}
