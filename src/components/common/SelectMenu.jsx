import { forwardRef, useState, useEffect, useCallback, useMemo } from "react";

import { matchSorter } from "match-sorter";

import useSelectionStore from "../../stores/useSelectionStore";

import { selectableTags } from "../../assets/data/selectableMenus";
import { INITIAL_SELECTION_INDEX } from "../../constants";

import * as S from "../../styles/SelectMenuStyle";

function SelectMenu({ onSelect, onClose, position, menu }, ref) {
  const { items, setItems, selectionIndex, setSelectionIndex } = useSelectionStore();
  const [command, setCommand] = useState("");
  const positionAttributes = useMemo(() => {
    return position ? { top: position.y, left: position.x } : "auto";
  }, [position]);

  useEffect(() => {
    if (command) {
      const filteredItems = matchSorter(selectableTags, command, { keys: ["tag"] });
      setItems(filteredItems);
    } else {
      setItems(menu);
    }
  }, [command, menu, setItems]);

  const handleKeyDown = useCallback(
    (e) => {
      let newIndex;
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
          newIndex =
            selectionIndex === INITIAL_SELECTION_INDEX ? items.length - 1 : selectionIndex - 1;
          setSelectionIndex(newIndex);
          break;
        case "ArrowDown":
        case "Tab":
          e.preventDefault();
          newIndex =
            selectionIndex === items.length - 1 ? INITIAL_SELECTION_INDEX : selectionIndex + 1;
          setSelectionIndex(newIndex);
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
      {items.map((item, index) => (
        <S.SelectMenuItem key={item.id} $isSelected={index === selectionIndex}>
          <div tabIndex="0" onClick={() => onSelect(item.tag)}>
            {item.label}
          </div>
        </S.SelectMenuItem>
      ))}
    </S.SelectMenuLayout>
  );
}

const SelectMenuRef = forwardRef(SelectMenu);

export default SelectMenuRef;
