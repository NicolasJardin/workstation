'use client'

import { useTimerStore } from '@/stores'
import { styled } from '@mui/material'
import { useMemo } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'

const TimerControlsRoot = styled('div', { name: 'TimerControls' })({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  gap: 10
})

export default function TimerControls() {
  const { isPlaying, pause, play } = useTimerStore()

  const mainControl = useMemo(() => {
    if (isPlaying) return <FaPause size={40} onClick={pause} />

    return <FaPlay size={40} onClick={play} />
  }, [isPlaying, pause, play])

  return <TimerControlsRoot>{mainControl}</TimerControlsRoot>
}
