import { create } from "zustand";

const useUserStore = create((set) => ({
  profile: {},

  setProfile: (profile) => set({ profile: profile }),
}));

export default useUserStore;
