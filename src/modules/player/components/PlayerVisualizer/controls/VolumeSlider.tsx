import { useState } from "react";

export const VolumeSlider = ({
  audioRef
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) => {
  const [volume, setVolume] = useState(1);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const getSliderColor = (value: number) => {
    if (value <= 0.4) return "accent-green-400";
    if (value <= 0.7) return "accent-orange-300";
    return "accent-red-400";
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <span className="text-gray-600">Volume</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className={`w-64 h-2 bg-gray-300 rounded-lg ${getSliderColor(volume)} transition-all `}
      />
    </div>
  );
};
