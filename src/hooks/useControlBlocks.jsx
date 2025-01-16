import { useState, useCallback, useMemo } from "react";

import { useNavigate } from "react-router";

import usePrevBlocks from "./usePrevBlocks";

import { getBlocks } from "../services/note";
import { deleteNoteImage } from "../services/note";
import objectId from "../utils/objectId";
import moveCaretToEnd from "../utils/moveCaretToEnd";

const useControlBlocks = () => {
  const navigate = useNavigate();

  const initialBlock = useMemo(() => ({ id: objectId(), html: "", tag: "h1", imageURL: "" }), []);
  const [blocks, setBlocks] = useState([initialBlock]);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const prevBlocks = usePrevBlocks(blocks);

  const handleUpdateBlock = useCallback(
    (updatedBlock) => {
      const updatedIndex = blocks.findIndex((block) => block.id === updatedBlock.id);
      const oldBlock = blocks[updatedIndex];
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

      if (
        oldBlock.imageURL &&
        ((oldBlock.tag === "img" && updatedBlock.tag !== "img") ||
          oldBlock.imageURL !== updatedBlock.imageURL)
      ) {
        deleteNoteImage(oldBlock.imageURL);
      }
    },
    [blocks]
  );

  const handleAddBlock = useCallback(
    (currentBlock) => {
      setCurrentBlockId(currentBlock.id);

      const currentBlockIndex = blocks.findIndex((block) => block.id === currentBlock.id);
      const newBlock = { ...initialBlock, id: objectId(), tag: "p", imageURL: "" };
      const newBlocks = [
        ...blocks.slice(0, currentBlockIndex + 1),
        newBlock,
        ...blocks.slice(currentBlockIndex + 1),
      ];

      setBlocks(newBlocks);
    },
    [blocks, initialBlock]
  );

  const handleDeleteBlock = useCallback(
    (currentBlock) => {
      setCurrentBlockId(currentBlock.id);

      const currentBlockIndex = blocks.findIndex((block) => block.id === currentBlock.id);
      const newBlocks = [
        ...blocks.slice(0, currentBlockIndex),
        ...blocks.slice(currentBlockIndex + 1),
      ];

      setBlocks(newBlocks);
    },
    [blocks, setBlocks]
  );

  const handleBlockFocusByArrowKey = (currentBlock, arrowKey) => {
    let targetBlockIndex = null;

    switch (arrowKey) {
      case "ArrowUp":
        targetBlockIndex = blocks.findIndex((block) => block.id === currentBlock.id) - 1;
        break;
      case "ArrowDown":
        targetBlockIndex = blocks.findIndex((block) => block.id === currentBlock.id) + 1;
        break;
    }

    const targetBlock = document.querySelector(`[data-block-id="${blocks[targetBlockIndex]?.id}"]`);
    if (targetBlock) {
      moveCaretToEnd(targetBlock);
      targetBlock.focus();
    }
  };

  const focusNextBlock = useCallback(() => {
    const nextBlockIndex = blocks.findIndex((block) => block.id === currentBlockId) + 1;
    const nextBlock = document.querySelector(`[data-block-id="${blocks[nextBlockIndex]?.id}"]`);

    if (nextBlock) {
      moveCaretToEnd(nextBlock);
      nextBlock.focus();
    }
  }, [blocks, currentBlockId]);

  const focusPrevBlock = useCallback(() => {
    const prevBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlockId) - 1;
    const prevBlock = document.querySelector(`[data-block-id="${blocks[prevBlockIndex]?.id}"]`);

    if (prevBlock) {
      moveCaretToEnd(prevBlock);
      prevBlock.focus();
    }
  }, [blocks, currentBlockId, prevBlocks]);

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
    setBlocks,
    currentBlockId,
    handleUpdateBlock,
    handleAddBlock,
    handleDeleteBlock,
    handleBlockFocusByArrowKey,
    getBlocksFromServer,
    focusNextBlock,
    focusPrevBlock,
  };
};

export default useControlBlocks;
