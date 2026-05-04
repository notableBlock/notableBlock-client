import { useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js/lib/common";

import Button from "components/common/Button";
import SelectMenu from "components/SelectMenu";

import useOnClickOutside from "hooks/useOnClickOutside";

import { EllipsisVertical } from "lucide-react";

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
          icon={<EllipsisVertical />}
          onClick={handleOpenModal}
          type="kebab"
          dataTestId="kebab-menu-button"
        />
      </S.Header>
      <S.Link to={`/${path}/${noteId}`}>
        <S.Content>
          {content.map((block: Block) => {
            // 이미지 블록: imageUrl이 있으면 img 태그로 렌더링
            if (block.tag === "img") {
              if (!block.imageUrl) return null;
              return (
                <S.PreviewImage
                  key={block.id}
                  src={block.imageUrl}
                  alt="노트 이미지"
                  loading="lazy"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              );
            }

            // 코드 블록: <br> → \n 변환 후 highlight.js 자동 감지로 구문 강조
            if (block.tag === "code") {
              const sanitized = DOMPurify.sanitize(block.html ?? "");
              const plainText = sanitized
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<[^>]+>/g, "")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&amp;/g, "&")
                .replace(/&nbsp;/g, " ");
              const highlighted = hljs.highlightAuto(plainText).value;

              return <code key={block.id} dangerouslySetInnerHTML={{ __html: highlighted }} />;
            }

            // 구분선: 유효 HTML 태그가 아니므로 별도 렌더 (hr)
            if (block.tag === "divider") {
              return <S.DividerLine key={block.id} aria-hidden />;
            }

            // 할 일: 비활성 체크박스 + 텍스트, checked 상태에 따라 line-through
            if (block.tag === "todo") {
              const html = DOMPurify.sanitize(block.html ?? "");
              return (
                <S.TodoLine key={block.id} $checked={!!block.checked}>
                  <input
                    type="checkbox"
                    checked={!!block.checked}
                    disabled
                    readOnly
                    aria-label="할 일 체크"
                  />
                  <span dangerouslySetInnerHTML={{ __html: html }} />
                </S.TodoLine>
              );
            }

            // 텍스트 블록(h1/h2/h3/p/blockquote): 동적 JSX 태그는 유효 HTML 태그로만 좁힘
            // (divider/todo/img/code는 위 분기에서 이미 처리됨)
            const HTMLTag: "h1" | "h2" | "h3" | "p" | "blockquote" = (
              ["h1", "h2", "h3", "p", "blockquote"] as const
            ).includes(block.tag as "p")
              ? (block.tag as "h1" | "h2" | "h3" | "p" | "blockquote")
              : "p";
            const html = DOMPurify.sanitize(block.html ?? "");

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
