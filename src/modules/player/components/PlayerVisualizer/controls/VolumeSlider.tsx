type VolumeSliderProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

export const VolumeSlider: React.FC<VolumeSliderProps> = ({ audioRef }) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <span className="text-gray-600">Volume</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue={audioRef.current?.volume || 1}
        onChange={handleVolumeChange}
        className="w-64 h-2 bg-gray-300 rounded-lg accent-blue-500 transition-all"
      />
    </div>
  );
};
