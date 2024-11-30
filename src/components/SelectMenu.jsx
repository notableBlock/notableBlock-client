import { useState, useEffect } from "react";

import { matchSorter } from "match-sorter";

import { INITIAL_SELECTION_INDEX } from "../constants";

import * as S from "../styles/SelectMenuStyle";

function SelectMenu({ onSelect, onClose, position }) {
  const selectableTags = [
    {
      id: "page-title",
      tag: "h1",
      label: "섹션 제목(대)",
    },
    {
      id: "heading",
      tag: "h2",
      label: "섹션 제목(중)",
    },
    {
      id: "subheading",
      tag: "h3",
      label: "섹션 제목(소)",
    },
    {
      id: "paragraph",
      tag: "p",
      label: "텍스트",
    },
    {
      id: "image",
      tag: "img",
      label: "이미지",
    },
    {
      id: "delete",
      tag: "",
      label: "삭제",
    },
  ];

  const [command, setCommand] = useState("");
  const [items, setItems] = useState(selectableTags);
  const [selectionIndex, setSelectionIndex] = useState(0);

  const positionAttributes = { top: position.y, left: position.x };
  const FINAL_SELECTION_INDEX = items.length - 1;

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          onSelect(items[selectionIndex].tag);
          break;
        case "Backspace":
        case "Escape":
          if (!command) onClose();
          setCommand(command.substring(0, command.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectionIndex((prev) =>
            prev === INITIAL_SELECTION_INDEX ? FINAL_SELECTION_INDEX : prev - 1
          );
          break;
        case "ArrowDown":
        case "Tab":
          e.preventDefault();
          setSelectionIndex((prev) =>
            prev === FINAL_SELECTION_INDEX ? INITIAL_SELECTION_INDEX : prev + 1
          );
          break;
        default:
          setCommand((prev) => prev + e.key);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, command, items, onSelect, selectionIndex]);

  useEffect(() => {
    if (command) {
      const items = matchSorter(selectableTags, command, { keys: ["tag"] });

      setItems(items);
    } else {
      setItems(selectableTags);
    }
  }, [command]);

  return (
    <S.SelectMenuLayout $position={positionAttributes}>
      {items.map((item, index) => (
        <S.SelectMenuItem key={item.id} $isSelected={index === selectionIndex}>
          <div
            tabIndex="0"
            onClick={() => {
              onSelect(item.tag);
            }}
          >
            {item.label}
          </div>
        </S.SelectMenuItem>
      ))}
    </S.SelectMenuLayout>
  );
}

export default SelectMenu;
