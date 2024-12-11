import { useState, useEffect, useRef } from "react";

import Button from "../components/common/Button";
import SelectMenu from "../components/common/SelectMenu";
import NoteViewer from "../components/NoteViewer";
import Loading from "../components/common/Loading";

import useControlNotes from "../hooks/useControlNotes";
import useOnClickOutside from "../hooks/useOnClickOutside";

import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/UserPageStyle";

function UserPage() {
  const {
    fetchedNotes,
    handleGetUserNotes,
    handleCreateNewNote,
    handleImportToLocal,
    handleDeleteNote,
    handleShareNote,
    handleExportToLocal,
    handleSelectMenu,
  } = useControlNotes();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const menu = [
    { id: 1, tag: handleCreateNewNote, label: "새 노트 만들기" },
    { id: 2, tag: handleImportToLocal, label: "로컬에서 가져오기" },
  ];

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  useOnClickOutside(modalRef, handleCloseModal);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      await handleGetUserNotes();
      setIsLoading(false);
    };

    fetchNotes();
  }, [handleGetUserNotes]);

  return (
    <S.UserPageLayout>
      {isLoading ? (
        <Loading />
      ) : (
        fetchedNotes.map((note) => {
          const {
            _id,
            blocks,
            creator,
            creatorPicture,
            createdAt,
            updatedAt,
            editor,
            editorPicture,
            shared,
          } = note;

          return (
            <NoteViewer
              key={_id}
              path="notes"
              noteId={_id}
              content={blocks}
              creator={creator}
              creatorPicture={creatorPicture}
              createdAt={createdAt}
              editor={editor}
              editorPicture={editorPicture}
              updatedAt={updatedAt}
              shared={shared}
              onSelectMenu={handleSelectMenu}
              onShareNote={handleShareNote}
              onDeleteNote={handleDeleteNote}
              onExportToLocal={handleExportToLocal}
            />
          );
        })
      )}
      <S.UserPageItem type="option">
        {isOpen && <SelectMenu ref={modalRef} menu={menu} onSelect={handleSelectMenu} />}
        <Button image={plusOptionIcon} onClick={handleOpenModal} />
      </S.UserPageItem>
    </S.UserPageLayout>
  );
}

export default UserPage;
