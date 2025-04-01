import { useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import Button from "components/common/Button";
import SelectMenu from "components/SelectMenu";

import useOnClickOutside from "hooks/useOnClickOutside";

import kebabMenuIcon from "assets/images/kebab-menu-icon.png";

import * as S from "styles/components/NoteViewerStyle";

import type { MouseEvent } from "react";
import type { NoteViewerProps } from "types/components";
import type { Block } from "types/block";
import type { Coordinate } from "types/menu";

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
}: NoteViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [kebabMenuPosition, setKebabMenuPosition] = useState<Coordinate>({ x: 0, y: 0 });
  const modalRef = useRef(null);
  const textContent = content.filter((block: Block) => block.tag !== "img");

  const handleOpenModal = (event: MouseEvent<HTMLElement>) => {
    setKebabMenuPosition({ x: event.clientX, y: event.clientY });
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
          {textContent.map((block: Block) => {
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
