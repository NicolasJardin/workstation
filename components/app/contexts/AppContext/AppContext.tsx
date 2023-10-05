'use client'
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from 'react'
import useSound from 'use-sound'

export type AppStore = {
  time: number
  minutes: string
  seconds: string
}

export const AppContext = createContext<AppStore>({} as AppStore)

export function AppProvider(props: PropsWithChildren<{}>) {
  const [time, setTime] = useState(5)

  const [play] = useSound('/sounds/success.mp3', {
    volume: 0.5
  })

  useEffect(() => {
    const timer = setInterval(() => {
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
        play()
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [time, play])

  const minutes = useMemo(
    () =>
      Math.floor(time / 60)
        .toString()
        .padStart(2, '0'),
    [time]
  )

  const seconds = useMemo(() => (time % 60).toString().padStart(2, '0'), [time])

  return <AppContext.Provider value={{ time, minutes, seconds }} {...props} />
}
