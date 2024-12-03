import { useRef, useEffect, useCallback, useMemo } from "react";

import { useNoteStore, initialBlock } from "../stores/useNoteStore";

import uid from "../utils/uid";
import moveCaretToEnd from "../utils/moveCaretToEnd";

const useControlBlocks = () => {
  const { blocks, setBlocks } = useNoteStore();

  const addedBlockRef = useRef(null);
  const focusedBlockRef = useRef(null);

  const updatedBlocks = useMemo(() => [...blocks], [blocks]);

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
      const index = blocks.map((block) => block.id).indexOf(updatedBlock.id);

      updatedBlocks[index] = {
        ...updatedBlocks[index],
        tag: updatedBlock.tag,
        html: updatedBlock.html,
      };

      setBlocks(updatedBlocks);
    },
    [blocks, updatedBlocks, setBlocks]
  );

  const handleAddBlock = useCallback(
    (currentBlock) => {
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const newBlock = { ...initialBlock, id: uid(), tag: "p" };
      const nextBlock = currentBlock.ref.nextElementSibling;

      updatedBlocks.splice(index + 1, 0, newBlock);
      focusedBlockRef.current = nextBlock;
      addedBlockRef.current = currentBlock.ref;

      setBlocks(updatedBlocks);
    },
    [blocks, setBlocks, updatedBlocks]
  );

  const handleDeleteBlock = useCallback(
    (currentBlock) => {
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const prevBlock = currentBlock.ref.previousElementSibling;

      if (prevBlock) {
        focusedBlockRef.current = prevBlock;
        updatedBlocks.splice(index, 1);

        setBlocks(updatedBlocks);
      }
    },
    [blocks, updatedBlocks, setBlocks]
  );

  return { blocks, handleUpdateBlock, handleAddBlock, handleDeleteBlock };
};

export default useControlBlocks;
