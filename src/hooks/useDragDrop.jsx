import { useState, useRef } from "react";

const useDragDrop = (blocks, setBlocks) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleBlockDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleBlockDragEnter = (index) => {
    if (draggedIndex !== index) {
      const updatedBlocks = [...blocks];
      const draggedBlock = updatedBlocks.splice(draggedIndex, 1)[0];
      updatedBlocks.splice(index, 0, draggedBlock);

      setBlocks(updatedBlocks);
      setDraggedIndex(index);
    }
  };

  const handleBlockDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleFileDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileDrop = (e, onImportFromLocal) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = [...e.dataTransfer.files];
    droppedFiles.forEach((file) => {
      const mockEvent = { target: { files: [file] } };

      onImportFromLocal(mockEvent);
    });
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return {
    draggedIndex,
    handleBlockDragStart,
    handleBlockDragEnter,
    handleBlockDragEnd,
    handleFileDragOver,
    handleFileDragLeave,
    handleFileDrop,
    handleFileInputClick,
    fileInputRef,
    isDragging,
  };
};

export default useDragDrop;
