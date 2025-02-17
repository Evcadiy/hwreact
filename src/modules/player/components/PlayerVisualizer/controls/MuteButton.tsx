import { useState } from "react";
import Button from "./Button";

export const MuteButton = ({
  audioRef
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <Button
      onClick={toggleMute}
      className={`mt-4 ${isMuted ? "bg-gray-400" : "bg-gray-500"} text-white hover:bg-gray-400`}
    >
      {isMuted ? "Unmute" : "Mute"}
    </Button>
  );
};
