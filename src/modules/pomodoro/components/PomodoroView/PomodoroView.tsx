'use client'

import { Container, Stack, styled } from '@mui/material'
import CircularTimer from '../CircularTimer'
import TimerControls from '../TimerControls'

const PomodoroViewRoot = styled(Container, { name: 'PomodoroView' })({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
})

export default function PomodoroView() {
  return (
    <PomodoroViewRoot>
      <Stack gap={5}>
        <CircularTimer />

        <TimerControls />
      </Stack>
    </PomodoroViewRoot>
  )
}
