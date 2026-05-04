import { useState, useRef, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import DOMPurify from "isomorphic-dompurify";

import usePrevBlocks from "hooks/usePrevBlocks";

import { getBlocks, getSharedBlocks, deleteNoteImage } from "services/noteServices";

import moveCaretToEnd from "utils/moveCaretToEnd";

import { ALLOWED_BLOCK_TAGS, EDITOR_DOMPURIFY_CONFIG } from "constants/security";

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
        // 부분 업데이트 호환을 위한 spread merge (todo 체크박스 토글 등 partial 호출 지원)
        const mergedBlock = { ...oldBlock, ...updatedBlock };
        const newBlocks = prevBlocks.map((block, index) =>
          index === updatedIndex ? mergedBlock : block
        );

        const hasNoDuplicateImage = !newBlocks.some(
          (block, index) =>
            oldBlock.imageUrl && index !== updatedIndex && block.imageUrl === oldBlock.imageUrl
        );

        if (
          oldBlock.imageUrl &&
          ((oldBlock.tag === "img" && mergedBlock.tag !== "img") ||
            oldBlock.imageUrl !== mergedBlock.imageUrl) &&
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

        // 포커스 불가 블록(이미지, 구분선)은 화살표 이동 시 스킵
        while (
          prevBlocks[targetBlockIndex]?.tag === "img" ||
          prevBlocks[targetBlockIndex]?.tag === "divider"
        ) {
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

    while (
      prevBlockIndex >= 0 &&
      (blocks[prevBlockIndex].tag === "img" || blocks[prevBlockIndex].tag === "divider")
    ) {
      prevBlockIndex--;
    }

    if (prevBlockIndex < 0) {
      prevBlockIndex = blocks.findIndex(
        (block) => block.tag !== "img" && block.tag !== "divider"
      );
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
    async (noteId: string, isShared: boolean = false) => {
      try {
        const fetchedBlocks = isShared
          ? await getSharedBlocks(noteId)
          : await getBlocks(noteId);

        if (!fetchedBlocks.length) {
          setBlocks([initialBlock]);
          return;
        }

        // 서버 데이터 정제: XSS 방어를 위해 렌더링 전 sanitize 및 tag 검증 적용
        const sanitizedBlocks = fetchedBlocks.map((block: Block) => ({
          ...block,
          // ContentEditable에 삽입되는 html을 화이트리스트 태그만 허용하도록 정제
          html: block.html ? DOMPurify.sanitize(block.html, EDITOR_DOMPURIFY_CONFIG) : block.html,
          // 서버 DB는 String 타입이므로 허용되지 않은 태그("script" 등)는 "p"로 대체
          tag: block.tag && ALLOWED_BLOCK_TAGS.has(block.tag) ? block.tag : "p",
        }));

        setBlocks(sanitizedBlocks);
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
