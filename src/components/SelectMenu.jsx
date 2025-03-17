import { forwardRef, useEffect } from "react";
import { matchSorter } from "match-sorter";

import useSelectionStore from "../stores/useSelectionStore";

import useDragDrop from "../hooks/useDragDrop";

import { tagsMenu } from "../assets/data/menu";

import * as S from "../styles/components/SelectMenuStyle";
import useControlMenu from "../hooks/useControlMenu";

function SelectMenu({ onSelect, onClose, position, menu, onImportFromLocal }, ref) {
  const { items, setItems, selectionIndex, setSelectionIndex } = useSelectionStore();

  const { fileInputRef, handleFileInputClick } = useDragDrop();
  const { command, positionAttributes, handleKeyDown } = useControlMenu({
    position,
    onSelect,
    items,
    selectionIndex,
    onClose,
    setSelectionIndex,
  });

  useEffect(() => {
    if (command) {
      const filteredItems = matchSorter(tagsMenu, command, { keys: ["tag"] });
      setItems(filteredItems);
    } else {
      setItems(menu);
    }
  }, [command, menu, setItems]);

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
              accept=".tar"
              ref={fileInputRef}
              onChange={(e) => onImportFromLocal(e)}
            />
            <S.SelectMenuItem onClick={handleFileInputClick}>{item.label}</S.SelectMenuItem>
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
