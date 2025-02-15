import { useFetchAudioData, useAudioPlayer } from "./PlayerVisualizer.hooks";
import { AudioControls } from "./AudioControls";
import { PlayerVisualizer } from "./PlayerVisualizer";
import { useAudioFile } from "../../context/useAudioFile";

const PlayerVisualizerContainer = () => {
  const {
    playAudio,
    pauseAudio,
    stopAudio,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
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
      <PlayerVisualizer
        audioData={audioData}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isPlaying={isPlaying}
      />
      <AudioControls
        onPause={pauseAudio}
        onPlay={playAudio}
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
