import { create } from "zustand";

const useNotificationStore = create((set) => ({
  toast: [],
  allNotification: [],
  isToastVisible: true,

  setToast: (toast) => set({ toast }),

  setAddNotification: (notification) =>
    set((state) => ({
      allNotification: [...state.allNotification, notification],
    })),

  setRemoveNotification: (notificationId) =>
    set((state) => ({
      allNotification: state.allNotification.filter(
        (notification) => notification._id !== notificationId
      ),
    })),

  SetIsToastVisible: (isToastVisible) => set({ isToastVisible }),
}));

export default useNotificationStore;
