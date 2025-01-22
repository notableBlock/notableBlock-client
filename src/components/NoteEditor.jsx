import { useEffect, useState } from "react";

import { useParams, useLocation } from "react-router";

import NoteBlock from "./NoteBlock";
import Loading from "./common/Loading";

import useControlNotes from "../hooks/useControlNotes";
import useControlBlocks from "../hooks/useControlBlocks";
import usePrevBlocks from "../hooks/usePrevBlocks";

import * as S from "../styles/NoteEditorStyle";

function NoteEditor({ setIsSaving }) {
  const {
    blocks,
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
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      focusNextBlock();
    } else if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      focusPrevBlock();
      cleanUpInvalidBlocksRef();
    }
  }, [blocks, prevBlocks, focusNextBlock, focusPrevBlock, cleanUpInvalidBlocksRef]);

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
            />
          );
        })
      )}
    </S.NoteEditorLayout>
  );
}

export default NoteEditor;
