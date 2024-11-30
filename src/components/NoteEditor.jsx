import NoteBlock from "./NoteBlock";

import useControlBlocks from "../hooks/useControlBlocks";

import * as S from "../styles/NoteEditorStyle";

function NoteEditor() {
  const { blocks, handleUpdateBlock, handleAddBlock, handleDeleteBlock } = useControlBlocks();

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
