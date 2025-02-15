import { createContext } from "react";

type AudioFileContextType = {
  audioFile: File | null;
  audioUrl: string | null;
  setAudio: (file: File) => void;
};

export const PlayerAudioContext = createContext<
  AudioFileContextType | undefined
>(undefined);
