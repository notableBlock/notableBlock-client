// 인라인 코드(<code>) 토글: 선택 영역을 감싸거나 이미 감싼 경우 풀기
// Bold/Italic은 document.execCommand로 처리 (한국어 IME 호환성 우선)
// 인라인 code만 직접 구현 — execCommand가 지원하지 않기 때문
export function toggleInlineCode(): void {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;
  const parentEl =
    container.nodeType === Node.ELEMENT_NODE
      ? (container as Element)
      : container.parentElement;

  // 이미 <code> 안에 있는 선택: unwrap
  const existingCode = parentEl?.closest("code");
  if (existingCode) {
    const textNode = document.createTextNode(existingCode.textContent ?? "");
    existingCode.replaceWith(textNode);

    // unwrap 직후 caret 위치를 텍스트 노드로 복원
    const newRange = document.createRange();
    newRange.selectNodeContents(textNode);
    selection.removeAllRanges();
    selection.addRange(newRange);
    return;
  }

  // 새로 <code>로 감싸기
  const wrapper = document.createElement("code");
  try {
    range.surroundContents(wrapper);
  } catch {
    // partial selection이 여러 노드에 걸치면 surroundContents가 throw
    // → extractContents로 분할 후 재삽입
    const fragment = range.extractContents();
    wrapper.appendChild(fragment);
    range.insertNode(wrapper);
  }
}
