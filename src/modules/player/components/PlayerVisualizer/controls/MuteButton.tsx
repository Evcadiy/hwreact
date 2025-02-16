import { useState } from "react";

type MuteButtonProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

export const MuteButton: React.FC<MuteButtonProps> = ({ audioRef }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="mt-4 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:bg-gray-400"
    >
      {isMuted ? "Unmute" : "Mute"}
    </button>
  );
};
