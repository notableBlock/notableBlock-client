import { forwardRef, useEffect } from "react";
import { matchSorter } from "match-sorter";

import useSelectionStore from "stores/useSelectionStore";

import useDragDrop from "hooks/useDragDrop";
import useControlMenu from "hooks/useControlMenu";

import { tagsMenu } from "assets/data/menu";

import * as S from "styles/components/SelectMenuStyle";

import type { ForwardedRef } from "react";
import type { SelectMenuProps } from "types/components";

function SelectMenu(
  { onSelect, onClose, position, menu, onImportFromLocal }: SelectMenuProps,
  ref: ForwardedRef<HTMLDivElement>
) {
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
    if (!command) return setItems(menu);

    const filteredItems = matchSorter(tagsMenu, command, { keys: ["tag"] });
    setItems(filteredItems);
  }, [command, menu, setItems]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <S.SelectMenuLayout ref={ref} $position={positionAttributes ?? { top: 0, left: 0 }}>
      {items.map((item, index) => {
        const isFileInput = item.label === "로컬에서 가져오기";

        return isFileInput ? (
          <S.SelectMenuContainer key={item.id}>
            <S.SelectMenuInput
              type="file"
              accept=".tar"
              ref={fileInputRef}
              onChange={(event) => onImportFromLocal(event)}
            />
            <S.SelectMenuItem onClick={handleFileInputClick}>{item.label}</S.SelectMenuItem>
          </S.SelectMenuContainer>
        ) : (
          <S.SelectMenuItem
            key={item.id}
            $isSelected={index === selectionIndex}
            tabIndex={0}
            onClick={() => {
              if (!item.tag) return;

              onSelect(item.tag);
            }}
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
