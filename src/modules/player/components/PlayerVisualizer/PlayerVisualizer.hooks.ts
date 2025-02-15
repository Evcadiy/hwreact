import { useState, useEffect, useRef } from "react";
import { audioUtils } from "../../utils/audioUtils";

export const useFetchAudioData = (audioUrl: string) => {
  const [audioData, setAudioData] = useState<number[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await audioUtils.getAudioData(audioUrl);
        setAudioData(data);
        const audioDuration = await audioUtils.getAudioDuration(audioUrl);
        setDuration(audioDuration);
      } catch (err) {
        setError("Unable to decode audio data");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (audioUrl) {
      fetchData();
    }
  }, [audioUrl]);

  return { audioData, duration, isLoading, error };
};

export const useAudioPlayer = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return {
    currentTime,
    setCurrentTime,
    isPlaying,
    volume,
    isMuted,
    audioRef,
    playAudio,
    pauseAudio,
    stopAudio,
    handleSeek,
    handleVolumeChange,
    toggleMute
  };
};
