import { useState, useRef } from "react";

import Button from "../components/common/Button";
import SelectMenu from "../components/common/SelectMenu";
import NoteViewer from "../components/NoteViewer";

import useOnClickOutside from "../hooks/useOnClickOutside";

import { selectableCreations } from "../assets/data/selectableMenus";
import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/NotePageStyle";

function NotePage() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.NotePageLayout>
      <S.NoteLink to="/note/:id">
        <NoteViewer />
      </S.NoteLink>
      <S.NotePageItem type="option">
        {isOpen && <SelectMenu ref={modalRef} menu={selectableCreations} />}
        <Button image={plusOptionIcon} onClick={handleOpenModal} />
      </S.NotePageItem>
    </S.NotePageLayout>
  );
}

export default NotePage;
