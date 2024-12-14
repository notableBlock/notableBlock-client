import { useState, useRef } from "react";

import { useParams, useLocation } from "react-router";

import NoteEditor from "../components/NoteEditor";
import Button from "../components/common/Button";
import SelectMenu from "../components/common/SelectMenu";

import useControlNotes from "../hooks/useControlNotes";
import useOnClickOutside from "../hooks/useOnClickOutside";

import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/NoteEditingPageStyle";

function NoteEditingPage() {
  const { handleSelectMenu, getMenu } = useControlNotes();

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const { noteId } = useParams();
  const { pathname } = useLocation();

  const isSharedPage = pathname.indexOf("/shared") !== -1;

  const initialMenu = getMenu(isSharedPage ? "노트 가져오기" : "노트 관리");
  const plusMenu = initialMenu(noteId);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.NoteEditingPageLayout>
      <S.SavingStatusItem $isSaving={isSaving}>
        {isSaving ? "자동저장 성공 ✅" : "자동저장 실패 ⛔️"}
      </S.SavingStatusItem>
      <NoteEditor setIsSaving={setIsSaving} />
      <S.NoteEditingPageItem>
        {isOpen && <SelectMenu ref={modalRef} menu={plusMenu} onSelect={handleSelectMenu} />}
        <Button image={plusOptionIcon} onClick={handleOpenModal} />
      </S.NoteEditingPageItem>
    </S.NoteEditingPageLayout>
  );
}

export default NoteEditingPage;
