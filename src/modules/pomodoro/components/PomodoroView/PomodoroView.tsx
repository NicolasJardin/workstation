'use client'

import { Container, styled } from '@mui/material'
import CircularTimer from '../CircularTimer'

const PomodoroViewRoot = styled(Container, { name: 'PomodoroView' })({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
})

export default function PomodoroView() {
  return (
    <PomodoroViewRoot>
      <CircularTimer />
    </PomodoroViewRoot>
  )
}
