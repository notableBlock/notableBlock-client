import { useState, useRef } from "react";

import { useParams, useLocation } from "react-router";

import NoteEditor from "components/NoteEditor";
import Button from "components/common/Button";
import SelectMenu from "components/SelectMenu";

import useControlNotes from "hooks/useControlNotes";
import useOnClickOutside from "hooks/useOnClickOutside";

import plusOptionIcon from "assets/images/plus-option-icon.png";
import copyIcon from "assets/images/copy-icon.png";

import * as S from "styles/pages/NoteEditingPageStyle";

function NoteEditingPage() {
  const { handleSelectMenu, getMenu, handleCopySharedNote } = useControlNotes();

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const { noteId } = useParams();
  const { pathname } = useLocation();

  const isSharedPage = pathname.indexOf("/shared") !== -1;
  const buttonImage = isSharedPage ? copyIcon : plusOptionIcon;
  const plusMenu = getMenu("내 노트 '⋮' 버튼 메뉴");

  const handleSaveStatus = (isSuccess: boolean) => setIsSaving(isSuccess);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const handleMenuOrCopy =
    isSharedPage && noteId ? () => handleCopySharedNote(noteId) : handleOpenModal;
  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.Layout>
      {!isSharedPage && (
        <S.Status $isSaving={isSaving}>
          {isSaving ? "자동저장 성공 ✅" : "자동저장 실패 ⛔️"}
        </S.Status>
      )}
      <NoteEditor onSaveStatus={handleSaveStatus} />
      <S.Item>
        {isOpen && (
          <SelectMenu ref={modalRef} menu={plusMenu(noteId)} onSelect={handleSelectMenu} />
        )}
        <Button image={buttonImage} onClick={handleMenuOrCopy} type="plus" />
      </S.Item>
    </S.Layout>
  );
}

export default NoteEditingPage;
