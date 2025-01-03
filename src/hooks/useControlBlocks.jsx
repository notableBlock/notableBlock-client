import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import { useNavigate } from "react-router";

import { getBlocks } from "../services/note";
import objectId from "../utils/objectId";
import moveCaretToEnd from "../utils/moveCaretToEnd";

const useControlBlocks = () => {
  const navigate = useNavigate();

  const initialBlock = useMemo(() => ({ id: objectId(), html: "", tag: "h1", imageURL: "" }), []);
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
          ? {
              ...block,
              tag: updatedBlock.tag,
              html: updatedBlock.html,
              imageURL: updatedBlock.imageURL,
            }
          : block
      );

      setBlocks(newBlocks);
    },
    [blocks]
  );

  const handleAddBlock = useCallback(
    (currentBlock) => {
      const currentBlockIndex = blocks.findIndex((block) => block.id === currentBlock.id);

      const newBlock = { ...initialBlock, id: objectId(), tag: "p", imageURL: "" };
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

  const handleBlockFocusByArrowKey = (currentBlock, arrowKey) => {
    let targetBlock = null;

    switch (arrowKey) {
      case "ArrowUp":
        targetBlock = currentBlock.ref.previousElementSibling;
        break;
      case "ArrowDown":
        targetBlock = currentBlock.ref.nextElementSibling;
        break;
    }

    if (targetBlock) {
      focusedBlockRef.current = targetBlock;
      setBlocks([...blocks]);
    }
  };

  const getBlocksFromServer = useCallback(
    async (noteId) => {
      try {
        const fetchedBlocks = await getBlocks(noteId);

        fetchedBlocks.length ? setBlocks(fetchedBlocks) : setBlocks([initialBlock]);
      } catch (err) {
        navigate("/error", { state: { message: "해당 노트의 블록을 가져오는데 실패했습니다." } });
      }
    },
    [initialBlock, navigate]
  );

  return {
    blocks,
    handleUpdateBlock,
    handleAddBlock,
    handleDeleteBlock,
    handleBlockFocusByArrowKey,
    getBlocksFromServer,
  };
};

export default useControlBlocks;
