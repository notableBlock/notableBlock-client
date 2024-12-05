import axios from "axios";

const updateNote = async (blocks, noteId) => {
  try {
    await axios.put("/notes", {
      headers: {
        "Content-Type": "application/json",
      },
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

const createNote = async () => {
  try {
    const response = await axios.post("/notes", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = response;
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getNote = async () => {
  try {
    const { data } = await axios.get("/notes", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { notesId } = data;

    return await Promise.all(
      notesId.map(async (noteId) => {
        const { data } = await axios.get(`/notes/${noteId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return data;
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { updateNote, createNote, getNote };
