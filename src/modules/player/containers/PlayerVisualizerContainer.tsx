import { useState, useEffect, useRef } from "react";
import { AudioControls } from "../components/AudioControls";
import { PlayerVisualizer } from "../components/PlayerVisualizer";
import { audioUtils } from "../utils/audioUtils";

const PlayerVisualizerContainer = ({ audioUrl }: { audioUrl: string }) => {
  const [audioData, setAudioData] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await audioUtils.getAudioData(audioUrl);
        setAudioData(data);
        const audioDuration = await audioUtils.getAudioDuration(audioUrl);
        setDuration(audioDuration);
      } catch (error) {
        console.error("Ошибка при получении аудио данных:", error);
      }
    };

    fetchData();
  }, [audioUrl]);

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

  return (
    <div className="m-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
      />
      <PlayerVisualizer
        audioData={audioData}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isPlaying={isPlaying}
      />
      <AudioControls
        onPlay={playAudio}
        onPause={pauseAudio}
        onStop={stopAudio}
        isPlaying={isPlaying}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />
    </div>
  );
};

export default PlayerVisualizerContainer;
