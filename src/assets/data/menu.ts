import type { SlashItem } from "types/menu";

const tagsMenu: SlashItem[] = [
  {
    id: "page-title",
    tag: "h1",
    label: "섹션 제목(대)",
  },
  {
    id: "heading",
    tag: "h2",
    label: "섹션 제목(중)",
  },
  {
    id: "subheading",
    tag: "h3",
    label: "섹션 제목(소)",
  },
  {
    id: "paragraph",
    tag: "p",
    label: "텍스트",
  },
  {
    id: "image",
    tag: "img",
    label: "이미지",
  },
];

export { tagsMenu };
