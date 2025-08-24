import { renderHook } from "@testing-library/react";

import usePrevBlocks from "hooks/usePrevBlocks";

import type { Block } from "types/block";

describe("usePrevBlocks", () => {
  test("첫 렌더에서는 빈 배열을 반환한다.", () => {
    const { result } = renderHook(({ blocks }) => usePrevBlocks(blocks), {
      initialProps: { blocks: [] as Block[] },
    });

    expect(result.current).toEqual([]);
  });

  test("업데이트 후 직전 blocks를 반환한다.", () => {
    const a: Block[] = [{ id: "a", html: "", tag: "p", imageUrl: "" }];
    const b: Block[] = [{ id: "b", html: "", tag: "p", imageUrl: "" }];

    const { result, rerender } = renderHook(({ blocks }) => usePrevBlocks(blocks), {
      initialProps: { blocks: [] as Block[] },
    });

    rerender({ blocks: a });
    expect(result.current).toEqual([]);

    rerender({ blocks: b });
    expect(result.current).toBe(a);
  });

  test("같은 배열 참조로 rerender하면 prev는 갱신되지 않는다.", () => {
    const a: Block[] = [{ id: "a", html: "", tag: "p", imageUrl: "" }];

    const { result, rerender } = renderHook(({ blocks }) => usePrevBlocks(blocks), {
      initialProps: { blocks: [] as Block[] },
    });

    rerender({ blocks: a });
    expect(result.current).toEqual([]);

    rerender({ blocks: a });
    expect(result.current).toEqual(a);
  });
});
