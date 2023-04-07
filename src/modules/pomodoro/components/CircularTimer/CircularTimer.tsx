import { useTimerStore } from '@/stores'
import { CountdownCircleTimer, Props } from 'react-countdown-circle-timer'

type CircularTimerProps = Partial<Omit<Props, 'colors' | 'colorsTime'>>

export default function CircularTimer(props: CircularTimerProps) {
  const { duration, isPlaying } = useTimerStore()

  return (
    <CountdownCircleTimer {...props} isPlaying={isPlaying} duration={duration} colors="#D75413">
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  )
}
