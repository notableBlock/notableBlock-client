import { useRef, useState } from "react";

import DOMPurify from "isomorphic-dompurify";

import Button from "./common/Button";
import SelectMenu from "./common/SelectMenu";

import useOnClickOutside from "../hooks/useOnClickOutside";

import kebabMenuIcon from "../assets/images/kebab-menu-icon.png";

import * as S from "../styles/NoteViewerStyle";

function NoteViewer({
  noteId,
  content,
  creator,
  creatorPicture,
  createdAt,
  editor,
  editorPicture,
  updatedAt,
  shared,
  onSelectMenu,
  onDeleteNote,
  onShareNote,
  onExportToLocal,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  useOnClickOutside(modalRef, handleCloseModal);

  const menu = [
    { id: 1, tag: () => onShareNote(), label: "공유하기" },
    { id: 2, tag: () => onExportToLocal(), label: "로컬로 내보내기" },
    {
      id: 3,
      tag: () => onDeleteNote(noteId),
      label: "삭제하기",
    },
  ];

  return (
    <S.NoteViewerLayout>
      <S.NoteViewerHeader>
        <p>생성날짜: {createdAt}</p>
        <p>공유 여부: {shared ? "✅" : "❌"}</p>
        {isOpen && <SelectMenu ref={modalRef} menu={menu} onSelect={onSelectMenu} />}
        <Button image={kebabMenuIcon} onClick={handleOpenModal} />
      </S.NoteViewerHeader>
      <S.NoteLink to={`/notes/${noteId}`}>
        <S.NoteViewerContent>
          {content.map((block, key) => {
            const HTMLTag = block.tag;
            const html = DOMPurify.sanitize(block.html);

            return <HTMLTag key={key} dangerouslySetInnerHTML={{ __html: html }} />;
          })}
        </S.NoteViewerContent>
      </S.NoteLink>
      <S.NoteViewerFooter>
        <S.NoteViewerImage $src={creatorPicture} />
        <p>원본 소유자: {creator}</p>
        <S.NoteViewerImage $src={editorPicture} />
        <p>수정자: {editor}</p>
        <p>마지막 수정날짜: {updatedAt}</p>
      </S.NoteViewerFooter>
    </S.NoteViewerLayout>
  );
}

export default NoteViewer;
