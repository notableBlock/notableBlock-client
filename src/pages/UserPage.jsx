import { useState, useRef } from "react";

import Button from "../components/common/Button";
import SelectMenu from "../components/common/SelectMenu";
import NoteViewer from "../components/NoteViewer";

import useControlNotes from "../hooks/useControlNotes";
import useOnClickOutside from "../hooks/useOnClickOutside";

import { creationMenu } from "../assets/data/menu";
import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/UserPageStyle";

function UserPage() {
  const { fetchedNotes, handleCreateNewNote, handleCreatingTrigger } = useControlNotes();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.UserPageLayout>
      {fetchedNotes.map((note, key) => {
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
          <S.NoteLink key={key} to={`/notes/${_id}`}>
            <NoteViewer
              content={blocks}
              creator={creator}
              creatorPicture={creatorPicture}
              createdAt={createdAt}
              editor={editor}
              editorPicture={editorPicture}
              updatedAt={updatedAt}
              shared={shared}
            />
          </S.NoteLink>
        );
      })}
      <S.UserPageItem type="option">
        {isOpen && (
          <SelectMenu
            ref={modalRef}
            menu={creationMenu}
            onSelect={handleCreateNewNote}
            onClick={handleCreatingTrigger}
          />
        )}
        <Button image={plusOptionIcon} onClick={handleOpenModal} />
      </S.UserPageItem>
    </S.UserPageLayout>
  );
}

export default UserPage;
