'use client'

import { useTimerStore } from '@/stores'
import { CountdownCircleTimer, Props } from 'react-countdown-circle-timer'

type CircularTimerProps = Partial<Omit<Props, 'colors' | 'colorsTime'>>

export function CircularTimer(props: CircularTimerProps) {
  const { duration, isPlaying } = useTimerStore()

  return (
    <CountdownCircleTimer {...props} isPlaying={isPlaying} duration={duration} colors="#B91C1C">
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  )
}