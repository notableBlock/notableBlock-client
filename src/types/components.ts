import type { ReactNode, MouseEvent, ChangeEvent } from "react";
import type { BlockId, NoteId } from "types/ids";
import type { Block, Tag } from "types/block";
import type { ManageItem, SlashItem, Coordinate } from "types/menu";
import type { TreeRoot, MockEvent } from "types/note";

export interface ButtonProps {
  image: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  type?: "kebab" | "notification";
  dataTestId?: string;
}

export interface FormProps {
  children: ReactNode;
  title: string;
  isNotification?: boolean;
}

export interface NoteEditorProps {
  onSaveStatus: (isSuccess: boolean) => void;
}

export interface NoteBlockProps {
  id: BlockId;
  html: string;
  tag: Tag;
  imageUrl: string;
  isFocusedBlock: boolean;
  isSharedPage: boolean;
  isDragging: boolean;
  onUpdatePage: (updatedBlock: Block) => void;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragStart: () => void;
  onClick: () => void;
}

export type SelectMenuProps<T> = {
  onSelect: (selected: T) => void;
  onClose?: () => void;
  position?: Coordinate;
  menu: ManageItem[] | SlashItem[];
  onImportFromLocal?: (event: ChangeEvent<HTMLInputElement> | MockEvent) => Promise<void>;
};

export interface NoteTreeChartProps {
  noteTree: TreeRoot;
}

export interface NoteViewerProps {
  path: string;
  noteId: NoteId;
  content: Block[];
  creator: string;
  creatorPicture: string;
  createdAt: string;
  editor: string;
  editorPicture: string;
  updatedAt: string;
  isShared: boolean;
  onSelectMenu: (selectedAction: () => Promise<void>) => void;
  kebabMenu: ManageItem[];
}

export interface UploadDropZoneProps {
  onUserUpload: (event: ChangeEvent<HTMLInputElement> | MockEvent) => Promise<void>;
  fileTypes: "마크다운·이미지" | "TAR";
}
