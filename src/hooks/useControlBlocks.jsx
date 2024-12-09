import { useRef, useEffect, useCallback, useMemo } from "react";

import { useNoteStore, initialBlock } from "../stores/useNoteStore";

import uid from "../utils/uid";
import moveCaretToEnd from "../utils/moveCaretToEnd";

const useControlBlocks = () => {
  const { blocks, setBlocks } = useNoteStore();

  const addedBlockRef = useRef(null);
  const focusedBlockRef = useRef(null);

  useEffect(() => {
    const addedBlock = addedBlockRef.current;
    const focusedBlock = focusedBlockRef.current;

    if (addedBlock) {
      const nextBlock = addedBlock.nextElementSibling;

      if (nextBlock) {
        nextBlock.focus();
        moveCaretToEnd(nextBlock);
      }

      addedBlockRef.current = null;
    } else if (focusedBlock) {
      focusedBlock.focus();
      moveCaretToEnd(focusedBlock);
    }
  }, [blocks.length]);

  const handleUpdateBlock = useCallback(
    (updatedBlock) => {
      const updatedIndex = blocks.findIndex((block) => block.id === updatedBlock.id);
      const newBlocks = blocks.map((block, index) =>
        index === updatedIndex
          ? { ...block, tag: updatedBlock.tag, html: updatedBlock.html }
          : block
      );

      setBlocks(newBlocks);
    },
    [blocks, setBlocks]
  );

  const handleAddBlock = useCallback(
    (currentBlock) => {
      const currentBlockIndex = blocks.findIndex((block) => block.id === currentBlock.id);

      const newBlock = { ...initialBlock, id: uid(), tag: "p" };
      const nextBlock = currentBlock.ref.nextElementSibling;

      const newBlocks = [
        ...blocks.slice(0, currentBlockIndex + 1),
        newBlock,
        ...blocks.slice(currentBlockIndex + 1),
      ];

      focusedBlockRef.current = nextBlock;
      addedBlockRef.current = currentBlock.ref;

      setBlocks(newBlocks);
    },
    [blocks, setBlocks]
  );

  const handleDeleteBlock = useCallback(
    (currentBlock) => {
      const currentBlockIndex = blocks.findIndex((block) => block.id === currentBlock.id);

      const prevBlock = currentBlock.ref.previousElementSibling;

      const newBlocks = [
        ...blocks.slice(0, currentBlockIndex),
        ...blocks.slice(currentBlockIndex + 1),
      ];

      if (prevBlock) {
        focusedBlockRef.current = prevBlock;
      }

      setBlocks(newBlocks);
    },
    [blocks, setBlocks]
  );

  return { blocks, handleUpdateBlock, handleAddBlock, handleDeleteBlock };
};

export default useControlBlocks;
