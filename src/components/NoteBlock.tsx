import { forwardRef, useState, useEffect } from "react";

import SelectMenu from "components/SelectMenu";

import useBlockInteraction from "hooks/useBlockInteraction";
import useControlMenu from "hooks/useControlMenu";

import { tagsMenu } from "assets/data/menu";
import dragHandleIcon from "assets/images/drag-handle-icon.png";

import * as S from "styles/components/NoteBlockStyle";

import type { ForwardedRef } from "react";
import type { NoteBlockProps } from "types/components";

function NoteBlock(
  {
    id,
    html: propsHtml,
    tag: propsTag,
    imageUrl: propsImageUrl,
    blockCount,
    noteId,
    isSharedPage,
    isDragging,
    onAddBlock,
    onDeleteBlock,
    onUpdatePage,
    onDragEnd,
    onDragEnter,
    onDragStart,
    onFocusBlockByArrowKey,
  }: NoteBlockProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [htmlBackup, setHtmlBackup] = useState("");
  const [html, setHtml] = useState(propsHtml);

  const { handleOpenSelectMenu, handleCloseSelectMenu, isSelectMenuOpen, selectMenuPosition } =
    useControlMenu({
      html,
      setHtmlBackup,
    });
  const {
    tag,
    imageUrl,
    setImageUrl,
    fileInputRef,
    handleChange,
    handleSelectTag,
    handleKeyUp,
    handleKeyDown,
    handleImageUpload,
    contentEditableRef,
  } = useBlockInteraction({
    id,
    noteId,
    blockCount,
    propsTag,
    propsImageUrl,
    isSelectMenuOpen,
    htmlBackup,
    setHtml,
    setHtmlBackup,
    onAddBlock,
    onDeleteBlock,
    onFocusBlockByArrowKey,
    handleOpenSelectMenu,
    handleCloseSelectMenu,
  });

  useEffect(() => {
    const isHTMLChanged = propsHtml !== html;
    const isTagChanged = propsTag !== tag;
    const isImageChanged = propsImageUrl !== imageUrl;
    const hasImageUrlWithoutImageTag = tag !== "img" && Boolean(imageUrl);

    const updatePage = () => {
      if (isHTMLChanged || isTagChanged || isImageChanged) {
        onUpdatePage({
          id,
          html,
          tag,
          imageUrl,
        });
      }
    };

    if (hasImageUrlWithoutImageTag) {
      setHtml("");
      setImageUrl("");
      updatePage();
    } else {
      updatePage();
    }
  }, [html, id, imageUrl, onUpdatePage, propsHtml, propsImageUrl, propsTag, setImageUrl, tag]);

  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleCloseSelectMenu);
    };
  }, [handleCloseSelectMenu]);

  return (
    <S.NoteBlockLayout onDragEnter={onDragEnter} onDragEnd={onDragEnd}>
      {isSelectMenuOpen && (
        <SelectMenu
          onSelect={handleSelectTag}
          onClose={handleCloseSelectMenu}
          position={selectMenuPosition}
          menu={tagsMenu}
        />
      )}
      {!isSharedPage ? (
        <S.NoteBlockDragItem
          $image={dragHandleIcon}
          onClick={handleOpenSelectMenu}
          onDragStart={onDragStart}
          draggable={true}
        />
      ) : (
        <S.NoteBlockEmptyItem />
      )}
      {tag !== "img" && (
        <S.NoteBlockTextItem
          innerRef={contentEditableRef}
          ref={ref}
          html={html}
          tagName={tag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          disabled={isSharedPage}
          $isDragging={isDragging}
        />
      )}
      {tag === "img" && (
        <S.NoteBlockImageItem ref={ref} $isDragging={isDragging}>
          <input
            id={`${id}_fileInput`}
            name={tag}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            hidden
          />
          {!imageUrl && (
            <label htmlFor={`${id}_fileInput`}>이미지가 선택되지 않았어요. 선택해주세요.</label>
          )}
          {imageUrl && (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}${imageUrl}`}
              alt={/[^\/]+(?=\.[^\/.]*$)/.exec(imageUrl)[0]}
            />
          )}
        </S.NoteBlockImageItem>
      )}
    </S.NoteBlockLayout>
  );
}

const NoteBlockRef = forwardRef(NoteBlock);

export default NoteBlockRef;
