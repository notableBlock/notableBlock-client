import { useState, useRef, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

import usePrevBlocks from "hooks/usePrevBlocks";

import { getBlocks, deleteNoteImage } from "services/noteServices";

import moveCaretToEnd from "utils/moveCaretToEnd";

import type { Block, BlockElementsById, CurrentBlock } from "types/block";
import type { ArrowKey } from "types/menu";

const useControlBlocks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialBlock = useMemo<Block>(
    () => ({ id: uuidv4(), html: "", tag: "h1", imageUrl: "" }),
    []
  );
  const [blocks, setBlocks] = useState([initialBlock]);
  const [currentBlockId, setCurrentBlockId] = useState("");
  const [focusedBlockId, setFocusedBlockId] = useState("");
  const blocksRef = useRef<BlockElementsById>({});

  const prevBlocks = usePrevBlocks(blocks);

  const handleUpdateBlock = useCallback(
    (updatedBlock: Block) => {
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
    (currentBlock: CurrentBlock) => {
      setBlocks((prevBlocks) => {
        const currentBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlock.id);
        const newBlock: Block = { ...initialBlock, id: uuidv4(), tag: "p", imageUrl: "" };

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
    (currentBlock: CurrentBlock) => {
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

  const handleFocusBlockByArrowKey = useCallback(
    (currentBlock: CurrentBlock, arrowKey: ArrowKey) => {
      setBlocks((prevBlocks) => {
        const currentBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlock.id);
        if (currentBlockIndex === -1) return prevBlocks;

        let targetBlockIndex =
          arrowKey === "ArrowUp" ? currentBlockIndex - 1 : currentBlockIndex + 1;
        if (targetBlockIndex < 0 || targetBlockIndex >= prevBlocks.length) return prevBlocks;

        while (prevBlocks[targetBlockIndex]?.tag === "img") {
          targetBlockIndex += arrowKey === "ArrowUp" ? -1 : 1;

          if (targetBlockIndex < 0 || targetBlockIndex >= prevBlocks.length) return prevBlocks;
        }

        const targetBlockId = prevBlocks[targetBlockIndex].id;
        const targetBlock = blocksRef.current[targetBlockId];

        if (targetBlock) {
          setFocusedBlockId(targetBlockId);
          moveCaretToEnd(targetBlock);
          targetBlock.focus();
        }

        return prevBlocks;
      });
    },
    []
  );

  const focusNextBlock = useCallback(() => {
    const nextBlockIndex = blocks.findIndex((block) => block.id === currentBlockId) + 1;
    const nextBlockId = blocks[nextBlockIndex].id;
    const nextBlock = blocksRef.current[nextBlockId];

    if (nextBlock) {
      setFocusedBlockId(nextBlockId);
      moveCaretToEnd(nextBlock);
      nextBlock.focus();
    }
  }, [blocks, currentBlockId]);

  const focusPrevBlock = useCallback(() => {
    let prevBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlockId) - 1;

    while (prevBlockIndex >= 0 && blocks[prevBlockIndex].tag === "img") {
      prevBlockIndex--;
    }

    if (prevBlockIndex < 0) {
      prevBlockIndex = blocks.findIndex((block) => block.tag !== "img");
    }

    if (prevBlockIndex < 0) return;

    const prevBlockId = blocks[prevBlockIndex]?.id;
    const prevBlock = blocksRef.current[prevBlockId];

    if (prevBlock) {
      setFocusedBlockId(prevBlockId);
      moveCaretToEnd(prevBlock);
      prevBlock.focus();
    }
  }, [blocks, currentBlockId, prevBlocks]);

  const getBlocksFromServer = useCallback(
    async (noteId: string) => {
      try {
        const fetchedBlocks = await getBlocks(noteId);
        fetchedBlocks.length ? setBlocks(fetchedBlocks) : setBlocks([initialBlock]);
      } catch (err) {
        navigate("/error", {
          state: {
            from: location.pathname,
            message: "해당 노트의 블록을 가져오는데 실패했어요.",
          },
        });
      }
    },
    [initialBlock, navigate, location]
  );

  const cleanUpInvalidBlocksRef = () => {
    Object.keys(blocksRef.current).forEach((blockId) => {
      if (!blocksRef.current[blockId]?.isConnected) {
        delete blocksRef.current[blockId];
      }
    });
  };

  return {
    blocksState: {
      blocks,
      setBlocks,
    },
    focusState: {
      focusedBlockId,
      setFocusedBlockId,
      currentBlockId,
    },
    blockActions: {
      handleUpdateBlock,
      handleAddBlock,
      handleDeleteBlock,
      handleFocusBlockByArrowKey,
    },
    focusActions: {
      focusNextBlock,
      focusPrevBlock,
    },
    server: {
      getBlocksFromServer,
    },
    refs: {
      blocksRef,
      cleanUpInvalidBlocksRef,
    },
  };
};

export default useControlBlocks;
