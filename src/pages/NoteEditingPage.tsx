import { useState, useRef } from "react";

import { useParams, useLocation } from "react-router";

import NoteEditor from "components/NoteEditor";
import Button from "components/common/Button";
import SelectMenu from "components/SelectMenu";

import useControlNotes from "hooks/useControlNotes";
import useOnClickOutside from "hooks/useOnClickOutside";

import { Plus, Copy } from "lucide-react";

import * as S from "styles/pages/NoteEditingPageStyle";

function NoteEditingPage() {
  const {
    noteActions: { handleSelectMenu, handleCopySharedNote },
    menuHelpers: { getMenu },
  } = useControlNotes();

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const { noteId } = useParams();
  const { pathname } = useLocation();

  const isSharedPage = pathname.indexOf("/shared") !== -1;
  const buttonIcon = isSharedPage ? <Copy size={20} /> : <Plus size={20} />;
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
        <S.Status $isSaving={isSaving}>{isSaving ? "저장 완료 ✅" : "입력 감지 중... 💭"}</S.Status>
      )}
      <NoteEditor onSaveStatus={handleSaveStatus} />
      <S.Item>
        {isOpen && (
          <SelectMenu ref={modalRef} menu={plusMenu(noteId)} onSelect={handleSelectMenu} />
        )}
        <Button icon={buttonIcon} onClick={handleMenuOrCopy} />
      </S.Item>
    </S.Layout>
  );
}

export default NoteEditingPage;
