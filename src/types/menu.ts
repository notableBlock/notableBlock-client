import type { Tag } from "types/block";

type ManageLabel =
  | "공유하기"
  | "로컬로 내보내기"
  | "삭제하기"
  | "새 노트 만들기"
  | "로컬에서 가져오기"
  | "내 노트로 가져오기"
  | "현재 메뉴를 불러올 수 없어요. 새로고침 해주세요.";
type SlashLabel = "섹션 제목(대)" | "섹션 제목(중)" | "섹션 제목(소)" | "텍스트" | "이미지";
type SlashId = "page-title" | "heading" | "subheading" | "paragraph" | "image";
export type ArrowKey = "ArrowUp" | "ArrowDown";

export interface ManageItem {
  id: number;
  label: ManageLabel;
  tag?: () => Promise<void>;
}

export interface SlashItem {
  id: SlashId;
  label: SlashLabel;
  tag: Tag;
}

export interface Coordinate {
  x: number;
  y: number;
}
