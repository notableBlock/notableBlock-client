import { create } from "zustand";

const useUserStore = create((set) => ({
  userId: null,
  idToken: null,

  setUserId: (userId) => set({ userId: userId }),
  setIdToken: (idToken) => set({ idToken: idToken }),
}));

export default useUserStore;
