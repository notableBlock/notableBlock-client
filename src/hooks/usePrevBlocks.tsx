import { useEffect, useRef } from "react";

import type { Block } from "types/block";

const usePrevBlocks = (blocks: Block[]) => {
  const prevBlocksRef = useRef<Block[]>([]);

  useEffect(() => {
    prevBlocksRef.current = blocks;
  }, [blocks]);

  return prevBlocksRef.current;
};

export default usePrevBlocks;
