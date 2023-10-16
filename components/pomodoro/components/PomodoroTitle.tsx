'use client'

import { usePomodoroContext } from '..'

export function PomodoroTitle() {
  const { currentFlow } = usePomodoroContext()

  switch (currentFlow.type) {
    case 'short-break':
      return <p className="text-2xl font-semibold">Pausa curta</p>
    case 'long-break':
      return <p className="text-2xl font-semibold">Pausa Longa</p>
  }

  return <p className="text-2xl font-semibold text-primary">Pomodoro</p>
}
