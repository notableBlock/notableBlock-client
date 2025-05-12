import type { User } from "types/models";
import type { NoteId, UserId } from "types/ids";
import type { Block } from "types/block";

export interface Note {
  baseNote: NoteId | null;
  blocks: Block[];
  createdAt: string;
  creator: string;
  creatorId: UserId;
  creatorPicture: string;
  editor: string;
  editorId: UserId;
  editorPicture: string;
  isShared: boolean;
  title: string;
  updatedAt: string;
  __v: number;
  _id: NoteId;
}

export interface MockEvent {
  target: {
    files: File[];
  };
}

export type Tree = Pick<User, "id" | "name"> & {
  children: Note[];
};
