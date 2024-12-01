import { create } from "zustand";

const useSelectionStore = create((set) => ({
  items: [],
  selectionIndex: 0,

  setItems: (items) => set({ items }),
  setSelectionIndex: (index) =>
    set((state) => ({
      selectionIndex: typeof index === "function" ? index(state.selectionIndex) : index,
    })),
}));

export default useSelectionStore;
