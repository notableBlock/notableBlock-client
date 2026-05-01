import type { Block } from "types/block";

const areBlocksEqual = (a: Block[], b: Block[]): boolean => {
  if (a.length !== b.length) return false;

  return a.every(
    (prev, i) =>
      prev.id === b[i].id &&
      prev.html === b[i].html &&
      prev.tag === b[i].tag &&
      prev.imageUrl === b[i].imageUrl,
  );
};

export default areBlocksEqual;
