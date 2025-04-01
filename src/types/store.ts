import type { User } from "types/models";
import type { Notification } from "types/models";
import type { ManageItem, SlashItem } from "types/menu";

export interface NotificationState {
  toast: Notification[];
  isToastVisible: boolean;
  allNotification: Notification[];

  setToast: (toast: Notification[]) => void;
  setIsToastVisible: (isToastVisible: boolean) => void;
  setAllNotification: (allNotification: Notification[]) => void;
  setRemoveNotification: (notificationId: string) => void;
}

export interface SelectionState {
  items: ManageItem[] | SlashItem[];
  selectionIndex: number;

  setItems: (items: ManageItem[] | SlashItem[]) => void;
  setSelectionIndex: (index: number | ((index: number) => number)) => void;
}

export interface UserState {
  profile: User | null;

  setProfile: (profile: User) => void;
  clearProfile: () => void;
}
