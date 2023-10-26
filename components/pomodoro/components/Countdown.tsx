'use client'
import { usePomodoroContext } from '@/components/pomodoro'
import { cn } from '@/lib/utils'
import { HtmlHTMLAttributes } from 'react'

type CountdownProps = HtmlHTMLAttributes<HTMLParagraphElement>
export function Countdown({ className, ...props }: CountdownProps) {
  const {
    time: { minutes, seconds }
  } = usePomodoroContext()

  return (
    <p className={cn('text-3xl font-semibold', className)} {...props}>
      {minutes}:{seconds}
    </p>
  )
}
