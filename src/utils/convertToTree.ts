import type { Note, Tree } from "types/note";
import type { User } from "types/models";

const convertToTree = (noteData: Note[], profile: User) => {
  const { id, name } = profile;

  const tree: Tree = { id, name, children: [] };
  const noteMap = new Map();

  noteData.forEach((note) => {
    noteMap.set(note._id, {
      ...note,
      name: `${note.title}`,
      children: [],
    });
  });

  noteData.forEach((note) => {
    if (note.baseNote && noteMap.has(note.baseNote)) {
      const parent = noteMap.get(note.baseNote);
      parent.children.push(noteMap.get(note._id));
    } else {
      tree.children.push(noteMap.get(note._id));
    }
  });

  return tree;
};

export default convertToTree;
