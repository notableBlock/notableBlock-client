import { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router";

import { createNote, getNote, updateNote, deleteNote } from "../services/note";

const useControlNotes = () => {
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const navigate = useNavigate();

  const handleCreateNewNote = useCallback(async () => {
    try {
      const { noteId } = await createNote();
      navigate(`/notes/${noteId}`);
    } catch (err) {
      navigate("/error", { state: { message: "노트 생성에 실패했습니다." } });
    }
  }, [navigate]);

  const handleGetUserNote = useCallback(async () => {
    try {
      const fetchedData = await getNote();
      setFetchedNotes(fetchedData);
    } catch (err) {
      navigate("/error", { state: { message: "노트를 불러오는데 실패했습니다." } });
    }
  }, [navigate]);

  const updateNoteOnServer = useCallback(async (blocks, setIsSaving, noteId) => {
    try {
      await updateNote(blocks, noteId);
      setIsSaving(true);
    } catch (err) {
      setIsSaving(false);
    }
  }, []);

  const handleDeleteNote = useCallback(
    async (noteId) => {
      try {
        await deleteNote(noteId);
        setFetchedNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      } catch (err) {
        navigate("/error", { state: { message: "노트를 삭제하는데 실패했습니다." } });
      }
    },
    [navigate]
  );

  const handleSelectMenu = (selectedAction) => {
    if (selectedAction) {
      selectedAction();
    }
  };

  useEffect(() => {
    handleGetUserNote();
  }, [handleGetUserNote]);

  return {
    fetchedNotes,
    handleCreateNewNote,
    handleDeleteNote,
    updateNoteOnServer,
    handleSelectMenu,
  };
};

export default useControlNotes;
