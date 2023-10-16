"use client";
import { usePomodoroContext } from "@/components/pomodoro";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Pause, Play, SkipForward } from "lucide-react";
import { Fragment } from "react";

export function PomodoroControls() {
  const { isPlaying, play, pause, skip } = usePomodoroContext();

  return (
    <div className="flex items-center gap-4 relative">
      <Button
        onClick={isPlaying ? pause : play}
        className="flex items-center gap-2"
      >
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
        <Tooltip>
          <TooltipTrigger
            asChild
            className={cn(
              "absolute right-[-50px] transition ",
              isPlaying ? "opacity-100" : "opacity-0"
            )}
          >
            <Button size="icon" onClick={skip}>
              <SkipForward />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Pular</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
