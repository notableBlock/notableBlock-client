import escapeHtml from "utils/escapeHtml";

describe("escapeHtml", () => {
  test("<, > 기호를 HTML 엔티티로 변환한다.", () => {
    expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
  });

  test("& 기호를 HTML 엔티티로 변환한다.", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });

  test("빈 문자열은 그대로 빈 문자열을 반환한다.", () => {
    expect(escapeHtml("")).toBe("");
  });

  test("순수 텍스트는 변환 없이 그대로 반환한다.", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });

  test("중첩된 태그도 모두 이스케이프한다.", () => {
    const input = `<div onclick="x">y</div>`;
    const result = escapeHtml(input);

    expect(result).toContain("&lt;div");
    expect(result).toContain("&lt;/div&gt;");
    expect(result).not.toContain("<div");
  });

  test("&lt; 와 같이 이미 엔티티화된 문자열은 &amp;로 추가 이스케이프된다.", () => {
    // textContent → innerHTML 동작에 따라 & 자체가 다시 &amp;로 변환됨
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });
});
