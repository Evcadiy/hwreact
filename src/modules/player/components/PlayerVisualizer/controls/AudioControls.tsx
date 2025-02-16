import { memo } from "react";

type AudioControlsProps = {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  isPlaying: boolean;
  extraControls?: React.ReactNode;
};

export const AudioControls = memo<AudioControlsProps>(
  ({ onPlay, onPause, onStop, isPlaying, extraControls }) => {
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

        {extraControls}
      </div>
    );
  }
);
