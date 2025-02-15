import { useState } from "react";

export const useDragAndDrop = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent, onFileDrop: (file: File) => void) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio")) {
      onFileDrop(file);
    } else {
      alert("Please drop a valid audio file");
    }
  };

  return {
    isDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
