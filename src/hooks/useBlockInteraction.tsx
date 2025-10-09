import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

import { useBlockActions } from "contexts/BlockActionsContext";

import { uploadNoteImage } from "services/noteServices";

import moveCaretToEnd from "utils/moveCaretToEnd";

import type { KeyboardEvent, KeyboardEventHandler, Dispatch, SetStateAction } from "react";
import type { ContentEditableEvent } from "react-contenteditable";
import type { BlockElement, Tag } from "types/block";
import type { BlockId } from "types/ids";

interface BlockInfo {
  id: BlockId;
  propsTag: Tag;
  propsImageUrl: string;
}

interface HtmlState {
  htmlBackup: string;
  setHtml: Dispatch<SetStateAction<string>>;
  setHtmlBackup: Dispatch<SetStateAction<string>>;
}

interface MenuHandlers {
  isSelectMenuOpen: boolean;
  handleOpenSelectMenu: KeyboardEventHandler<HTMLDivElement>;
  handleCloseSelectMenu: () => void;
}

interface UseBlockInteractionProps {
  block: BlockInfo;
  htmlState: HtmlState;
  menuHandlers: MenuHandlers;
}

const useBlockInteraction = ({ block, htmlState, menuHandlers }: UseBlockInteractionProps) => {
  const { id, propsTag, propsImageUrl } = block;
  const { htmlBackup, setHtml, setHtmlBackup } = htmlState;
  const { isSelectMenuOpen, handleOpenSelectMenu, handleCloseSelectMenu } = menuHandlers;
  const navigate = useNavigate();
  const location = useLocation();
  const { noteId, blockCount, handleAddBlock, handleDeleteBlock, handleFocusBlockByArrowKey } =
    useBlockActions();

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

      handleAddBlock({ id });
    },
    [id, handleAddBlock]
  );

  const handleBackspaceKey = useCallback(
    (event: KeyboardEvent, userText: string) => {
      if (userText && userText !== "<br>") return;
      if (!contentEditableRef.current) return;
      if (blockCountRef.current === 1) return;
      event.preventDefault();

      handleDeleteBlock({ id, ref: contentEditableRef.current });
    },
    [id, handleDeleteBlock]
  );

  const handleArrowKey = useCallback(
    (event: KeyboardEvent) => {
      if (!contentEditableRef.current) return;
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
      event.preventDefault();

      handleFocusBlockByArrowKey({ id, ref: contentEditableRef.current }, event.key);
    },
    [id, handleFocusBlockByArrowKey]
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

        handleAddBlock({
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
