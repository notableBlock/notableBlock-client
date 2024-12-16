import { useRef, useState } from "react";

import DOMPurify from "isomorphic-dompurify";

import Button from "./common/Button";
import SelectMenu from "./SelectMenu";

import useOnClickOutside from "../hooks/useOnClickOutside";

import kebabMenuIcon from "../assets/images/kebab-menu-icon.png";

import * as S from "../styles/NoteViewerStyle";

function NoteViewer({
  path,
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
  kebabMenu,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.NoteViewerLayout>
      <S.NoteViewerHeader>
        <p>생성날짜: {createdAt}</p>
        <p>{shared === undefined ? "블록체인으로 보호중" : `공유 여부: ${shared ? "✅" : "❌"}`}</p>
        {isOpen && <SelectMenu ref={modalRef} menu={kebabMenu} onSelect={onSelectMenu} />}
        <Button image={kebabMenuIcon} onClick={handleOpenModal} />
      </S.NoteViewerHeader>
      <S.NoteLink to={`/${path}/${noteId}`}>
        <S.NoteViewerContent>
          {content.map((block) => {
            const HTMLTag = block.tag;
            const html = DOMPurify.sanitize(block.html);

            return <HTMLTag key={block.id} dangerouslySetInnerHTML={{ __html: html }} />;
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
