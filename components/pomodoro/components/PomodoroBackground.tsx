'use client'

import { useSettingsContext } from '@/components/settings'
import Image from 'next/image'

export function PomodoroBackground() {
  const { settings } = useSettingsContext()

  return (
    <Image
      className="absolute w-full h-full z-[-1]"
      src={`/img/${settings.appearance.background}.jpg`}
      alt=""
      fill
    />
  )
}
