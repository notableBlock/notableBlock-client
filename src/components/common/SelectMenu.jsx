import { forwardRef, useState, useEffect, useCallback, useMemo, useRef } from "react";

import { matchSorter } from "match-sorter";

import useSelectionStore from "../../stores/useSelectionStore";

import { tagsMenu } from "../../assets/data/menu";
import { INITIAL_SELECTION_INDEX } from "../../constants";

import * as S from "../../styles/SelectMenuStyle";

function SelectMenu({ onSelect, onClose, position, menu, onImportFromLocal }, ref) {
  const { items, setItems, selectionIndex, setSelectionIndex } = useSelectionStore();
  const positionAttributes = useMemo(() => {
    return position ? { top: position.y, left: position.x } : "auto";
  }, [position]);

  const [command, setCommand] = useState("");
  const fileInputRef = useRef(null);

  const handleInputClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (command) {
      const filteredItems = matchSorter(tagsMenu, command, { keys: ["tag"] });
      setItems(filteredItems);
    } else {
      setItems(menu);
    }
  }, [command, menu, setItems]);

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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <S.SelectMenuLayout ref={ref} $position={positionAttributes}>
      {items.map((item, index) => {
        const isFileInput = item.label === "로컬에서 가져오기";

        return isFileInput ? (
          <S.SelectMenuContainer key={item.id}>
            <S.SelectMenuInput
              type="file"
              accept=".md"
              ref={fileInputRef}
              onChange={(e) => onImportFromLocal(e)}
            />
            <S.SelectMenuItem onClick={handleInputClick}>{item.label}</S.SelectMenuItem>
          </S.SelectMenuContainer>
        ) : (
          <S.SelectMenuItem
            key={item.id}
            $isSelected={index === selectionIndex}
            tabIndex="0"
            onClick={() => onSelect(item.tag)}
          >
            {item.label}
          </S.SelectMenuItem>
        );
      })}
    </S.SelectMenuLayout>
  );
}

const SelectMenuRef = forwardRef(SelectMenu);

export default SelectMenuRef;
