import { useContext } from "react";
import { PlayerAudioContext } from "./PlayerAudioContext";

export const useAudioFile = () => {
  const context = useContext(PlayerAudioContext);
  if (!context) {
    throw new Error("useAudioFile must be used within a PlayerAudioProvider");
  }
  return context;
};
