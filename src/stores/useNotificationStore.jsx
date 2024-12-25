import { create } from "zustand";

const useNotificationStore = create((set) => ({
  toast: [],
  allNotification: [],
  isToastVisible: true,

  setToast: (toast) => set({ toast }),

  setIsToastVisible: (isToastVisible) => set({ isToastVisible }),

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
}));

export default useNotificationStore;
