import type { Note, TreeRoot } from "types/note";
import type { User } from "types/models";

const convertToTree = (noteData: Note[], profile: User) => {
  const { userId, name } = profile;
  const noteTree: TreeRoot = { userId, name, children: [] };
  const noteMap = new Map();

  noteData.forEach(
    ({ _id: noteId, title, baseNote, isShared, creatorId, creator, editorId, editor }) => {
      const treeNode = {
        userId,
        noteId,
        title,
        baseNote,
        isShared,
        creatorId,
        creator,
        editorId,
        editor,
        children: [],
      };

      noteMap.set(noteId, treeNode);
    }
  );

  noteData.forEach(({ _id: noteId, baseNote }) => {
    if (baseNote && noteMap.has(baseNote)) {
      const parent = noteMap.get(baseNote);
      parent.children.push(noteMap.get(noteId));
    } else {
      noteTree.children.push(noteMap.get(noteId));
    }
  });

  return noteTree;
};

export default convertToTree;
