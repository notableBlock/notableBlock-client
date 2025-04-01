import { useState, useMemo, useCallback } from "react";

import getCaretCoordinates from "utils/getCaretCoordinates";

import { INITIAL_SELECTION_INDEX } from "src/constants";

import type { SyntheticEvent, KeyboardEvent, Dispatch, SetStateAction } from "react";
import type { Tag } from "types/block";
import type { ManageItem, SlashItem, Coordinate } from "types/menu";

interface UseControlMenu {
  html?: string;
  items?: ManageItem[] | SlashItem[];
  selectionIndex?: number;
  setHtmlBackup?: Dispatch<SetStateAction<string>>;
  setSelectionIndex?: (index: number | ((index: number) => number)) => void;
  position?: Coordinate;
  onSelect?: (item: (() => Promise<void>) | Tag) => void;
  onClose?: () => void;
}

const useControlMenu = ({
  html,
  items,
  selectionIndex,
  setHtmlBackup,
  setSelectionIndex,
  position,
  onClose,
  onSelect,
}: UseControlMenu) => {
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
    (event: SyntheticEvent) => {
      const coordinate = getCaretCoordinates();
      if (!coordinate) return;

      let { x, y } = coordinate;

      if (event instanceof MouseEvent) {
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
    command,
    positionAttributes,
    handleKeyDown,
    handleOpenSelectMenu,
    handleCloseSelectMenu,
    isSelectMenuOpen,
    selectMenuPosition,
  };
};

export default useControlMenu;
