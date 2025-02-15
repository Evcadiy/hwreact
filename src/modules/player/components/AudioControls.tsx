type AudioControlsProps = {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
};

export const AudioControls: React.FC<AudioControlsProps> = ({
  onPlay,
  onPause,
  onStop,
  isPlaying,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute
}) => {
  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      <div className="flex justify-center gap-6">
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Play
        </button>
        <button
          onClick={onPause}
          disabled={!isPlaying}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:bg-yellow-400 disabled:bg-yellow-300 disabled:cursor-not-allowed"
        >
          Pause
        </button>
        <button
          onClick={onStop}
          disabled={!isPlaying}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:bg-red-400 disabled:bg-red-300 disabled:cursor-not-allowed"
        >
          Stop
        </button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="text-gray-600">Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-64 h-2 bg-gray-300 rounded-lg accent-blue-500 transition-all"
        />
      </div>

      <button
        onClick={onToggleMute}
        className="mt-4 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:bg-gray-400"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};
