import { useState, ReactNode } from "react";
import { PlayerAudioContext } from "./PlayerAudioContext";

export const PlayerAudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const setAudio = (file: File) => {
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
  };

  return (
    <PlayerAudioContext.Provider value={{ audioFile, audioUrl, setAudio }}>
      {children}
    </PlayerAudioContext.Provider>
  );
};
