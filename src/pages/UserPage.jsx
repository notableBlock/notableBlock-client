import { useState, useEffect, useRef } from "react";

import Button from "../components/common/Button";
import SelectMenu from "../components/SelectMenu";
import NoteViewer from "../components/NoteViewer";
import Loading from "../components/common/Loading";

import useControlNotes from "../hooks/useControlNotes";
import useOnClickOutside from "../hooks/useOnClickOutside";

import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/UserPageStyle";

function UserPage() {
  const { fetchedNotes, getUserNotes, handleImportFromLocal, handleSelectMenu, getMenu } =
    useControlNotes();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);

  const kebabMenu = getMenu("노트 관리");
  const plusMenu = getMenu("노트 생성 및 가져오기");

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  useOnClickOutside(modalRef, handleCloseModal);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      await getUserNotes();
      setIsLoading(false);
    };

    fetchNotes();
  }, [getUserNotes]);

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
              kebabMenu={kebabMenu(_id)}
              onSelectMenu={handleSelectMenu}
            />
          );
        })
      )}
      <S.UserPageItem $type="option">
        {isOpen && (
          <SelectMenu
            ref={modalRef}
            menu={plusMenu}
            onSelect={handleSelectMenu}
            onImportFromLocal={handleImportFromLocal}
          />
        )}
        <Button image={plusOptionIcon} onClick={handleOpenModal} />
      </S.UserPageItem>
    </S.UserPageLayout>
  );
}

export default UserPage;
