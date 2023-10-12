'use client'
import { useThemeContext } from '@/components/theme'
import { HtmlHTMLAttributes } from 'react'

export function Html(props: HtmlHTMLAttributes<HTMLHtmlElement>) {
  const { theme } = useThemeContext()

  return <html lang="pt-br" className={theme} {...props} />
}
