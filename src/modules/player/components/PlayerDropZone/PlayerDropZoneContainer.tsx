import { useAudioFile } from "../../context/useAudioFile";
import PlayerDropZone from "./PlayerDropZone";
import { useDragAndDrop } from "./PlayerDropZone.hooks";

const PlayerDropZoneContainer = () => {
  const { audioFile, setAudio } = useAudioFile();
  const { isDragOver, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop();

  return (
    <>
      {!audioFile && (
        <PlayerDropZone
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e: React.DragEvent) => handleDrop(e, setAudio)}
        />
      )}
    </>
  );
};

export default PlayerDropZoneContainer;
