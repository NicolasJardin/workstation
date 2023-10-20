'use client'
import { Fade } from '@/components/animation'
import { usePomodoroContext } from '@/components/pomodoro'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Pause, Play, SkipForward } from 'lucide-react'
import { Fragment, useRef } from 'react'

export function PomodoroControls() {
  const { isPlaying, play, pause, skip } = usePomodoroContext()

  const tooltipRef = useRef(null)

  return (
    <div className="flex items-center gap-4 relative">
      <Button onClick={isPlaying ? pause : play} className="flex items-center gap-2">
        {isPlaying ? (
          <Fragment>
            <Pause />
            Pausar
          </Fragment>
        ) : (
          <Fragment>
            <Play />
            Iniciar
          </Fragment>
        )}
      </Button>

      <TooltipProvider>
        <Fade in={isPlaying} timeout={300} unmountOnExit nodeRef={tooltipRef}>
          <div ref={tooltipRef} className="absolute right-[-50px]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" onClick={skip}>
                  <SkipForward />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pular</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Fade>
      </TooltipProvider>
    </div>
  )
}
