"use client";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSound from "use-sound";
import type { PomodoroStore } from "./types";

export const PomodoroContext = createContext<PomodoroStore>(
  {} as PomodoroStore
);

export function PomodoroProvider(props: PropsWithChildren<{}>) {
  const [time, setTime] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const skip = useCallback(() => {
    setTime(0);
    setIsPlaying(false);
  }, []);

  const [playSound] = useSound("/sounds/success.mp3", {
    volume: 0.5,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        if (time > 0) {
          const minutes = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
          const seconds = (time % 60).toString().padStart(2, "0");
          setTime(time - 1);
          document.title = `${minutes}:${seconds} - Workstation`;
        } else {
          clearInterval(timer);
          document.title = "Workstation";
          setIsPlaying(false);
          playSound();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time, playSound, isPlaying]);

  const minutes = useMemo(
    () =>
      Math.floor(time / 60)
        .toString()
        .padStart(2, "0"),
    [time]
  );

  const seconds = useMemo(
    () => (time % 60).toString().padStart(2, "0"),
    [time]
  );

  return (
    <PomodoroContext.Provider
      value={{
        time: {
          value: time,
          minutes,
          seconds,
        },
        isPlaying,
        play,
        pause,
        skip,
      }}
      {...props}
    />
  );
}
