import { useEffect, useRef } from "react";

const usePrevBlocks = (blocks) => {
  const prevBlocksRef = useRef();

  useEffect(() => {
    prevBlocksRef.current = blocks;
  }, [blocks]);

  return prevBlocksRef.current;
};

export default usePrevBlocks;
