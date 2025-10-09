import { createContext, useContext } from "react";

import type { CurrentBlock } from "types/block";
import type { NoteId } from "types/ids";
import type { ArrowKey } from "types/menu";

interface BlockActionsContextValue {
  noteId: NoteId;
  blockCount: number;
  handleAddBlock: (currentBlock: CurrentBlock) => void;
  handleDeleteBlock: (currentBlock: CurrentBlock) => void;
  handleFocusBlockByArrowKey: (currentBlock: CurrentBlock, arrowKey: ArrowKey) => void;
}

const BlockActionsContext = createContext<BlockActionsContextValue | null>(null);

export const useBlockActions = () => {
  const context = useContext(BlockActionsContext);

  if (!context) {
    throw new Error("useBlockActions은 BlockActionsProvider 내에서 사용되어야 합니다.");
  }

  return context;
};

export default BlockActionsContext;
