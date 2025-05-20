import type { User } from "types/models";
import type { NoteId, UserId } from "types/ids";
import type { Block } from "types/block";

export interface Note {
  baseNote: NoteId | null;
  blocks: Block[];
  createdAt: string;
  creator: string;
  creatorId: UserId;
  editor: string;
  editorId: UserId;
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

export type TreeNode = Pick<
  Note,
  "editorId" | "creatorId" | "isShared" | "title" | "creator" | "editor" | "baseNote"
> &
  Pick<User, "userId" | "name"> & {
    noteId: NoteId;
    children: TreeNode[];
  };

export type TreeRoot = Pick<User, "userId" | "name"> & {
  children: TreeNode[];
};
