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
} from "services/noteServices";
import archiveUploadedFiles from "services/archiveServices";

import type { ChangeEvent } from "react";
import type { Note, MockEvent } from "types/note";
import type { NoteId } from "types/ids";
import type { Block } from "types/block";
import type { ManageItem } from "types/menu";

type InitialMenu = (noteId?: NoteId) => ManageItem[];

const useControlNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fetchedNotes, setFetchedNotes] = useState<Note[]>([]);
  const [fetchedSharedNotes, setFetchedSharedNotes] = useState<Note[]>([]);
  const [fetchedOwnedNotes, setFetchedOwnedNotes] = useState<Note[]>([]);

  const handleCreateNewNote = useCallback(async () => {
    try {
      const { noteId } = await createNote();
      navigate(`/notes/${noteId}`);
    } catch (err) {
      navigate("/error", {
        state: { from: location.pathname, message: "노트 생성에 실패했어요." },
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

  const updateNoteOnServer = useCallback(
    async (blocks: Block[], onSaveStatus: (isSuccess: boolean) => void, noteId: NoteId) => {
      try {
        await updateNote(blocks, noteId);
        onSaveStatus(true);
      } catch (err) {
        onSaveStatus(false);
      }
    },
    []
  );

  const handleDeleteNote = useCallback(
    async (noteId: NoteId) => {
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
    async (noteId: NoteId) => {
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
    async (noteId: NoteId) => {
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
    async (event: ChangeEvent<HTMLInputElement> | MockEvent) => {
      const localFile = event.target.files;

      try {
        if (!localFile) return;

        const formData = new FormData();
        for (const file of localFile) {
          formData.append("files", file);
        }

        const newNotes = await importNote(formData);
        setFetchedNotes((prevNotes) => [...prevNotes, ...newNotes]);
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "노트를 로컬에서 가져오는데 실패했어요." },
        });
      }
    },
    [navigate, location]
  );

  const handleArchiveUploadedFiles = useCallback(
    async (event: ChangeEvent<HTMLInputElement> | MockEvent) => {
      const localFile = event.target.files;

      try {
        if (!localFile) return;

        const formData = new FormData();
        for (const file of localFile) {
          formData.append("files", file);
        }

        await archiveUploadedFiles(formData);
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "업로드된 파일을 아카이브하는데 실패했어요." },
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
    async (noteId: NoteId) => {
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

  const handleSelectMenu = (selectedAction: () => Promise<void>) => {
    if (!selectedAction) return;
    selectedAction();
  };

  const getOwnedNotes = useCallback(async () => {
    try {
      const ownedNotes = await getAllOwnedNote();
      setFetchedOwnedNotes(ownedNotes);
    } catch (err) {
      navigate("/error", {
        state: { from: location.pathname, message: "소유 노트를 불러오는데 실패했어요." },
      });
    }
  }, [navigate, location]);

  const getMenu = (menuType: string): InitialMenu => {
    switch (menuType) {
      case "내 노트 '⋮' 버튼 메뉴":
        return (noteId) => {
          if (!noteId)
            return [{ id: 1, label: "현재 메뉴를 불러올 수 없어요. 새로고침 해주세요." }];

          return [
            { id: 1, tag: () => handleShareNote(noteId), label: "공유하기" },
            { id: 2, tag: () => handleExportToLocal(noteId), label: "로컬로 내보내기" },
            { id: 3, tag: () => handleDeleteNote(noteId), label: "삭제하기" },
          ];
        };

      case "내 노트 '+' 버튼 메뉴":
        return () => [
          { id: 1, tag: () => handleCreateNewNote(), label: "새 노트 만들기" },
          { id: 2, label: "로컬에서 가져오기" },
        ];

      case "실시간 공유 노트 '⋮' 버튼 메뉴":
        return (noteId) => {
          if (!noteId)
            return [{ id: 1, label: "현재 메뉴를 불러올 수 없어요. 새로고침 해주세요." }];

          return [{ id: 1, tag: () => handleCopySharedNote(noteId), label: "내 노트로 가져오기" }];
        };
      default:
        return () => [{ id: 1, label: "현재 메뉴를 불러올 수 없어요. 새로고침 해주세요." }];
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
