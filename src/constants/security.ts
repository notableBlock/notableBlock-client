import type { Tag } from "types/block";

// 렌더링 허용 블록 태그 화이트리스트 (서버의 String 타입 → TS Tag 타입으로 검증)
export const ALLOWED_BLOCK_TAGS = new Set<Tag>(["h1", "h2", "h3", "p", "img", "code"]);

// 에디터 DOMPurify 설정: 허용 인라인 서식 태그
export const EDITOR_DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: ["b", "i", "u", "br", "span", "a", "strong", "em", "div"],
  ALLOWED_ATTR: ["href", "style", "target", "rel"],
};
