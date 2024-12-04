import { create } from "zustand";

const useUserStore = create((set) => ({
  profile: null,

  setProfile: (profile) => set({ profile: profile }),
}));

export default useUserStore;
