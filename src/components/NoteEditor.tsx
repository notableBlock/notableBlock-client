import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router";

import NoteBlock from "components/NoteBlock";
import Loading from "components/common/Loading";

import BlockActionsContext from "contexts/BlockActionsContext";

import useControlNotes from "hooks/useControlNotes";
import useControlBlocks from "hooks/useControlBlocks";
import usePrevBlocks from "hooks/usePrevBlocks";
import useDragDrop from "hooks/useDragDrop";

import areBlocksEqual from "utils/areBlocksEqual";

import * as S from "styles/components/NoteEditorStyle";

import type { NoteEditorProps } from "types/components";

function NoteEditor({ onSaveStatus }: NoteEditorProps) {
  const {
    blocksState: { blocks, setBlocks },
    focusState: { focusedBlockId, setFocusedBlockId },
    blockActions: {
      handleUpdateBlock,
      handleAddBlock,
      handleDeleteBlock,
      handleFocusBlockByArrowKey,
    },
    focusActions: { focusNextBlock, focusPrevBlock },
    server: { getBlocksFromServer },
    refs: { blocksRef, cleanUpInvalidBlocksRef },
  } = useControlBlocks();

  const {
    noteActions: { updateNoteOnServerDebounced, flushNoteUpdate },
  } = useControlNotes();

  const prevBlocks = usePrevBlocks(blocks);
  const {
    dragState: { draggedIndex },
    dragHandlers: { handleBlockDragStart, handleBlockDragEnter, handleBlockDragEnd },
  } = useDragDrop(blocks, setBlocks);
  const { noteId } = useParams();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const isSharedPage = pathname.indexOf("/shared") !== -1;

  useEffect(() => {
    const fetchBlocks = async () => {
      if (!noteId) return;

      setIsLoading(true);
      await getBlocksFromServer(noteId, isSharedPage);
      setIsLoading(false);
    };

    fetchBlocks();
  }, [getBlocksFromServer, noteId]);

  useEffect(() => {
    if (prevBlocks.length === 0) return;
    if (areBlocksEqual(prevBlocks, blocks)) return;
    if (isSharedPage || !noteId) return;

    onSaveStatus(false);
    updateNoteOnServerDebounced(blocks, onSaveStatus, noteId);
  }, [blocks, noteId, prevBlocks, isSharedPage, updateNoteOnServerDebounced, onSaveStatus]);

  // beforeunload 핸들러에서 stale closure 방지를 위해 최신 상태를 ref에 보관
  const latestStateRef = useRef({ blocks, prevBlocks, isSharedPage, noteId });
  useEffect(() => {
    latestStateRef.current = { blocks, prevBlocks, isSharedPage, noteId };
  });

  // SPA 라우팅 이탈: 컴포넌트 unmount 시 디바운스 큐에 대기 중인 변경 즉시 저장
  useEffect(() => {
    return () => {
      flushNoteUpdate();
    };
  }, [flushNoteUpdate]);

  // 브라우저 닫기/새로고침: fetch keepalive로 페이지 종료 후에도 요청 보장
  useEffect(() => {
    const handleBeforeUnload = () => {
      const {
        blocks: latestBlocks,
        prevBlocks: latestPrevBlocks,
        isSharedPage: latestIsShared,
        noteId: latestNoteId,
      } = latestStateRef.current;

      if (latestIsShared || !latestNoteId) return;
      if (areBlocksEqual(latestPrevBlocks, latestBlocks)) return;

      fetch(`${import.meta.env.VITE_SERVER_URL}/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ data: { noteId: latestNoteId, blocks: latestBlocks } }),
        credentials: "include",
        keepalive: true,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (!prevBlocks) return;

    if (prevBlocks.length + 1 === blocks.length) {
      return focusNextBlock();
    }

    if (prevBlocks.length - 1 === blocks.length) {
      focusPrevBlock();
      cleanUpInvalidBlocksRef();
    }
  }, [blocks, prevBlocks, focusNextBlock, focusPrevBlock, cleanUpInvalidBlocksRef]);

  const blockActionsValue = {
    noteId: noteId || "",
    blockCount: blocks.length,
    handleAddBlock,
    handleDeleteBlock,
    handleFocusBlockByArrowKey,
  };

  return (
    <BlockActionsContext.Provider value={blockActionsValue}>
      <S.Layout onDragOver={(event) => event.preventDefault()}>
        {isLoading ? (
          <Loading />
        ) : (
          blocks.map((block, index) => {
            return (
              noteId && (
                <NoteBlock
                  key={block.id}
                  id={block.id}
                  html={block.html ?? ""}
                  tag={block.tag ?? "p"}
                  imageUrl={block.imageUrl ?? ""}
                  isFocusedBlock={block.id === focusedBlockId}
                  isSharedPage={isSharedPage}
                  isDragging={index === draggedIndex}
                  onUpdatePage={handleUpdateBlock}
                  onDragEnd={handleBlockDragEnd}
                  onDragEnter={() => handleBlockDragEnter(index)}
                  onDragStart={() => handleBlockDragStart(index)}
                  onClick={() => setFocusedBlockId(block.id)}
                  ref={(refTarget) => {
                    if (!refTarget) return;

                    const blockDomNode =
                      refTarget instanceof HTMLElement
                        ? refTarget
                        : refTarget.props.innerRef.current;

                    if (!blockDomNode) return;
                    blocksRef.current[block.id] = blockDomNode;
                  }}
                />
              )
            );
          })
        )}
      </S.Layout>
    </BlockActionsContext.Provider>
  );
}

export default NoteEditor;
