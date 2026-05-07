import { toggleInlineCode } from "utils/inlineFormat";

const setSelectionByOffsets = (
  startNode: Node,
  startOffset: number,
  endNode: Node,
  endOffset: number,
) => {
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);

  const selection = window.getSelection()!;
  selection.removeAllRanges();
  selection.addRange(range);
};

afterEach(() => {
  document.body.innerHTML = "";
  jest.restoreAllMocks();
});

describe("toggleInlineCode", () => {
  test("selection이 null이면 아무 동작도 하지 않는다.", () => {
    const root = document.createElement("p");
    root.innerHTML = "hello";
    document.body.appendChild(root);

    jest.spyOn(window, "getSelection").mockReturnValue(null);

    expect(() => toggleInlineCode()).not.toThrow();
    expect(root.innerHTML).toBe("hello");
  });

  test("rangeCount가 0이면 아무 동작도 하지 않는다.", () => {
    const root = document.createElement("p");
    root.innerHTML = "hello";
    document.body.appendChild(root);

    window.getSelection()?.removeAllRanges();

    toggleInlineCode();
    expect(root.innerHTML).toBe("hello");
  });

  test("collapsed selection이면 아무 동작도 하지 않는다.", () => {
    const root = document.createElement("p");
    root.innerHTML = "hello";
    document.body.appendChild(root);

    setSelectionByOffsets(root.firstChild!, 2, root.firstChild!, 2);

    toggleInlineCode();
    expect(root.innerHTML).toBe("hello");
  });

  test("단일 텍스트 노드 selection을 <code>로 감싼다.", () => {
    const root = document.createElement("p");
    root.innerHTML = "hello";
    document.body.appendChild(root);

    setSelectionByOffsets(root.firstChild!, 1, root.firstChild!, 4);

    toggleInlineCode();
    expect(root.innerHTML).toBe("h<code>ell</code>o");
  });

  test("이미 <code> 안에 있는 selection은 unwrap된다.", () => {
    const root = document.createElement("p");
    root.innerHTML = "<code>hi</code>";
    document.body.appendChild(root);

    const codeEl = root.querySelector("code")!;
    setSelectionByOffsets(codeEl.firstChild!, 0, codeEl.firstChild!, 2);

    toggleInlineCode();
    expect(root.innerHTML).toBe("hi");
    expect(root.querySelector("code")).toBeNull();
  });

  test("조상에 <code>가 있으면 closest로 찾아 unwrap된다.", () => {
    const root = document.createElement("p");
    root.innerHTML = "<code><span>hi</span></code>";
    document.body.appendChild(root);

    const span = root.querySelector("span")!;
    setSelectionByOffsets(span.firstChild!, 0, span.firstChild!, 2);

    toggleInlineCode();
    expect(root.querySelector("code")).toBeNull();
    expect(root.textContent).toBe("hi");
  });

  test("여러 노드에 걸친 selection은 surroundContents가 throw해도 extractContents 폴백으로 감싸진다.", () => {
    const root = document.createElement("p");
    root.innerHTML = "a<b>bb</b>c";
    document.body.appendChild(root);

    // start: 첫 텍스트 노드 'a'의 끝(offset 1)
    // end: 마지막 텍스트 노드 'c'의 시작(offset 0) — partial node를 가로지르는 selection
    const firstText = root.firstChild!;
    const lastText = root.lastChild!;
    setSelectionByOffsets(firstText, 0, lastText, 1);

    toggleInlineCode();

    const code = root.querySelector("code");
    expect(code).not.toBeNull();
    // 폴백 분기에서 fragment를 그대로 <code>에 넣음 → 텍스트 합산은 "abbc"
    expect(code!.textContent).toBe("abbc");
  });
});
