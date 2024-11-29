import { useState, useRef, useEffect, useCallback, useMemo } from "react";

import NoteBlock from "./NoteBlock";

import uid from "./utils/uid";
import moveCaretToEnd from "./utils/moveCaretToEnd";

import * as S from "../styles/NoteEditorStyle";

function NoteEditor() {
  const initialBlock = useMemo(() => ({ id: uid(), html: "", tag: "p" }), []);

  const [blocks, setBlocks] = useState([initialBlock]);
  const addedBlockRef = useRef(null);
  const focusedBlockRef = useRef(null);

  const updatedBlocks = useMemo(() => [...blocks], [blocks]);

  useEffect(() => {
    const addedBlock = addedBlockRef.current;
    const focusedBlock = focusedBlockRef.current;

    if (addedBlock) {
      const nextBlock = addedBlock.nextElementSibling;

      if (nextBlock) {
        nextBlock.focus();
        moveCaretToEnd(nextBlock);
      }

      addedBlockRef.current = null;
    } else if (focusedBlock) {
      focusedBlock.focus();
      moveCaretToEnd(focusedBlock);
    }
  }, [blocks.length]);

  const handleUpdateBlock = useCallback(
    (updatedBlock) => {
      const index = blocks.map((block) => block.id).indexOf(updatedBlock.id);

      updatedBlocks[index] = {
        ...updatedBlocks[index],
        tag: updatedBlock.tag,
        html: updatedBlock.html,
      };

      setBlocks(updatedBlocks);
    },
    [blocks, updatedBlocks]
  );

  const handleAddBlock = useCallback(
    (currentBlock) => {
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const newBlock = { ...initialBlock, id: uid() };
      const nextBlock = currentBlock.ref.nextElementSibling;

      updatedBlocks.splice(index + 1, 0, newBlock);
      focusedBlockRef.current = nextBlock;
      addedBlockRef.current = currentBlock.ref;

      setBlocks(updatedBlocks);
    },
    [initialBlock, blocks, updatedBlocks]
  );

  const handleDeleteBlock = useCallback(
    (currentBlock) => {
      const index = blocks.map((block) => block.id).indexOf(currentBlock.id);
      const prevBlock = currentBlock.ref.previousElementSibling;

      focusedBlockRef.current = prevBlock;
      updatedBlocks.splice(index, 1);

      setBlocks(updatedBlocks);
    },
    [blocks, updatedBlocks]
  );

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
