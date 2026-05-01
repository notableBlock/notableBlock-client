import areBlocksEqual from "utils/areBlocksEqual";

import type { Block } from "types/block";

describe("areBlocksEqual", () => {
  const blockA: Block = { id: "1", html: "hello", tag: "p", imageUrl: "" };
  const blockB: Block = { id: "2", html: "world", tag: "h1", imageUrl: "" };

  test("같은 참조의 배열은 true를 반환한다.", () => {
    const blocks = [blockA, blockB];
    expect(areBlocksEqual(blocks, blocks)).toBe(true);
  });

  test("내용은 같지만 참조가 다른 배열은 true를 반환한다.", () => {
    expect(areBlocksEqual([blockA], [{ ...blockA }])).toBe(true);
  });

  test("길이가 다르면 false를 반환한다.", () => {
    expect(areBlocksEqual([blockA], [blockA, blockB])).toBe(false);
  });

  test("html 필드만 달라도 false를 반환한다.", () => {
    expect(areBlocksEqual([blockA], [{ ...blockA, html: "changed" }])).toBe(false);
  });

  test("tag 필드만 달라도 false를 반환한다.", () => {
    expect(areBlocksEqual([blockA], [{ ...blockA, tag: "h2" }])).toBe(false);
  });

  test("id 필드만 달라도 false를 반환한다. (블록 교체 감지)", () => {
    expect(areBlocksEqual([blockA], [{ ...blockA, id: "different" }])).toBe(false);
  });

  test("imageUrl 필드만 달라도 false를 반환한다.", () => {
    expect(areBlocksEqual([blockA], [{ ...blockA, imageUrl: "https://example.com/img.png" }])).toBe(
      false,
    );
  });

  test("순서가 바뀌면 false를 반환한다.", () => {
    expect(areBlocksEqual([blockA, blockB], [blockB, blockA])).toBe(false);
  });

  test("빈 배열끼리는 true를 반환한다.", () => {
    expect(areBlocksEqual([], [])).toBe(true);
  });
});
