import { useState } from "react";
import PlayerDropZone from "../components/PlayerDropZone";
import PlayerVisualizerContainer from "./PlayerVisualizerContainer";

const PlayerDropContainer = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio")) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
    } else {
      alert("Please drop a valid audio file");
    }
  };

  return (
    <>
      {!audioFile && (
        <PlayerDropZone
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          audioFile={audioFile}
        />
      )}
      {audioFile && <PlayerVisualizerContainer audioUrl={audioUrl || ""} />}
    </>
  );
};

export default PlayerDropContainer;
