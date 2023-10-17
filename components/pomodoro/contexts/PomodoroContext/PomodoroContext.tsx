'use client'
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react'
import useSound from 'use-sound'
import { useGetDefaultFlow } from '../../hooks'
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

  const play = useCallback(() => setIsPlaying(true), [])
  const pause = useCallback(() => setIsPlaying(false), [])
  const reset = useCallback(() => setIsFinished(false), [])
  const skip = useCallback(() => {
    setCurrentFlow(prevValue => {
      const nextFlow = flow.find(({ position }) => position > prevValue.position)
      const nextPomodoroFlow = flow.find(
        ({ position, type }) => position > prevValue.position && type === 'pomodoro'
      )
      if (!nextPomodoroFlow && prevValue.type === 'pomodoro') setIsFinished(true)
      const newFlow = nextFlow || flow[0]
      setTime(newFlow.seconds)

      return newFlow
    })
    setIsPlaying(false)
  }, [])

  const [playSound] = useSound('/sounds/success.mp3', {
    volume: 0.5
  })

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        if (time > 0) {
          const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, '0')
          const seconds = (time % 60).toString().padStart(2, '0')
          setTime(time - 1)
          document.title = `${minutes}:${seconds} - Workstation`
        } else {
          clearInterval(timer)
          document.title = 'Workstation'
          playSound()
          skip()
        }
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [time, playSound, isPlaying, skip])

  const minutes = useMemo(
    () =>
      Math.floor(time / 60)
        .toString()
        .padStart(2, '0'),
    [time]
  )

  const seconds = useMemo(() => (time % 60).toString().padStart(2, '0'), [time])

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
