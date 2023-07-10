'use client'

import { useTimerStore } from '@/stores'
import { useMemo } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'

export function TimerControls() {
  const { isPlaying, pause, play } = useTimerStore()

  const mainControl = useMemo(() => {
    if (isPlaying) return <FaPause size={40} onClick={pause} />

    return <FaPlay size={40} onClick={play} />
  }, [isPlaying, pause, play])

  return <div className="flex items-center justify-center cursor-pointer">{mainControl}</div>
}
