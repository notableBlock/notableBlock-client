import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import { getBlocks } from "../services/note";

import objectId from "../utils/objectId";
import moveCaretToEnd from "../utils/moveCaretToEnd";

const useControlBlocks = () => {
  const initialBlock = useMemo(() => ({ id: objectId(), html: "", tag: "h1" }), []);
  const [blocks, setBlocks] = useState([initialBlock]);
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
  }, [blocks]);

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
    [blocks]
  );

  const handleAddBlock = useCallback(
    (currentBlock) => {
      const currentBlockIndex = blocks.findIndex((block) => block.id === currentBlock.id);

      const newBlock = { ...initialBlock, id: objectId(), tag: "p" };
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
    [blocks, initialBlock]
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

  const getBlocksFromServer = useCallback(
    async (noteId) => {
      const fetchedBlocks = await getBlocks(noteId);

      fetchedBlocks.length ? setBlocks(fetchedBlocks) : setBlocks([initialBlock]);
    },
    [initialBlock]
  );

  return {
    blocks,
    handleUpdateBlock,
    handleAddBlock,
    handleDeleteBlock,
    getBlocksFromServer,
  };
};

export default useControlBlocks;
