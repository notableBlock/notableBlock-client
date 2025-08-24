import objectId from "utils/objectId";

test("objectId는 24자리 16진수 문자열을 반환한다.", () => {
  const id = objectId();

  expect(id).toHaveLength(24);
  expect(id).toMatch(/^[0-9a-f]{24}$/);
});
