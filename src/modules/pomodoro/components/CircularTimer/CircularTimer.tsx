import { CountdownCircleTimer, Props } from 'react-countdown-circle-timer'

type CircularTimerProps = Partial<Omit<Props, 'colors' | 'colorsTime'>>

export default function CircularTimer(props: CircularTimerProps) {
  return <CountdownCircleTimer {...props} isPlaying duration={7} colors="#D75413" />
}
