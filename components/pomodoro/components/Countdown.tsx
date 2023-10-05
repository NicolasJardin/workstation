'use client'
import { useAppContext } from '@/components/app'
import { cn } from '@/lib/utils'
import { HtmlHTMLAttributes } from 'react'

type CountdownProps = HtmlHTMLAttributes<HTMLParagraphElement>
export function Countdown({ className, ...props }: CountdownProps) {
  const { minutes, seconds } = useAppContext()

  return (
    <p className={cn('text-3xl font-semibold', className)} {...props}>
      {minutes}:{seconds}
    </p>
  )
}
