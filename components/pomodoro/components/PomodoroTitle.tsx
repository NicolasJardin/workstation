'use client'

import { usePomodoroContext } from '..'

export function PomodoroTitle() {
  const { currentFlow } = usePomodoroContext()

  switch (currentFlow.type) {
    case 'short-break':
      return <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Pausa curta</p>
    case 'long-break':
      return <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Pausa Longa</p>
  }

  return <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Pomodoro</p>
}
