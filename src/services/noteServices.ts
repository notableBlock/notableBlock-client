import axios from "axios";

import downloadTarFile from "utils/downloadTarFile";

import type { NoteId } from "types/ids";
import type { Block } from "types/block";

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
      notesId.map(async (noteId: NoteId) => {
        const { data } = await axios.get(`/notes/${noteId}`);

        return data;
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getBlocks = async (noteId: NoteId) => {
  try {
    const { data } = await axios.get(`/notes/${noteId}`);
    const { blocks } = data;

    return blocks;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateNote = async (blocks: Block[], noteId: NoteId) => {
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

const deleteNote = async (noteId: NoteId) => {
  try {
    await axios.delete(`/notes/${noteId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const shareNote = async (noteId: NoteId) => {
  try {
    const { data } = await axios.patch(`/notes/${noteId}`);
    const { note } = data;

    return note;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const exportNote = async (noteId: NoteId) => {
  try {
    const response = await axios.get(`/notes/${noteId}/download`, {
      responseType: "blob",
    });

    downloadTarFile(response);
  } catch (err) {
    console.log("파일 내보내기 실패:", err);
    throw err;
  }
};

const importNote = async (formData: FormData) => {
  try {
    const { data } = await axios.post("/notes/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { notes } = data;

    return notes;
  } catch (err) {
    console.log("파일 가져오기 실패:", err);
    throw err;
  }
};

const getAllSharedNote = async () => {
  try {
    const { data } = await axios.get("/shared");
    const { notesId } = data;

    return await Promise.all(
      notesId.map(async (noteId: NoteId) => {
        const { data } = await axios.get(`/shared/${noteId}`);

        return data;
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const copySharedNote = async (noteId: NoteId) => {
  try {
    await axios.post(`/shared/${noteId}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAllOwnedNote = async () => {
  try {
    const { data } = await axios.get("/notes/tree");
    const { ownedNotes } = data;

    return ownedNotes;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const uploadNoteImage = async (noteId: NoteId, formData: FormData) => {
  try {
    const { data } = await axios.post(`/notes/${noteId}/images?s3=true`, formData, {
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

const deleteNoteImage = async (imageUrl: string) => {
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
  getAllOwnedNote,
};
