'use client'
import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react'
import useSound from 'use-sound'
import type { PomodoroFlow, PomodoroStore } from './types'

export const PomodoroContext = createContext<PomodoroStore>({} as PomodoroStore)

export function PomodoroProvider(props: PropsWithChildren<{}>) {
  const flow: PomodoroFlow[] = [
    {
      position: 0,
      seconds: 15,
      type: 'pomodoro'
    },
    {
      position: 1,
      seconds: 5,
      type: 'short-break'
    },
    {
      position: 2,
      seconds: 15,
      type: 'pomodoro'
    },
    {
      position: 3,
      seconds: 5,
      type: 'short-break'
    },
    {
      position: 4,
      seconds: 15,
      type: 'pomodoro'
    },
    {
      position: 5,
      seconds: 5,
      type: 'short-break'
    },
    {
      position: 6,
      seconds: 15,
      type: 'pomodoro'
    },
    {
      position: 7,
      seconds: 20,
      type: 'long-break'
    }
  ]

  const [time, setTime] = useState<number>(flow[0].seconds)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentFlow, setCurrentFlow] = useState<PomodoroFlow>(flow[0])

  const play = useCallback(() => setIsPlaying(true), [])
  const pause = useCallback(() => setIsPlaying(false), [])
  const skip = useCallback(() => {
    setCurrentFlow(prevValue => {
      const newFlow = flow.find(({ position }) => position > prevValue.position) || flow[0]
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
  }, [time, playSound, isPlaying])

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
        play,
        pause,
        skip
      }}
      {...props}
    />
  )
}
