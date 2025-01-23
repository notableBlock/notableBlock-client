import { useState } from "react";

const useDragDrop = (blocks, setBlocks) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index) => {
    if (draggedIndex !== index) {
      const updatedBlocks = [...blocks];
      const draggedBlock = updatedBlocks.splice(draggedIndex, 1)[0];
      updatedBlocks.splice(index, 0, draggedBlock);

      setBlocks(updatedBlocks);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return {
    draggedIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };
};

export default useDragDrop;
