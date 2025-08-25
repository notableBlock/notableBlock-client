import convertToTree from "utils/convertToTree";

describe("convertToTree", () => {
  const profile = { userId: "u1", name: "Choi", picture: "" };

  const makeNote = (overrides: Partial<any> = {}) =>
    ({
      _id: "noteId",
      title: "title",
      baseNote: null,
      isShared: false,
      creatorId: "creatorId",
      creator: "Creator",
      editorId: "editorId",
      editor: "Editor",
      ...overrides,
    }) as any;

  test("부모-자식 트리를 만든다. (baseNote가 부모를 가리킨다.)", () => {
    const parent = makeNote({ _id: "p1", title: "Parent" });
    const child = makeNote({ _id: "c1", title: "Child", baseNote: "p1" });

    const tree = convertToTree([parent, child], profile);

    expect(tree.userId).toBe("u1");
    expect(tree.name).toBe("Choi");
    expect(tree.children).toHaveLength(1);

    const root = tree.children[0];

    expect(root.noteId).toBe("p1");
    expect(root.children).toHaveLength(1);
    expect(root.children[0].noteId).toBe("c1");
  });

  test("부모보다 자식이 먼저 와도 올바르게 연결된다. (노트 배열을 어떤 순서로 받아도 올바른 트리 구조를 만든다.)", () => {
    const parent = makeNote({ _id: "p2", title: "P2" });
    const child = makeNote({ _id: "c2", title: "C2", baseNote: "p2" });

    const tree = convertToTree([child, parent], profile);
    const root = tree.children.find((note: any) => note.noteId === "p2");

    expect(root).toBeDefined();
    expect(root!.children.map((note: any) => note.noteId)).toContain("c2");
  });

  test("부모가 없거나 존재하지 않는 baseNote면 루트로 들어간다.", () => {
    const root = makeNote({ _id: "r1" });
    const rootlessNote = makeNote({ _id: "rl1", baseNote: "nonExistentNote" });

    const tree = convertToTree([root, rootlessNote], profile);

    const rootIds = tree.children.map((note: any) => note.noteId);
    expect(rootIds).toEqual(expect.arrayContaining(["r1", "rl1"]));
  });

  test("노드 필드가 보존되고, 각 노드의 userId가 프로필로 설정된다.", () => {
    const note = makeNote({
      _id: "noteId",
      title: "Title",
      isShared: true,
      creatorId: "creatorId",
      creator: "Creator",
      editorId: "editorId",
      editor: "Editor",
    });

    const tree = convertToTree([note], profile);
    const node = tree.children[0];

    expect(node.userId).toBe("u1");
    expect(node.title).toBe("Title");
    expect(node.isShared).toBe(true);
    expect(node.creatorId).toBe("creatorId");
    expect(node.creator).toBe("Creator");
    expect(node.editorId).toBe("editorId");
    expect(node.editor).toBe("Editor");
  });

  test("중첩(두 단계 이상)도 연결된다.", () => {
    const parentNote = makeNote({ _id: "parentNote" });
    const childNote = makeNote({ _id: "childNote", baseNote: "parentNote" });
    const grandchildNote = makeNote({ _id: "grandchildNote", baseNote: "childNote" });

    const noteTree = convertToTree([parentNote, childNote, grandchildNote], profile);
    const parentNode = noteTree.children.find((node: any) => node.noteId === "parentNote")!;

    expect(parentNode.children[0].noteId).toBe("childNote");
    expect(parentNode.children[0].children[0].noteId).toBe("grandchildNote");
  });
});
