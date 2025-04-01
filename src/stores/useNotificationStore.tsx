import { create } from "zustand";

import type { NotificationState } from "types/store";

const useNotificationStore = create<NotificationState>()((set) => ({
  toast: [],
  isToastVisible: true,
  allNotification: [],

  setToast: (toast) => set({ toast }),
  setIsToastVisible: (isToastVisible) => set({ isToastVisible }),
  setAllNotification: (allNotification) => set({ allNotification }),
  setRemoveNotification: (notificationId) =>
    set((state) => ({
      allNotification: state.allNotification.filter(
        (notification) => notification._id !== notificationId
      ),
    })),
}));

export default useNotificationStore;
