import axios from "axios";

const createNote = async () => {
  try {
    const { data } = await axios.post("/notes");

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getNote = async () => {
  try {
    const { data } = await axios.get("/notes");
    const { notesId } = data;

    return await Promise.all(
      notesId.map(async (noteId) => {
        const { data } = await axios.get(`/notes/${noteId}`);

        return data;
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateNote = async (blocks, noteId) => {
  try {
    await axios.put("/notes", {
      data: {
        noteId: noteId,
        blocks: blocks,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteNote = async (noteId) => {
  try {
    await axios.delete(`/notes/${noteId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const shareNote = async (noteId) => {
  try {
    const { data } = await axios.patch(`/notes/${noteId}`);
    const { note } = data;

    return note;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { updateNote, createNote, getNote, deleteNote, shareNote };
