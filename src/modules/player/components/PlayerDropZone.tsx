type PlayerDropZoneProps = {
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  audioFile: File | null;
};

const PlayerDropZone: React.FC<PlayerDropZoneProps> = ({
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  audioFile
}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`${
          isDragOver ? "border-green-500" : "border-gray-300"
        } border-2 p-6 w-96 text-center cursor-pointer rounded-lg transition-all`}
      >
        {!audioFile && (
          <p className="text-lg font-medium text-gray-600">
            Drag and drop an audio file here
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerDropZone;
