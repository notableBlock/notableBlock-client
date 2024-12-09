import { useEffect } from "react";

import { useParams } from "react-router";

import NoteBlock from "./NoteBlock";

import useControlNotes from "../hooks/useControlNotes";
import useControlBlocks from "../hooks/useControlBlocks";
import usePrevBlocks from "../hooks/usePrevBlocks";

import * as S from "../styles/NoteEditorStyle";

function NoteEditor({ setIsSaving }) {
  const { blocks, handleUpdateBlock, handleAddBlock, handleDeleteBlock } = useControlBlocks();
  const { updateNoteOnServer } = useControlNotes();
  const prevBlocks = usePrevBlocks(blocks);
  const { noteId } = useParams();

  useEffect(() => {
    if (prevBlocks && prevBlocks !== blocks) {
      updateNoteOnServer(blocks, setIsSaving, noteId);
    }
  }, [blocks, noteId, prevBlocks, setIsSaving, updateNoteOnServer]);

  return (
    <S.NoteEditorLayout>
      {blocks.map((block) => {
        return (
          <NoteBlock
            key={block.id}
            id={block.id}
            tag={block.tag}
            html={block.html}
            updatePage={handleUpdateBlock}
            addBlock={handleAddBlock}
            deleteBlock={handleDeleteBlock}
          />
        );
      })}
    </S.NoteEditorLayout>
  );
}

export default NoteEditor;
