import { create } from "zustand";

import type { SelectionState } from "types/store";

const useSelectionStore = create<SelectionState>()((set) => ({
  items: [],
  selectionIndex: 0,

  setItems: (items) => set({ items }),
  setSelectionIndex: (index) =>
    set((state) => ({
      selectionIndex: typeof index === "function" ? index(state.selectionIndex) : index,
    })),
}));

export default useSelectionStore;
