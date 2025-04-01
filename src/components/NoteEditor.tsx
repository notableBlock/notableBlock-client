import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";

import NoteBlock from "components/NoteBlock";
import Loading from "components/common/Loading";

import useControlNotes from "hooks/useControlNotes";
import useControlBlocks from "hooks/useControlBlocks";
import usePrevBlocks from "hooks/usePrevBlocks";
import useDragDrop from "hooks/useDragDrop";

import * as S from "styles/components/NoteEditorStyle";

import type { NoteEditorProps } from "types/components";

function NoteEditor({ onSaveStatus }: NoteEditorProps) {
  const {
    blocks,
    setBlocks,
    handleUpdateBlock,
    handleAddBlock,
    handleDeleteBlock,
    handleFocusBlockByArrowKey,
    focusNextBlock,
    focusPrevBlock,
    getBlocksFromServer,
    blocksRef,
    cleanUpInvalidBlocksRef,
  } = useControlBlocks();
  const { updateNoteOnServer } = useControlNotes();
  const prevBlocks = usePrevBlocks(blocks);
  const { draggedIndex, handleBlockDragStart, handleBlockDragEnter, handleBlockDragEnd } =
    useDragDrop(blocks, setBlocks);
  const { noteId } = useParams();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const isSharedPage = pathname.indexOf("/shared") !== -1;

  useEffect(() => {
    const fetchBlocks = async () => {
      if (!noteId) return;

      setIsLoading(true);
      await getBlocksFromServer(noteId);
      setIsLoading(false);
    };

    fetchBlocks();
  }, [getBlocksFromServer, noteId]);

  useEffect(() => {
    if (prevBlocks.length === 0) return;
    if (JSON.stringify(prevBlocks) === JSON.stringify(blocks)) return;
    if (isSharedPage || !noteId) return;

    updateNoteOnServer(blocks, onSaveStatus, noteId);
  }, [blocks, noteId, prevBlocks, isSharedPage, updateNoteOnServer]);

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

  return (
    <S.NoteEditorLayout onDragOver={(event) => event.preventDefault()}>
      {isLoading ? (
        <Loading />
      ) : (
        blocks.map((block, index) => {
          return (
            noteId && (
              <NoteBlock
                key={block.id}
                id={block.id}
                html={block.html}
                tag={block.tag}
                imageUrl={block.imageUrl}
                blockCount={blocks.length}
                noteId={noteId}
                isSharedPage={isSharedPage}
                isDragging={index === draggedIndex}
                onAddBlock={handleAddBlock}
                onDeleteBlock={handleDeleteBlock}
                onUpdatePage={handleUpdateBlock}
                onDragEnd={handleBlockDragEnd}
                onDragEnter={() => handleBlockDragEnter(index)}
                onDragStart={() => handleBlockDragStart(index)}
                onFocusBlockByArrowKey={handleFocusBlockByArrowKey}
                ref={(refTarget) => {
                  if (!refTarget) return;

                  const blockDomNode =
                    refTarget instanceof HTMLElement ? refTarget : refTarget.props.innerRef.current;

                  if (!blockDomNode) return;
                  blocksRef.current[block.id] = blockDomNode;
                }}
              />
            )
          );
        })
      )}
    </S.NoteEditorLayout>
  );
}

export default NoteEditor;
