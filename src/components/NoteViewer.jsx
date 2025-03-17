import { useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import Button from "./common/Button";
import SelectMenu from "./SelectMenu";

import useOnClickOutside from "../hooks/useOnClickOutside";

import kebabMenuIcon from "../assets/images/kebab-menu-icon.png";

import * as S from "../styles/components/NoteViewerStyle";

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
  const [kebabMenuPosition, setKebabMenuPosition] = useState({ x: null, y: null });
  const modalRef = useRef(null);
  const textContent = content.filter((block) => block.tag !== "img");

  const handleOpenModal = (e) => {
    setKebabMenuPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };
  const handleCloseModal = () => setIsOpen(false);
  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.NoteViewerLayout>
      <S.NoteViewerHeader>
        <p>처음 작성한 날: {createdAt}</p>
        <p>{path === "shared" ? "공유 중 🌐" : `공유 상태: ${shared ? "🟢" : "🔴"}`}</p>
        {isOpen && (
          <SelectMenu
            ref={modalRef}
            menu={kebabMenu}
            onSelect={onSelectMenu}
            position={kebabMenuPosition}
          />
        )}
        <Button image={kebabMenuIcon} onClick={handleOpenModal} />
      </S.NoteViewerHeader>
      <S.NoteLink to={`/${path}/${noteId}`}>
        <S.NoteViewerContent>
          {textContent.map((block) => {
            const HTMLTag = block.tag;
            const html = DOMPurify.sanitize(block.html);

            return <HTMLTag key={block.id} dangerouslySetInnerHTML={{ __html: html }} />;
          })}
        </S.NoteViewerContent>
      </S.NoteLink>
      <S.NoteViewerFooter>
        <S.NoteViewerUserBox>
          <p>
            처음 만든 사람: <S.NoteViewerImage $src={creatorPicture} />
            {creator}님
          </p>
        </S.NoteViewerUserBox>
        <S.NoteViewerUserBox>
          <p>
            수정한 사람: <S.NoteViewerImage $src={editorPicture} /> {editor}님
          </p>
        </S.NoteViewerUserBox>
        <p>마지막으로 수정한 날: {updatedAt}</p>
      </S.NoteViewerFooter>
    </S.NoteViewerLayout>
  );
}

export default NoteViewer;
