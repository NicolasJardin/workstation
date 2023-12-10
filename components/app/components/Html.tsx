'use client'

import { useSettingsContext } from '@/components/settings'
import { HtmlHTMLAttributes } from 'react'

export function Html(props: HtmlHTMLAttributes<HTMLHtmlElement>) {
  const { settings } = useSettingsContext()

  return <html lang="pt-br" className={settings.appearance.theme} {...props} />
}
