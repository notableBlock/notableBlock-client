import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserState } from "types/store";

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,

      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "user-profile",
    }
  )
);

export default useUserStore;
