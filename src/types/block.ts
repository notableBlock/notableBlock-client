import type { BlockId } from "types/ids";

export type BlockElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLImageElement
  | HTMLElement;
export type Tag = "h1" | "h2" | "h3" | "p" | "img" | "code" | "blockquote" | "divider" | "todo";

export interface Block {
  id: BlockId;
  html?: string;
  tag?: Tag;
  imageUrl?: string;
  // todo 블록 체크 상태 (todo 외 블록에서는 무시)
  checked?: boolean;
}

export type CurrentBlock = Block & {
  ref?: BlockElement;
};

export interface BlockElementsById {
  [blockId: BlockId]: BlockElement;
}
