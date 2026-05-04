import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import hljs from "highlight.js/lib/common";

import { useBlockActions } from "contexts/BlockActionsContext";

import { uploadNoteImage } from "services/noteServices";

import moveCaretToEnd from "utils/moveCaretToEnd";
import { toggleInlineCode } from "utils/inlineFormat";

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
      if (isSelectMenuOpenRef.current) return;

      // 코드 블록: Enter는 줄바꿈, Shift+Enter는 새 블록 (다른 블록과 반대)
      if (tag === "code") {
        if (previousKeyRef.current === "Shift") {
          event.preventDefault();
          handleAddBlock({ id });
          return;
        }
        event.preventDefault();
        document.execCommand("insertLineBreak");
        return;
      }

      if (previousKeyRef.current === "Shift") return;
      event.preventDefault();

      handleAddBlock({ id });
    },
    [id, tag, handleAddBlock]
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

    // 인라인 포맷팅 단축키: Cmd/Ctrl + B / I / E
    // - IME 조합 중에는 비활성 (조합 한글 손상 방지)
    // - code 블록 안에서는 비활성 (blur 시 highlightAuto가 innerHTML을 덮어써 무의미)
    const isMod = event.metaKey || event.ctrlKey;
    if (isMod && !event.nativeEvent.isComposing && tag !== "code") {
      const formatKey = event.key.toLowerCase();
      if (formatKey === "b" || formatKey === "i" || formatKey === "e") {
        event.preventDefault();
        if (formatKey === "b") document.execCommand("bold");
        else if (formatKey === "i") document.execCommand("italic");
        else toggleInlineCode();
        // execCommand/DOM 변형은 ContentEditable의 input 이벤트를 발생시켜
        // handleChange → setHtml가 자동 트리거됨
        setPreviousKey(event.key);
        return;
      }
    }

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
    if (event.key === "/") {
      handleOpenSelectMenu(event);
      return;
    }

    // ``` 입력 시 빈 블록을 코드 블록으로 전환 (innerText로 정확히 백틱 3개만 있는지 확인)
    if (event.key === "`" && contentEditableRef.current?.innerText === "```") {
      setTag("code");
      setHtml("");

      setTimeout(() => {
        if (!contentEditableRef.current) return;
        moveCaretToEnd(contentEditableRef.current);
      }, 0);
    }
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
      case "divider":
        // divider는 caret을 받지 못하므로 입력 흐름 유지를 위해 다음 빈 p 블록을 자동 추가
        setTag(selectedTag);
        setHtml("");
        handleCloseSelectMenu();

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

  const handleBlur = useCallback(() => {
    if (tag !== "code") return;
    if (!contentEditableRef.current) return;

    const plainText = contentEditableRef.current.innerText;
    if (!plainText.trim()) return;

    const highlighted = hljs.highlightAuto(plainText).value.replace(/\n/g, "<br>");
    setHtml(highlighted);
  }, [tag, setHtml]);

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
    blockState: {
      tag,
      imageUrl,
      setImageUrl,
    },
    refs: {
      fileInputRef,
      contentEditableRef,
    },
    blockHandlers: {
      handleChange,
      handleKeyUp,
      handleKeyDown,
      handleSelectTag,
      handleImageUpload,
      handleBlur,
    },
  };
};

export default useBlockInteraction;
