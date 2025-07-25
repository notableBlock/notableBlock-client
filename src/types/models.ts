import { UserId } from "types/ids";

export interface User {
  userId: UserId;
  name: string;
  picture: string;
}

export interface Notification {
  link: string | null;
  message: string;
  receivedAt: string;
  recipientId: string;
  __v: number;
  _id: string;
}
