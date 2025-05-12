import { useState, useRef } from "react";

import { useParams, useLocation } from "react-router";

import NoteEditor from "components/NoteEditor";
import Button from "components/common/Button";
import SelectMenu from "components/SelectMenu";

import useControlNotes from "hooks/useControlNotes";
import useOnClickOutside from "hooks/useOnClickOutside";

import plusOptionIcon from "assets/images/plus-option-icon.png";

import * as S from "styles/pages/NoteEditingPageStyle";

function NoteEditingPage() {
  const { handleSelectMenu, getMenu } = useControlNotes();

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const { noteId } = useParams();
  const { pathname } = useLocation();
  const isSharedPage = pathname.indexOf("/shared") !== -1;

  const initialMenu = getMenu(
    isSharedPage ? "실시간 공유 노트 '⋮' 버튼 메뉴" : "내 노트 '⋮' 버튼 메뉴"
  );
  const plusMenu = typeof initialMenu === "function" && noteId ? initialMenu(noteId) : [];

  const handleSaveStatus = (isSuccess: boolean) => setIsSaving(isSuccess);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.NoteEditingPageLayout>
      {!isSharedPage && (
        <S.SavingStatusItem $isSaving={isSaving}>
          {isSaving ? "자동저장 성공 ✅" : "자동저장 실패 ⛔️"}
        </S.SavingStatusItem>
      )}
      <NoteEditor onSaveStatus={handleSaveStatus} />
      <S.NoteEditingPageItem>
        {isOpen && <SelectMenu ref={modalRef} menu={plusMenu} onSelect={handleSelectMenu} />}
        <Button image={plusOptionIcon} onClick={handleOpenModal} type="plus" />
      </S.NoteEditingPageItem>
    </S.NoteEditingPageLayout>
  );
}

export default NoteEditingPage;
