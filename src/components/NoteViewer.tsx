import { useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import Button from "components/common/Button";
import SelectMenu from "components/SelectMenu";

import useOnClickOutside from "hooks/useOnClickOutside";

import kebabMenuIcon from "assets/images/kebab-menu-icon.png";
import calendarIcon from "assets/images/calendar-icon.png";
import editCalendarIcon from "assets/images/edit-calendar-icon.png";
import creatorIcon from "assets/images/creator-icon.png";
import editorIcon from "assets/images/editor-icon.png";
import lockIcon from "assets/images/lock-icon.png";
import unlockIcon from "assets/images/unlock-icon.png";
import shareIcon from "assets/images/share-icon.png";

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
  createdAt,
  editor,
  updatedAt,
  isShared,
  onSelectMenu,
  kebabMenu,
}: NoteViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [kebabMenuPosition, setKebabMenuPosition] = useState<Coordinate>({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const textContent = content.filter((block: Block) => block.tag !== "img");
  const isSharedPage = path === "shared";
  const shareStatus = isShared ? "공유 상태" : "비공유 상태";
  const shareStatusIcon = isSharedPage ? shareIcon : isShared ? unlockIcon : lockIcon;

  const handleOpenModal = (event: MouseEvent<HTMLElement>) => {
    setKebabMenuPosition({ x: event.clientX, y: event.clientY });
    setIsOpen(true);
  };
  const handleCloseModal = () => setIsOpen(false);
  useOnClickOutside(modalRef, handleCloseModal);

  return (
    <S.Layout>
      <S.Header>
        <S.Section>
          <S.Icon $src={calendarIcon} alt="달력 아이콘" />
          <p>생성일: {createdAt}</p>
        </S.Section>
        <S.Section>
          <S.Icon $src={shareStatusIcon} alt="공유 상태 아이콘" />
          {shareStatus}
        </S.Section>
        {isOpen && (
          <SelectMenu
            ref={modalRef}
            menu={kebabMenu}
            onSelect={onSelectMenu}
            position={kebabMenuPosition}
          />
        )}
        <Button
          image={kebabMenuIcon}
          onClick={handleOpenModal}
          type="kebab"
          dataTestId="kebab-menu-button"
        />
      </S.Header>
      <S.Link to={`/${path}/${noteId}`}>
        <S.Content>
          {textContent.map((block: Block) => {
            const HTMLTag = block.tag;
            const html = DOMPurify.sanitize(block.html);

            return <HTMLTag key={block.id} dangerouslySetInnerHTML={{ __html: html }} />;
          })}
        </S.Content>
      </S.Link>
      <S.Footer>
        <S.Section>
          <S.Icon $src={creatorIcon} alt="생성자 아이콘" />
          <p>생성자: {creator}님</p>
        </S.Section>
        <S.Section>
          <S.Icon $src={editorIcon} alt="수정자 아이콘" />
          <p>수정자: {editor}님</p>
        </S.Section>
        <S.Section>
          <S.Icon $src={editCalendarIcon} alt="달력 수정 아이콘" />
          <p>마지막 수정일: {updatedAt}</p>
        </S.Section>
      </S.Footer>
    </S.Layout>
  );
}

export default NoteViewer;
