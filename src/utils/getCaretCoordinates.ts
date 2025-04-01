const getCaretCoordinates = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(false);

  const rect = range.getClientRects()[0];
  const x = rect?.left;
  const y = rect?.top;

  return { x, y };
};

export default getCaretCoordinates;
