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

const getAllNote = async () => {
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

const getBlocks = async (noteId) => {
  try {
    const { data } = await axios.get(`/notes/${noteId}`);
    const { blocks } = data;

    return blocks;
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

const exportNote = async (noteId) => {
  try {
    const { data } = await axios.get(`/notes/${noteId}/download`, { responseType: "blob" });

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${noteId}.md`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const importNote = async (formData) => {
  try {
    const { data } = await axios.post("/notes/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { note } = data;

    return note;
  } catch (err) {
    console.log(err);
  }
};

const getAllSharedNote = async () => {
  try {
    const { data } = await axios.get("/shared");
    const { notesId } = data;

    return await Promise.all(
      notesId.map(async (noteId) => {
        const { data } = await axios.get(`/shared/${noteId}`);

        return data;
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const copySharedNote = async (noteId) => {
  try {
    await axios.post(`/shared/${noteId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const uploadNoteImage = async (noteId, formData) => {
  try {
    const { data } = await axios.post(`/notes/${noteId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.imageUrl;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteNoteImage = async (imageUrl) => {
  try {
    await axios.delete(`/notes/${imageUrl}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  updateNote,
  createNote,
  getAllNote,
  getBlocks,
  deleteNote,
  shareNote,
  exportNote,
  importNote,
  getAllSharedNote,
  copySharedNote,
  uploadNoteImage,
  deleteNoteImage,
};
