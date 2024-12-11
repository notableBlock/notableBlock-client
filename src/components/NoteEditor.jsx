import { useEffect, useState } from "react";

import { useParams } from "react-router";

import NoteBlock from "./NoteBlock";

import useControlNotes from "../hooks/useControlNotes";
import useControlBlocks from "../hooks/useControlBlocks";
import usePrevBlocks from "../hooks/usePrevBlocks";

import Loading from "./common/Loading";

import * as S from "../styles/NoteEditorStyle";

function NoteEditor({ setIsSaving }) {
  const { blocks, handleUpdateBlock, handleAddBlock, handleDeleteBlock, getBlocksFromServer } =
    useControlBlocks();
  const { updateNoteOnServer } = useControlNotes();
  const prevBlocks = usePrevBlocks(blocks);
  const { noteId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <S.NoteEditorLayout>
      {isLoading ? (
        <Loading />
      ) : (
        blocks.map((block) => (
          <NoteBlock
            key={block.id}
            id={block.id}
            tag={block.tag}
            html={block.html}
            updatePage={handleUpdateBlock}
            addBlock={handleAddBlock}
            deleteBlock={handleDeleteBlock}
          />
        ))
      )}
    </S.NoteEditorLayout>
  );
}

export default NoteEditor;
