import { create } from "zustand";

const initialBlock = { id: "", html: "", tag: "h1" };

const useNoteStore = create((set) => ({
  noteId: "",
  blocks: [initialBlock],

  setNoteId: (noteId) => set({ noteId: noteId }),
  setBlocks: (block) => set({ blocks: block }),
}));

export { useNoteStore, initialBlock };
