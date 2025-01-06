import { useEffect, useState } from "react";

import { useParams, useLocation } from "react-router";

import NoteBlock from "./NoteBlock";

import useControlNotes from "../hooks/useControlNotes";
import useControlBlocks from "../hooks/useControlBlocks";
import usePrevBlocks from "../hooks/usePrevBlocks";

import Loading from "./common/Loading";

import * as S from "../styles/NoteEditorStyle";

function NoteEditor({ setIsSaving }) {
  const {
    blocks,
    currentBlockId,
    handleUpdateBlock,
    handleAddBlock,
    handleDeleteBlock,
    handleBlockFocusByArrowKey,
    getBlocksFromServer,
  } = useControlBlocks();
  const { updateNoteOnServer } = useControlNotes();
  const prevBlocks = usePrevBlocks(blocks);
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
    if (prevBlocks && JSON.stringify(prevBlocks) !== JSON.stringify(blocks)) {
      updateNoteOnServer(blocks, setIsSaving, noteId);
    }
  }, [blocks, noteId, prevBlocks, setIsSaving, updateNoteOnServer]);

  useEffect(() => {
    const focusNextBlock = () => {
      const nextBlockIndex = blocks.findIndex((block) => block.id === currentBlockId) + 1;
      const nextBlock = document.querySelector(`[data-block-id="${blocks[nextBlockIndex]?.id}"]`);

      if (nextBlock) nextBlock.focus();
    };

    const focusPrevBlock = () => {
      const prevBlockIndex = prevBlocks.findIndex((block) => block.id === currentBlockId) - 1;
      const prevBlock = document.querySelector(`[data-block-id="${blocks[prevBlockIndex]?.id}"]`);

      if (prevBlock) prevBlock.focus();
    };

    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      focusNextBlock();
    } else if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      focusPrevBlock();
    }
  }, [blocks, currentBlockId, prevBlocks]);

  return (
    <S.NoteEditorLayout>
      {isLoading ? (
        <Loading />
      ) : (
        blocks.map((block) => {
          return (
            <NoteBlock
              key={block.id}
              id={block.id}
              tag={block.tag}
              html={block.html}
              imageURL={block.imageURL}
              onUpdatePage={handleUpdateBlock}
              onAddBlock={handleAddBlock}
              onDeleteBlock={handleDeleteBlock}
              onFocusBlockByArrowKey={handleBlockFocusByArrowKey}
              isSharedPage={isSharedPage}
              blockCount={blocks.length}
              noteId={noteId}
            />
          );
        })
      )}
    </S.NoteEditorLayout>
  );
}

export default NoteEditor;
