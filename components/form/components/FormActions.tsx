'use client'
import { Fade } from '@/components/animation'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

type FormActionsProps = {
  isVisible: boolean
  onDiscard?: () => void
}

export function FormActions({ isVisible, onDiscard }: FormActionsProps) {
  const ref = useRef(null)

  return (
    <div className="flex items-center justify-end h-[40px]">
      <Fade in={isVisible} timeout={300} unmountOnExit nodeRef={ref}>
        <div ref={ref} className="flex items-center gap-2">
          <Button variant="ghost" onClick={onDiscard}>
            Descartar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </Fade>
    </div>
  )
}
