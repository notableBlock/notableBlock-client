import { forwardRef, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";

import SelectMenu from "./SelectMenu";

import { uploadNoteImage } from "../services/note";
import getCaretCoordinates from "../utils/getCaretCoordinates";
import moveCaretToEnd from "../utils/moveCaretToEnd";
import { tagsMenu } from "../assets/data/menu";
import dragHandleIcon from "../assets/images/drag-handle-icon.png";

import * as S from "../styles/NoteBlockStyle";

function NoteBlock(
  {
    id,
    html: propsHtml,
    tag: propsTag,
    imageUrl: propsImageUrl,
    blockCount,
    noteId,
    isSharedPage,
    onUpdatePage,
    onAddBlock,
    onDeleteBlock,
    onFocusBlockByArrowKey,
    onDragStart,
    onDragEnter,
    onDragEnd,
    isDragging,
  },
  ref
) {
  const navigate = useNavigate();

  const [htmlBackup, setHtmlBackup] = useState(null);
  const [html, setHtml] = useState(propsHtml);
  const [tag, setTag] = useState(propsTag);
  const [imageUrl, setImageUrl] = useState(propsImageUrl);
  const [previousKey, setPreviousKey] = useState("");
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState({ x: null, y: null });

  const isSelectMenuOpenRef = useRef(isSelectMenuOpen);
  const blockCountRef = useRef(blockCount);
  const contentEditableRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    isSelectMenuOpenRef.current = isSelectMenuOpen;
    blockCountRef.current = blockCount;
  }, [isSelectMenuOpen, blockCount]);

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
  }, [html, tag, imageUrl, propsHtml, propsTag, propsImageUrl, id, onUpdatePage]);

  useEffect(() => {
    if (previousKey === "/") {
      setHtmlBackup(html);
    }
  }, [previousKey]);

  const handleChange = (e) => {
    setHtml(e.target.value);
  };

  const handleKeyDown = useCallback(
    (e) => {
      const userText = contentEditableRef.current.innerHTML;
      if (e.key === "Enter" && previousKey !== "Shift" && !isSelectMenuOpenRef.current) {
        if (e.nativeEvent.isComposing) return;
        e.preventDefault();
        onAddBlock({
          id,
          ref: contentEditableRef.current,
        });
      } else if (
        e.key === "Backspace" &&
        (!userText || userText === "<br>") &&
        blockCountRef.current !== 1
      ) {
        e.preventDefault();
        onDeleteBlock({
          id,
          ref: contentEditableRef.current,
        });
      } else if (e.key === "ArrowUp" && !isSelectMenuOpenRef.current) {
        if (e.nativeEvent.isComposing) return;
        e.preventDefault();
        onFocusBlockByArrowKey({ id, ref: contentEditableRef.current }, e.key);
      } else if (e.key === "ArrowDown" && !isSelectMenuOpenRef.current) {
        if (e.nativeEvent.isComposing) return;
        e.preventDefault();
        onFocusBlockByArrowKey({ id, ref: contentEditableRef.current }, e.key);
      }
      setPreviousKey(e.key);
    },
    [id, onAddBlock, onDeleteBlock, onFocusBlockByArrowKey, previousKey]
  );

  const handleKeyUp = (e) => {
    if (e.key === "/") {
      handleOpenSelectMenu(e);
    }
  };

  const handleCloseSelectMenu = useCallback(() => {
    setIsSelectMenuOpen(false);
    setSelectMenuPosition({ x: null, y: null });
    document.removeEventListener("click", handleCloseSelectMenu);
  }, []);

  const handleOpenSelectMenu = useCallback(
    (e) => {
      const { x, y } = getCaretCoordinates();

      if (e.type === "click") {
        setHtmlBackup(html);
      }

      setIsSelectMenuOpen(true);
      setSelectMenuPosition({ x, y });

      setTimeout(() => {
        document.addEventListener("click", handleCloseSelectMenu);
      }, 0);
    },
    [html, handleCloseSelectMenu]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleCloseSelectMenu);
    };
  }, [handleCloseSelectMenu]);

  const handleSelectTag = (selectedTag) => {
    if (selectedTag === "img") {
      setTag(selectedTag);
      handleCloseSelectMenu();

      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }, 0);

      onAddBlock({
        id,
        html: "",
        tag: "p",
        imageUrl: "",
        ref: contentEditableRef.current,
      });
    } else {
      setTag(selectedTag);
      setHtml(htmlBackup);

      setTimeout(() => {
        moveCaretToEnd(contentEditableRef.current);
      }, 0);

      handleCloseSelectMenu();
    }
  };

  const handleImageUpload = async () => {
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      const imageFile = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadedUrl = await uploadNoteImage(noteId, formData);
        setImageUrl(uploadedUrl);
      } catch (err) {
        navigate("/error", { state: { message: "이미지를 첨부하는데 실패했습니다." } });
      }
    }
  };
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
      <S.NoteBlockDragItem
        $image={dragHandleIcon}
        onClick={handleOpenSelectMenu}
        onDragStart={onDragStart}
        draggable={true}
      />
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
          isDragging={isDragging}
        />
      )}
      {tag === "img" && (
        <S.NoteBlockImageItem ref={ref} isDragging={isDragging}>
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
            <label htmlFor={`${id}_fileInput`}>이미지가 선택되지 않았습니다. 선택해주세요.</label>
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
