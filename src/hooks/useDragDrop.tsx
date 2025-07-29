import { useState, useRef } from "react";

import type { DragEvent, Dispatch, SetStateAction } from "react";
import type { Block } from "types/block";
import type { MockEvent } from "types/note";

type FileDragEvent = DragEvent<HTMLElement>;
type SetBlock = Dispatch<SetStateAction<Block[]>>;

const useDragDrop = (blocks?: Block[], setBlocks?: SetBlock) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBlockDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleBlockDragEnter = (index: number) => {
    if (!blocks || !setBlocks) return;
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedBlocks = [...blocks];
    const draggedBlock = updatedBlocks.splice(draggedIndex, 1)[0];
    updatedBlocks.splice(index, 0, draggedBlock);

    setBlocks(updatedBlocks);
    setDraggedIndex(index);
  };

  const handleBlockDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleFileDragOver = (event: FileDragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleFileDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileDrop = (event: FileDragEvent, onUserUpload: (event: MockEvent) => void) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFiles = [...event.dataTransfer.files];
    droppedFiles.forEach((file) => {
      const mockEvent = { target: { files: [file] } };

      onUserUpload(mockEvent);
    });
  };

  const handleFileInputClick = () => {
    if (!fileInputRef.current) return;

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
