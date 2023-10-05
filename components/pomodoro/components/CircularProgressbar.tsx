'use client'
import { useAppContext } from '@/components/app'
import { CircularProgressbar as ReactCircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export function CircularProgressbar() {
  const { time } = useAppContext()

  return (
    <div className="h-72 w-72">
      <ReactCircularProgressbar value={time} maxValue={5} />
    </div>
  )
}
