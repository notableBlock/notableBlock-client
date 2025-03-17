import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  createNote,
  getAllNote,
  updateNote,
  deleteNote,
  shareNote,
  exportNote,
  importNote,
  getAllSharedNote,
  copySharedNote,
  getAllOwnedNote,
} from "../services/noteServices";
import archiveUploadedFiles from "../services/archiveServices";

const useControlNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [fetchedSharedNotes, setFetchedSharedNotes] = useState([]);
  const [fetchedOwnedNotes, setFetchedOwnedNotes] = useState([]);

  const handleCreateNewNote = useCallback(async () => {
    try {
      const { noteId } = await createNote();
      navigate(`/notes/${noteId}`);
    } catch (err) {
      navigate("/error", {
        from: location.pathname,
        state: { message: "노트 생성에 실패했어요." },
      });
    }
  }, [navigate, location]);

  const getUserNotes = useCallback(async () => {
    try {
      const fetchedData = await getAllNote();
      setFetchedNotes(fetchedData);
    } catch (err) {
      navigate("/error", {
        state: { from: location.pathname, message: "노트를 불러오는데 실패했어요." },
      });
    }
  }, [navigate, location]);

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
        navigate("/notes");
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "노트를 삭제하는데 실패했어요." },
        });
      }
    },
    [navigate, location]
  );

  const handleShareNote = useCallback(
    async (noteId) => {
      try {
        const updatedNote = await shareNote(noteId);
        setFetchedNotes((prevNotes) =>
          prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
        );
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "노트를 공유하는데 실패했어요." },
        });
      }
    },
    [navigate, location]
  );

  const handleExportToLocal = useCallback(
    async (noteId) => {
      try {
        await exportNote(noteId);
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "노트를 로컬로 내보내는데 실패했어요." },
        });
      }
    },
    [navigate, location]
  );

  const handleImportFromLocal = useCallback(
    async (e) => {
      const localFile = e.target.files;

      try {
        if (localFile) {
          const formData = new FormData();
          for (const file of localFile) {
            formData.append("files", file);
          }

          const newNotes = await importNote(formData);
          setFetchedNotes((prevNotes) => [...prevNotes, ...newNotes]);
        }
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "노트를 로컬에서 가져오는데 실패했어요." },
        });
      }
    },
    [navigate, location]
  );

  const handleArchiveUploadedFiles = useCallback(
    async (e) => {
      const localFile = e.target.files;

      try {
        if (localFile) {
          const formData = new FormData();

          for (const file of localFile) {
            formData.append("files", file);
          }

          await archiveUploadedFiles(formData);
        }
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "마크다운을 압축하는데 실패했어요." },
        });
      }
    },
    [navigate, location]
  );

  const getSharedNotes = useCallback(async () => {
    try {
      const fetchedData = await getAllSharedNote();
      setFetchedSharedNotes(fetchedData);
    } catch (err) {
      navigate("/error", {
        state: { from: location.pathname, message: "공유 노트를 불러오는데 실패했어요." },
      });
    }
  }, [navigate, location]);

  const handleCopySharedNote = useCallback(
    async (noteId) => {
      try {
        await copySharedNote(noteId);
      } catch (err) {
        navigate("/error", {
          state: {
            from: location.pathname,
            message: "공유 노트를 내 노트로 가져오는데 실패했어요.",
          },
        });
      }
    },
    [navigate, location]
  );

  const handleSelectMenu = (selectedAction) => {
    if (selectedAction) {
      selectedAction();
    }
  };

  const getOwnedNotes = useCallback(async () => {
    try {
      const ownedNotes = await getAllOwnedNote();
      setFetchedOwnedNotes(ownedNotes);
    } catch (err) {
      navigate("/error", {
        state: { from: location.pathname, message: "소유 노트를 불러오는데 실패했습니다F." },
      });
    }
  }, [navigate, location]);

  const getMenu = (menuType) => {
    switch (menuType) {
      case "노트 관리":
        return (noteId) => [
          { id: 1, tag: () => handleShareNote(noteId), label: "공유하기" },
          { id: 2, tag: () => handleExportToLocal(noteId), label: "로컬로 내보내기" },
          {
            id: 3,
            tag: () => handleDeleteNote(noteId),
            label: "삭제하기",
          },
        ];
      case "노트 생성 및 가져오기":
        return [
          { id: 1, tag: () => handleCreateNewNote(), label: "새 노트 만들기" },
          { id: 2, label: "로컬에서 가져오기" },
        ];
      case "노트 가져오기":
        return (noteId) => [
          { id: 1, tag: () => handleCopySharedNote(noteId), label: "내 노트로 가져오기" },
        ];
    }
  };

  return {
    fetchedNotes,
    fetchedSharedNotes,
    fetchedOwnedNotes,
    getUserNotes,
    getSharedNotes,
    updateNoteOnServer,
    handleSelectMenu,
    handleImportFromLocal,
    handleArchiveUploadedFiles,
    getMenu,
    getOwnedNotes,
  };
};

export default useControlNotes;
