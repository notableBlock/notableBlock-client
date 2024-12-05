import { create } from "zustand";

const initialBlock = { id: "", html: "", tag: "h1" };

const useNoteStore = create((set) => ({
  blocks: [initialBlock],

  setBlocks: (block) => set({ blocks: block }),
}));

export { useNoteStore, initialBlock };
