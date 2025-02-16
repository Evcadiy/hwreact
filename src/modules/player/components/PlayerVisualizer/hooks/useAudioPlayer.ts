import { useState, useRef, useCallback } from "react";

export const useAudioPlayer = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    }
  }, [isPlaying]);

  const handleSeek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  return {
    currentTime,
    setCurrentTime,
    isPlaying,
    audioRef,
    playAudio,
    pauseAudio,
    stopAudio,
    handleSeek
  };
};
