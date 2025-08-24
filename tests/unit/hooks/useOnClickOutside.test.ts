import { renderHook } from "@testing-library/react";
import { useRef } from "react";

import useOnClickOutside from "hooks/useOnClickOutside";

describe("useOnClickOutside", () => {
  test("ref 영역 밖 클릭 시 handler가 호출된다.", () => {
    const handler = jest.fn();

    const div = document.createElement("div");
    document.body.appendChild(div);

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useOnClickOutside(ref, handler);

      return ref;
    });

    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

    expect(handler).toHaveBeenCalledTimes(1);

    unmount();
    document.body.removeChild(div);
  });

  test("ref 영역 안쪽 클릭 시 handler가 호출되지 않는다.", () => {
    const handler = jest.fn();

    const div = document.createElement("div");
    document.body.appendChild(div);

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useOnClickOutside(ref, handler);

      return ref;
    });

    div.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });

  test("언마운트 시 이벤트 리스너가 해제된다.", () => {
    const handler = jest.fn();

    const div = document.createElement("div");
    document.body.appendChild(div);

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useOnClickOutside(ref, handler);

      return ref;
    });

    unmount();

    document.body.click();

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });
});
