import type { BlockElement } from "types/block";

const moveCaretToEnd = (element: BlockElement) => {
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);

  element.focus();
};

export default moveCaretToEnd;
