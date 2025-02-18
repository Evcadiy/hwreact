import { AudioControls } from "./controls/AudioControls";
import { PlayerVisualizer } from "./PlayerVisualizer";
import { useAudioFile } from "@/modules/player/context";
import { VolumeSlider } from "./controls/VolumeSlider";
import { MuteButton } from "./controls/MuteButton";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useFetchAudioData } from "./hooks/useFetchAudioData";
import { useAudioVisualizer } from "./hooks/useAudioVisualizer";
import { useMemo } from "react";

const PlayerVisualizerContainer = () => {
  const {
    playAudio,
    pauseAudio,
    stopAudio,
    isPlaying,
    setCurrentTime,
    audioRef,
    currentTime,
    handleSeek
  } = useAudioPlayer();
  const { audioUrl } = useAudioFile();
  const { audioData, duration, isLoading, error } = useFetchAudioData(
    audioUrl!
  );
  const waveformRef = useAudioVisualizer(
    audioData,
    currentTime,
    duration,
    isPlaying,
    handleSeek
  );

  const extraControls = useMemo(
    () => (
      <>
        <VolumeSlider audioRef={audioRef} />
        <MuteButton audioRef={audioRef} />
      </>
    ),
    [audioRef]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="m-4">
      <audio
        ref={audioRef}
        src={audioUrl!}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
      />
      <PlayerVisualizer waveformRef={waveformRef} />
      <AudioControls
        onPause={pauseAudio}
        onPlay={playAudio}
        onStop={stopAudio}
        isPlaying={isPlaying}
        extraControls={extraControls}
      />
    </div>
  );
};

export default PlayerVisualizerContainer;
