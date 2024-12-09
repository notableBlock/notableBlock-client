import { create } from "zustand";

import uid from "../utils/uid";

const initialBlock = { id: uid(), html: "", tag: "h1" };

const useNoteStore = create((set) => ({
  blocks: [initialBlock],

  setBlocks: (block) => set({ blocks: block }),
}));

export { useNoteStore, initialBlock };
