import { useState, useRef } from "react";

import { useParams } from "react-router";

import NoteEditor from "../components/NoteEditor";
import Button from "../components/common/Button";
import SelectMenu from "../components/common/SelectMenu";

import useControlNotes from "../hooks/useControlNotes";
import useOnClickOutside from "../hooks/useOnClickOutside";

import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/NoteEditingPageStyle";

function NoteEditingPage() {
  const { handleSelectMenu, handleShareNote, handleExportToLocal } = useControlNotes();

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const { noteId } = useParams();

  const menu = [
    { id: 1, tag: () => handleShareNote(noteId), label: "공유하기" },
    { id: 2, tag: () => handleExportToLocal(noteId), label: "로컬로 내보내기" },
  ];

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
        {isOpen && <SelectMenu ref={modalRef} menu={menu} onSelect={handleSelectMenu} />}
        <Button image={plusOptionIcon} onClick={handleOpenModal} />
      </S.NoteEditingPageItem>
    </S.NoteEditingPageLayout>
  );
}

export default NoteEditingPage;
