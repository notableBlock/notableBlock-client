import { useState, useCallback, useMemo } from "react";

import { useNavigate } from "react-router";

import usePrevBlocks from "./usePrevBlocks";

import { getBlocks } from "../services/note";
import { deleteNoteImage } from "../services/note";
import objectId from "../utils/objectId";
import moveCaretToEnd from "../utils/moveCaretToEnd";

const useControlBlocks = () => {
  const navigate = useNavigate();

  const initialBlock = useMemo(() => ({ id: objectId(), html: "", tag: "h1", imageUrl: "" }), []);
  const [blocks, setBlocks] = useState([initialBlock]);
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const prevBlocks = usePrevBlocks(blocks);

  const handleUpdateBlock = useCallback(
    (updatedBlock) => {
      setBlocks((prevBlocks) => {
        const updatedIndex = prevBlocks.findIndex((block) => block.id === updatedBlock.id);

        if (updatedIndex === -1) {
          return prevBlocks;
        }

        const oldBlock = prevBlocks[updatedIndex];
        const newBlocks = prevBlocks.map((block, index) =>
          index === updatedIndex
            ? {
                ...block,
                tag: updatedBlock.tag,
                html: updatedBlock.html,
                imageUrl: updatedBlock.imageUrl,
              }
            : block
        );

        const hasNoDuplicateImage = !newBlocks.some(
          (block, index) =>
            oldBlock.imageUrl && index !== updatedIndex && block.imageUrl === oldBlock.imageUrl
        );

        if (
          oldBlock.imageUrl &&
          ((oldBlock.tag === "img" && updatedBlock.tag !== "img") ||
            oldBlock.imageUrl !== updatedBlock.imageUrl) &&
          hasNoDuplicateImage
        ) {
          deleteNoteImage(oldBlock.imageUrl);
        }

        return newBlocks;
      });
    },
    [setBlocks]
  );

  const handleAddBlock = useCallback(
    (currentBlock) => {
      setBlocks((prevBlocks) => {
        const currentBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlock.id);
        const newBlock = { ...initialBlock, id: objectId(), tag: "p", imageUrl: "" };
        return [
          ...prevBlocks.slice(0, currentBlockIndex + 1),
          newBlock,
          ...prevBlocks.slice(currentBlockIndex + 1),
        ];
      });

      setCurrentBlockId(currentBlock.id);
    },
    [initialBlock]
  );

  const handleDeleteBlock = useCallback(
    (currentBlock) => {
      setBlocks((prevBlocks) => {
        const currentBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlock.id);
        const newBlocks = [
          ...prevBlocks.slice(0, currentBlockIndex),
          ...prevBlocks.slice(currentBlockIndex + 1),
        ];

        setCurrentBlockId(currentBlock.id);

        return newBlocks;
      });
    },
    [setCurrentBlockId]
  );

  const handleBlockFocusByArrowKey = useCallback(
    (currentBlock, arrowKey) => {
      setBlocks((prevBlocks) => {
        const currentBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlock.id);

        if (currentBlockIndex === -1) {
          return prevBlocks;
        }

        let targetBlockIndex =
          arrowKey === "ArrowUp" ? currentBlockIndex - 1 : currentBlockIndex + 1;

        if (targetBlockIndex < 0 || targetBlockIndex >= prevBlocks.length) return prevBlocks;

        while (prevBlocks[targetBlockIndex]?.tag === "img") {
          targetBlockIndex += arrowKey === "ArrowUp" ? -1 : 1;

          if (targetBlockIndex < 0 || targetBlockIndex >= prevBlocks.length) return prevBlocks;
        }

        const targetBlock = document.querySelector(
          `[data-block-id="${prevBlocks[targetBlockIndex].id}"]`
        );

        if (targetBlock) {
          moveCaretToEnd(targetBlock);
          targetBlock.focus();
        }

        return prevBlocks;
      });
    },
    [setBlocks]
  );

  const focusNextBlock = useCallback(() => {
    const nextBlockIndex = blocks.findIndex((block) => block.id === currentBlockId) + 1;
    const nextBlock = document.querySelector(`[data-block-id="${blocks[nextBlockIndex]?.id}"]`);

    if (nextBlock) {
      moveCaretToEnd(nextBlock);
      nextBlock.focus();
    }
  }, [blocks, currentBlockId]);

  const focusPrevBlock = useCallback(() => {
    const prevBlockIndex = Math.max(
      prevBlocks.findIndex((block) => block.id === currentBlockId) - 1,
      0
    );
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
