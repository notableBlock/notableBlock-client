const tagsMenu = [
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
  {
    id: "delete",
    tag: "",
    label: "삭제",
  },
];

const creationMenu = [
  { id: "1", tag: "create a New Note", label: "새 노트 생성하기" },
  { id: "2", tag: "import to Local", label: "로컬에서 가져오기" },
];

export { tagsMenu, creationMenu };
