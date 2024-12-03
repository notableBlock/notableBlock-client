import { useState, useRef, useEffect, useCallback } from "react";

import axios from "axios";
import { useNavigate } from "react-router";

import Button from "../components/common/Button";
import SelectMenu from "../components/common/SelectMenu";
import NoteViewer from "../components/NoteViewer";

import useOnClickOutside from "../hooks/useOnClickOutside";

import useUserStore from "../stores/useUserStore";
import { useNoteStore } from "../stores/useNoteStore";

import { selectableCreations } from "../assets/data/selectableMenus";
import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/UserPageStyle";

function UserPage() {
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const { noteId } = useNoteStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const modalRef = useRef(null);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  useOnClickOutside(modalRef, handleCloseModal);

  const handleCreatingTrigger = () => {
    setIsCreating(true);
  };

  const handleCreateNewNote = useCallback(async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/notes`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          creatorId: userId,
        },
      });
      navigate(`/notes/${response.data.noteId}`);
    } catch (err) {
      console.log("노트 생성 실패: ", err);
    }
  }, [navigate, userId]);

  useEffect(() => {
    if (isCreating) {
      handleCreateNewNote();
      setIsCreating(false);
    }
  }, [isCreating, handleCreateNewNote]);

  return (
    <S.UserPageLayout>
      <S.NoteLink to={`/notes/${noteId}`}>
        <NoteViewer />
      </S.NoteLink>
      <S.UserPageItem type="option">
        {isOpen && (
          <SelectMenu
            ref={modalRef}
            menu={selectableCreations}
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
