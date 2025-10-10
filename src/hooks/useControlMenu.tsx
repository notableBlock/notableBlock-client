import { useState, useMemo, useCallback } from "react";

import getCaretCoordinates from "utils/getCaretCoordinates";

import { INITIAL_SELECTION_INDEX } from "src/constants";

import type { PointerEvent, KeyboardEvent, Dispatch, SetStateAction } from "react";
import type { ManageItem, SlashItem, Coordinate } from "types/menu";
import type { Tag } from "types/block";

interface HtmlState {
  html?: string;
  setHtmlBackup?: Dispatch<SetStateAction<string>>;
}

interface MenuState {
  items?: ManageItem[] | SlashItem[];
  selectionIndex?: number;
  setSelectionIndex?: (index: number | ((index: number) => number)) => void;
}

interface MenuHandlers {
  onSelect?: (item: (() => Promise<void>) | Tag) => void;
  onClose?: () => void;
}

interface UseControlMenuProps {
  htmlState?: HtmlState;
  menuState?: MenuState;
  position?: Coordinate;
  menuHandlers?: MenuHandlers;
}

const useControlMenu = ({ htmlState, menuState, position, menuHandlers }: UseControlMenuProps) => {
  const { html, setHtmlBackup } = htmlState || {};
  const { items, selectionIndex, setSelectionIndex } = menuState || {};
  const { onSelect, onClose } = menuHandlers || {};

  const [command, setCommand] = useState("");
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState<Coordinate>({ x: 0, y: 0 });

  const positionAttributes = useMemo(() => {
    if (!position) return;

    return { top: position.y, left: position.x };
  }, [position]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          event.preventDefault();
          const selectedTag = items[selectionIndex].tag;

          if (!selectedTag) return;
          onSelect(selectedTag);
          break;
        case "Backspace":
        case "Escape":
          if (!command) onClose();
          setCommand((prev) => prev.slice(0, -1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectionIndex((prev: number) =>
            prev === INITIAL_SELECTION_INDEX ? items.length - 1 : prev - 1
          );
          break;
        case "ArrowDown":
        case "Tab":
          event.preventDefault();
          setSelectionIndex((prev: number) =>
            prev === items.length - 1 ? INITIAL_SELECTION_INDEX : prev + 1
          );
          break;
        default:
          setCommand((prev) => prev + event.key);
          break;
      }
    },
    [onClose, command, items, selectionIndex, onSelect, setSelectionIndex]
  );

  const handleCloseSelectMenu = useCallback(() => {
    setIsSelectMenuOpen(false);
    setSelectMenuPosition({ x: 0, y: 0 });

    document.removeEventListener("click", handleCloseSelectMenu);
  }, []);

  const handleOpenSelectMenu = useCallback(
    (event: PointerEvent | KeyboardEvent) => {
      const coordinate = getCaretCoordinates();
      if (!coordinate) return;

      let { x, y } = coordinate;

      if ("clientX" in event) {
        x = event.clientX;
        y = event.clientY;

        setHtmlBackup(html);
      }

      setIsSelectMenuOpen(true);
      setSelectMenuPosition({ x, y });

      setTimeout(() => {
        document.addEventListener("click", handleCloseSelectMenu);
      }, 0);
    },
    [html, setHtmlBackup, handleCloseSelectMenu]
  );

  return {
    menuState: {
      command,
      isSelectMenuOpen,
      selectMenuPosition,
      positionAttributes,
    },
    menuHandlers: {
      handleKeyDown,
      handleOpenSelectMenu,
      handleCloseSelectMenu,
    },
  };
};

export default useControlMenu;
