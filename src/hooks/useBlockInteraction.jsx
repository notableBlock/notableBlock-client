import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

import { uploadNoteImage } from "../services/noteServices";

import moveCaretToEnd from "../utils/moveCaretToEnd";

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
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tag, setTag] = useState(propsTag);
  const [previousKey, setPreviousKey] = useState("");
  const [imageUrl, setImageUrl] = useState(propsImageUrl);

  const isSelectMenuOpenRef = useRef(isSelectMenuOpen);
  const previousKeyRef = useRef(null);
  const blockCountRef = useRef(blockCount);
  const contentEditableRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    isSelectMenuOpenRef.current = isSelectMenuOpen;
    previousKeyRef.current = previousKey;
    blockCountRef.current = blockCount;
  }, [isSelectMenuOpen, previousKey, blockCount]);

  const handleChange = (e) => {
    setHtml(e.target.value);
  };

  const handleEnterKey = useCallback(
    (e) => {
      if (previousKeyRef.current !== "Shift" && !isSelectMenuOpenRef.current) {
        e.preventDefault();

        onAddBlock({ id, ref: contentEditableRef.current });
      }
    },
    [id, onAddBlock]
  );

  const handleBackspaceKey = useCallback(
    (e, userText) => {
      if ((!userText || userText === "<br>") && blockCountRef.current !== 1) {
        e.preventDefault();

        onDeleteBlock({ id, ref: contentEditableRef.current });
      }
    },
    [id, onDeleteBlock]
  );

  const handleArrowKey = useCallback(
    (e) => {
      e.preventDefault();

      onFocusBlockByArrowKey({ id, ref: contentEditableRef.current }, e.key);
    },
    [id, onFocusBlockByArrowKey]
  );

  const handleKeyDown = (e) => {
    const userText = contentEditableRef.current.innerHTML;

    if (e.nativeEvent.isComposing && ["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    switch (e.key) {
      case "/":
        setHtmlBackup(userText);
        break;
      case "Enter":
        handleEnterKey(e);
        break;
      case "Backspace":
        handleBackspaceKey(e, userText);
        break;
      case "ArrowUp":
      case "ArrowDown":
        if (!isSelectMenuOpenRef.current) {
          handleArrowKey(e);
        }
        break;
      default:
        break;
    }

    setPreviousKey(e.key);
  };

  const handleKeyUp = (e) => {
    if (e.key === "/") {
      handleOpenSelectMenu(e);
    }
  };

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
      formData.append("image", imageFile);

      try {
        const uploadedUrl = await uploadNoteImage(noteId, formData);
        setImageUrl(uploadedUrl);
      } catch (err) {
        navigate("/error", {
          state: { from: location.pathname, message: "이미지를 첨부하는데 실패했어요." },
        });
      }
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
