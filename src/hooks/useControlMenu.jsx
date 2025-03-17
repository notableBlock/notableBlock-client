import { useState, useMemo, useCallback } from "react";

import getCaretCoordinates from "../utils/getCaretCoordinates";

import { INITIAL_SELECTION_INDEX } from "../constants";

const useControlMenu = ({
  html,
  items,
  selectionIndex,
  setHtmlBackup,
  setSelectionIndex,
  position,
  onClose,
  onSelect,
}) => {
  const [command, setCommand] = useState("");
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState({ x: null, y: null });

  const positionAttributes = useMemo(() => {
    return position ? { top: position.y, left: position.x } : "auto";
  }, [position]);

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          onSelect(items[selectionIndex].tag);
          break;
        case "Backspace":
        case "Escape":
          if (!command) onClose();
          setCommand((prev) => prev.slice(0, -1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectionIndex((prev) =>
            prev === INITIAL_SELECTION_INDEX ? items.length - 1 : prev - 1
          );
          break;
        case "ArrowDown":
        case "Tab":
          e.preventDefault();
          setSelectionIndex((prev) =>
            prev === items.length - 1 ? INITIAL_SELECTION_INDEX : prev + 1
          );
          break;
        default:
          setCommand((prev) => prev + e.key);
          break;
      }
    },
    [onClose, command, items, selectionIndex, onSelect, setSelectionIndex]
  );

  const handleCloseSelectMenu = useCallback(() => {
    setIsSelectMenuOpen(false);
    setSelectMenuPosition({ x: null, y: null });

    document.removeEventListener("click", handleCloseSelectMenu);
  }, []);

  const handleOpenSelectMenu = useCallback(
    (e) => {
      let { x, y } = getCaretCoordinates();

      if (e.type === "click") {
        x = e.clientX;
        y = e.clientY;
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
