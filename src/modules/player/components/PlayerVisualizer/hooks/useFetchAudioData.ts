import { useState, useEffect } from "react";
import { audioUtils } from "@/modules/player/utils/audioUtils";

export const useFetchAudioData = (audioUrl: string) => {
  const [audioData, setAudioData] = useState<number[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await audioUtils.getAudioData(audioUrl);
        setAudioData(data);
        const audioDuration = await audioUtils.getAudioDuration(audioUrl);
        setDuration(audioDuration);
      } catch (err) {
        setError("Unable to decode audio data");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (audioUrl) {
      fetchData();
    }
  }, [audioUrl]);

  return { audioData, duration, isLoading, error };
};
