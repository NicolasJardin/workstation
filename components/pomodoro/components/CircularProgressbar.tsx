'use client'
import { useAppContext } from '@/components/app'
import { CircularProgressbar as ReactCircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export function CircularProgressbar() {
  const {
    pomodoro: {
      time: { value }
    }
  } = useAppContext()

  return (
    <div className="h-72 w-72">
      <ReactCircularProgressbar value={value} maxValue={5} />
    </div>
  )
}
