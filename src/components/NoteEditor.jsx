import { useEffect, useState } from "react";

import { useParams, useLocation } from "react-router";

import NoteBlock from "./NoteBlock";
import Loading from "./common/Loading";

import useControlNotes from "../hooks/useControlNotes";
import useControlBlocks from "../hooks/useControlBlocks";
import usePrevBlocks from "../hooks/usePrevBlocks";
import useDragDrop from "../hooks/useDragDrop";

import * as S from "../styles/NoteEditorStyle";

function NoteEditor({ setIsSaving }) {
  const {
    blocks,
    setBlocks,
    handleUpdateBlock,
    handleAddBlock,
    handleDeleteBlock,
    handleBlockFocusByArrowKey,
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
      setIsLoading(true);
      await getBlocksFromServer(noteId);
      setIsLoading(false);
    };

    fetchBlocks();
  }, [getBlocksFromServer, noteId]);

  useEffect(() => {
    if (prevBlocks && JSON.stringify(prevBlocks) !== JSON.stringify(blocks) && !isSharedPage) {
      updateNoteOnServer(blocks, setIsSaving, noteId);
    }
  }, [blocks, noteId, prevBlocks, isSharedPage, setIsSaving, updateNoteOnServer]);

  useEffect(() => {
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      focusNextBlock();
    } else if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      focusPrevBlock();
      cleanUpInvalidBlocksRef();
    }
  }, [blocks, prevBlocks, focusNextBlock, focusPrevBlock, cleanUpInvalidBlocksRef]);

  return (
    <S.NoteEditorLayout onDragOver={(e) => e.preventDefault()}>
      {isLoading ? (
        <Loading />
      ) : (
        blocks.map((block, index) => {
          return (
            <NoteBlock
              key={block.id}
              id={block.id}
              tag={block.tag}
              html={block.html}
              imageUrl={block.imageUrl}
              onUpdatePage={handleUpdateBlock}
              onAddBlock={handleAddBlock}
              onDeleteBlock={handleDeleteBlock}
              onFocusBlockByArrowKey={handleBlockFocusByArrowKey}
              isSharedPage={isSharedPage}
              blockCount={blocks.length}
              ref={(refTarget) => {
                if (!refTarget) return;

                const blockDomNode =
                  refTarget instanceof HTMLElement ? refTarget : refTarget.props.innerRef.current;

                if (blockDomNode) {
                  blocksRef.current[block.id] = blockDomNode;
                }
              }}
              noteId={noteId}
              onDragStart={() => handleBlockDragStart(index)}
              onDragEnter={() => handleBlockDragEnter(index)}
              onDragEnd={handleBlockDragEnd}
              isDragging={index === draggedIndex}
            />
          );
        })
      )}
    </S.NoteEditorLayout>
  );
}

export default NoteEditor;
