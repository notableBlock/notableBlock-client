import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

import { uploadNoteImage } from "services/noteServices";

import moveCaretToEnd from "utils/moveCaretToEnd";

import type { KeyboardEvent, KeyboardEventHandler, Dispatch, SetStateAction } from "react";
import type { ContentEditableEvent } from "react-contenteditable";
import type { CurrentBlock, BlockElement, Tag } from "types/block";
import type { BlockId, NoteId } from "types/ids";
import type { ArrowKey } from "types/menu";

interface UseBlockInteraction {
  id: BlockId;
  isSelectMenuOpen: boolean;
  htmlBackup: string;
  setHtml: Dispatch<SetStateAction<string>>;
  setHtmlBackup: Dispatch<SetStateAction<string>>;
  propsImageUrl: string;
  propsTag: Tag;
  noteId: NoteId;
  blockCount: number;
  onAddBlock: (currentBlock: CurrentBlock) => void;
  onDeleteBlock: (currentBlock: CurrentBlock) => void;
  onFocusBlockByArrowKey: (currentBlock: CurrentBlock, arrowKey: ArrowKey) => void;
  handleOpenSelectMenu: KeyboardEventHandler<HTMLDivElement>;
  handleCloseSelectMenu: () => void;
}

const useBlockInteraction = ({
  id,
  isSelectMenuOpen,
  htmlBackup,
  setHtml,
  setHtmlBackup,
  propsImageUrl,
  propsTag,
  noteId,
  blockCount,
  onAddBlock,
  onDeleteBlock,
  onFocusBlockByArrowKey,
  handleOpenSelectMenu,
  handleCloseSelectMenu,
}: UseBlockInteraction) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tag, setTag] = useState(propsTag);
  const [previousKey, setPreviousKey] = useState("");
  const [imageUrl, setImageUrl] = useState(propsImageUrl);

  const isSelectMenuOpenRef = useRef(isSelectMenuOpen);
  const previousKeyRef = useRef("");
  const blockCountRef = useRef(blockCount);
  const contentEditableRef = useRef<BlockElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isSelectMenuOpenRef.current = isSelectMenuOpen;
    previousKeyRef.current = previousKey;
    blockCountRef.current = blockCount;
  }, [isSelectMenuOpen, previousKey, blockCount]);

  const handleChange = (event: ContentEditableEvent) => {
    setHtml(event.target.value);
  };

  const handleEnterKey = useCallback(
    (event: KeyboardEvent) => {
      if (previousKeyRef.current === "Shift" || isSelectMenuOpenRef.current) return;
      event.preventDefault();

      onAddBlock({ id });
    },
    [id, onAddBlock]
  );

  const handleBackspaceKey = useCallback(
    (event: KeyboardEvent, userText: string) => {
      if (userText && userText !== "<br>") return;
      if (!contentEditableRef.current) return;
      if (blockCountRef.current === 1) return;
      event.preventDefault();

      onDeleteBlock({ id, ref: contentEditableRef.current });
    },
    [id, onDeleteBlock]
  );

  const handleArrowKey = useCallback(
    (event: KeyboardEvent) => {
      if (!contentEditableRef.current) return;
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
      event.preventDefault();

      onFocusBlockByArrowKey({ id, ref: contentEditableRef.current }, event.key);
    },
    [id, onFocusBlockByArrowKey]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (!contentEditableRef.current) return;

    const userText = contentEditableRef.current.innerHTML;

    if (event.nativeEvent.isComposing && ["Enter", "ArrowUp", "ArrowDown"].includes(event.key))
      return;
    switch (event.key) {
      case "/":
        setHtmlBackup(userText);
        break;
      case "Enter":
        handleEnterKey(event);
        break;
      case "Backspace":
        handleBackspaceKey(event, userText);
        break;
      case "ArrowUp":
      case "ArrowDown":
        if (!isSelectMenuOpenRef.current) {
          handleArrowKey(event);
        }
        break;
      default:
        break;
    }

    setPreviousKey(event.key);
  };

  const handleKeyUp: KeyboardEventHandler = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key !== "/") return;
    handleOpenSelectMenu(event);
  };

  const handleSelectTag = (selectedTag: Tag) => {
    switch (selectedTag) {
      case "img":
        setTag(selectedTag);
        handleCloseSelectMenu();

        setTimeout(() => {
          if (!fileInputRef.current) return;

          fileInputRef.current.click();
        }, 0);
        if (!contentEditableRef.current) return;

        onAddBlock({
          id,
          html: "",
          tag: "p",
          imageUrl: "",
          ref: contentEditableRef.current,
        });
        break;
      default:
        setTag(selectedTag);
        setHtml(htmlBackup);

        setTimeout(() => {
          if (!contentEditableRef.current) return;

          moveCaretToEnd(contentEditableRef.current);
        }, 0);

        handleCloseSelectMenu();
        break;
    }
  };

  const handleImageUpload = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files) return;

    const imageFile = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const uploadedUrl = await uploadNoteImage(noteId, formData);
      setImageUrl(uploadedUrl);
    } catch (err) {
      navigate("/error", {
        state: { from: location.pathname, message: "이미지를 첨부하는데 실패했어요." },
      });
    }
  };

  return {
    tag,
    imageUrl,
    setImageUrl,
    fileInputRef,
    contentEditableRef,
    handleChange,
    handleKeyUp,
    handleKeyDown,
    handleSelectTag,
    handleImageUpload,
  };
};

export default useBlockInteraction;
