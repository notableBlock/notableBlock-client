import moveCaretToEnd from "utils/moveCaretToEnd";

afterEach(() => {
  document.body.innerHTML = "";
  jest.restoreAllMocks();
});

describe("moveCaretToEnd", () => {
  test("getSelection이 null이면 조용히 종료된다(focus 호출 없음).", () => {
    const div = document.createElement("div");
    div.textContent = "hello";
    document.body.appendChild(div);

    jest.spyOn(window, "getSelection").mockReturnValue(null);
    const focusSpy = jest.spyOn(div, "focus");

    expect(() => moveCaretToEnd(div)).not.toThrow();
    expect(focusSpy).not.toHaveBeenCalled();
  });

  test("element 끝에 collapsed range를 생성하고 selection에 추가한다.", () => {
    const div = document.createElement("div");
    div.textContent = "hello";
    document.body.appendChild(div);

    moveCaretToEnd(div);

    const selection = window.getSelection()!;
    expect(selection.rangeCount).toBe(1);

    const range = selection.getRangeAt(0);
    expect(range.collapsed).toBe(true);
    // 끝으로 이동했으므로 endContainer는 div(또는 그 텍스트 노드의 끝)
    expect(div.contains(range.endContainer)).toBe(true);
  });

  test("element.focus()가 호출된다.", () => {
    const div = document.createElement("div");
    div.tabIndex = 0;
    div.textContent = "hello";
    document.body.appendChild(div);

    const focusSpy = jest.spyOn(div, "focus");

    moveCaretToEnd(div);

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  test("빈 element에서도 안전하게 동작한다(시작=끝 위치에 caret).", () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    expect(() => moveCaretToEnd(div)).not.toThrow();

    const range = window.getSelection()!.getRangeAt(0);
    expect(range.collapsed).toBe(true);
    expect(range.startOffset).toBe(0);
  });
});
