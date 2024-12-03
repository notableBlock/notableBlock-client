import { useEffect } from "react";

import { useParams } from "react-router";
import axios from "axios";

import NoteBlock from "./NoteBlock";

import useControlBlocks from "../hooks/useControlBlocks";
import usePrevBlocks from "../hooks/usePrevBlocks";

import useUserStore from "../stores/useUserStore";

import * as S from "../styles/NoteEditorStyle";

function NoteEditor({ setIsSaving }) {
  const { userId } = useUserStore();
  const { blocks, handleUpdateBlock, handleAddBlock, handleDeleteBlock } = useControlBlocks();
  const prevBlocks = usePrevBlocks(blocks);
  const params = useParams();

  useEffect(() => {
    const updateNoteOnServer = async (blocks) => {
      try {
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/notes`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data: {
            noteId: params.noteId,
            creatorId: userId,
            blocks: blocks,
          },
        });
        setIsSaving(true);
      } catch (err) {
        setIsSaving(false);
        console.log(err);
      }
    };

    if (prevBlocks && prevBlocks !== blocks) {
      updateNoteOnServer(blocks);
    }
  }, [blocks, prevBlocks]);

  return (
    <S.NoteEditorLayout>
      {blocks.map((block, key) => (
        <NoteBlock
          key={key}
          id={block.id}
          tag={block.tag}
          html={block.html}
          updatePage={handleUpdateBlock}
          addBlock={handleAddBlock}
          deleteBlock={handleDeleteBlock}
        />
      ))}
    </S.NoteEditorLayout>
  );
}

export default NoteEditor;
