import {
  Heading1,
  Heading2,
  Heading3,
  Type,
  Image,
  Code,
  Quote,
  Minus,
  CheckSquare,
} from "lucide-react";

import type { SlashItem } from "types/menu";

const ICON_SIZE = 18;

const tagsMenu: SlashItem[] = [
  {
    id: "page-title",
    tag: "h1",
    label: "섹션 제목(대)",
    icon: <Heading1 size={ICON_SIZE} aria-hidden />,
    description: "큰 섹션 제목",
  },
  {
    id: "heading",
    tag: "h2",
    label: "섹션 제목(중)",
    icon: <Heading2 size={ICON_SIZE} aria-hidden />,
    description: "중간 섹션 제목",
  },
  {
    id: "subheading",
    tag: "h3",
    label: "섹션 제목(소)",
    icon: <Heading3 size={ICON_SIZE} aria-hidden />,
    description: "작은 섹션 제목",
  },
  {
    id: "paragraph",
    tag: "p",
    label: "텍스트",
    icon: <Type size={ICON_SIZE} aria-hidden />,
    description: "일반 본문 텍스트",
  },
  {
    id: "todo",
    tag: "todo",
    label: "할 일",
    icon: <CheckSquare size={ICON_SIZE} aria-hidden />,
    description: "체크박스가 있는 할 일 목록",
  },
  {
    id: "blockquote",
    tag: "blockquote",
    label: "인용",
    icon: <Quote size={ICON_SIZE} aria-hidden />,
    description: "강조하고 싶은 인용 구문",
  },
  {
    id: "divider",
    tag: "divider",
    label: "구분선",
    icon: <Minus size={ICON_SIZE} aria-hidden />,
    description: "섹션 사이의 가로 구분선",
  },
  {
    id: "image",
    tag: "img",
    label: "이미지",
    icon: <Image size={ICON_SIZE} aria-hidden />,
    description: "이미지 업로드",
  },
  {
    id: "code-block",
    tag: "code",
    label: "코드 블록",
    icon: <Code size={ICON_SIZE} aria-hidden />,
    description: "고정폭 코드 영역 (``` 입력으로도 생성)",
  },
];

export { tagsMenu };
