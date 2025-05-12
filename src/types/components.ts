import type { ReactNode, MouseEvent, ChangeEvent } from "react";
import type { BlockId, NoteId } from "types/ids";
import type { Block, CurrentBlock, Tag } from "types/block";
import type { ManageItem, SlashItem, ArrowKey, Coordinate } from "types/menu";
import type { Tree, MockEvent } from "types/note";

export interface ButtonProps {
  image: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  type: string;
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
  blockCount: number;
  noteId: NoteId;
  isSharedPage: boolean;
  isDragging: boolean;
  onAddBlock: (currentBlock: CurrentBlock) => void;
  onDeleteBlock: (currentBlock: CurrentBlock) => void;
  onUpdatePage: (updatedBlock: Block) => void;
  onDragEnd: () => void;
  onDragEnter: () => void;
  onDragStart: () => void;
  onFocusBlockByArrowKey: (currentBlock: CurrentBlock, arrowKey: ArrowKey) => void;
}

export type SelectMenuProps<T> = {
  onSelect: (selected: T) => void;
  onClose?: () => void;
  position?: Coordinate;
  menu: ManageItem[] | SlashItem[];
  onImportFromLocal?: (event: ChangeEvent<HTMLInputElement> | MockEvent) => Promise<void>;
};

export interface NoteTreeChartProps {
  noteData: Tree;
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
