'use client'
import { useThemeStore } from '@/stores'
import { PropsWithChildren } from 'react'

export default function Body(props: PropsWithChildren) {
  const { theme } = useThemeStore()

  return <body {...props} className={theme} />
}
