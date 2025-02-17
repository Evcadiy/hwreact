import { memo } from "react";
import Button from "./Button";

type AudioControlsProps = {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  isPlaying: boolean;
  extraControls?: React.ReactNode;
};

export const AudioControls = memo<AudioControlsProps>(
  ({ onPlay, onPause, onStop, isPlaying, extraControls }) => {
    console.log("AudioControls");
    return (
      <div className="flex flex-col items-center gap-6 mt-6">
        <div className="flex justify-center gap-6">
          <Button
            onClick={onPlay}
            disabled={isPlaying}
            className="bg-blue-500 text-white hover:bg-blue-400 disabled:bg-blue-300"
          >
            Play
          </Button>
          <Button
            onClick={onPause}
            disabled={!isPlaying}
            className="bg-yellow-500 text-white hover:bg-yellow-400 disabled:bg-yellow-300"
          >
            Pause
          </Button>
          <Button
            onClick={onStop}
            disabled={!isPlaying}
            className="bg-red-500 text-white hover:bg-red-400 disabled:bg-red-300"
          >
            Stop
          </Button>
        </div>

        {extraControls}
      </div>
    );
  }
);
