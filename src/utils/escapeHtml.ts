// innerHTML 삽입 전 HTML 엔티티로 이스케이프하여 XSS 방어
const escapeHtml = (str: string): string => {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
};

export default escapeHtml;
