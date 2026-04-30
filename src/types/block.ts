import type { BlockId } from "types/ids";

export type BlockElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLImageElement
  | HTMLElement;
export type Tag = "h1" | "h2" | "h3" | "p" | "img" | "code";

export interface Block {
  id: BlockId;
  html?: string;
  tag?: Tag;
  imageUrl?: string;
}

export type CurrentBlock = Block & {
  ref?: BlockElement;
};

export interface BlockElementsById {
  [blockId: BlockId]: BlockElement;
}
