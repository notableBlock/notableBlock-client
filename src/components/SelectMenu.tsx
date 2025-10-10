import { forwardRef, useEffect } from "react";
import { matchSorter } from "match-sorter";

import useSelectionStore from "stores/useSelectionStore";

import useDragDrop from "hooks/useDragDrop";
import useControlMenu from "hooks/useControlMenu";

import { tagsMenu } from "assets/data/menu";

import * as S from "styles/components/SelectMenuStyle";

import type { ForwardedRef } from "react";
import type { Tag } from "types/block";
import type { SelectMenuProps } from "types/components";

function SelectMenu(
  { onSelect, onClose, position, menu, onImportFromLocal }: SelectMenuProps<Tag>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { items, setItems, selectionIndex, setSelectionIndex } = useSelectionStore();

  const {
    refs: { fileInputRef },
    dragHandlers: { handleFileInputClick },
  } = useDragDrop();
  const {
    menuState: { command, positionAttributes },
    menuHandlers: { handleKeyDown },
  } = useControlMenu({
    menuState: {
      items,
      selectionIndex,
      setSelectionIndex,
    },
    position,
    menuHandlers: {
      onSelect: onSelect as (item: (() => Promise<void>) | Tag) => void,
      onClose,
    },
  });

  useEffect(() => {
    if (!command) return setItems(menu);

    const filteredItems = matchSorter(tagsMenu, command, { keys: ["tag"] });
    setItems(filteredItems);
  }, [command, menu, setItems]);

  useEffect(() => {
    if (!handleKeyDown) return;

    const listener = handleKeyDown as unknown as EventListener;
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleKeyDown]);

  return (
    <S.Layout ref={ref} $position={positionAttributes ?? { top: 0, left: 0 }}>
      {items.map((item, index) => {
        const isFileInput = item.label === "로컬에서 가져오기";

        return isFileInput ? (
          <S.MenuBox key={item.id}>
            <S.FileItem
              type="file"
              accept=".tar"
              ref={fileInputRef}
              onChange={(event) => onImportFromLocal?.(event)}
            />
            <S.MenuItem onClick={handleFileInputClick}>{item.label}</S.MenuItem>
          </S.MenuBox>
        ) : (
          <S.MenuItem
            key={item.id}
            $isSelected={index === selectionIndex}
            tabIndex={0}
            onClick={() => {
              if (!item.tag) return;

              onSelect(item.tag);
            }}
            onMouseEnter={() => {
              setSelectionIndex(index);
            }}
          >
            {item.label}
          </S.MenuItem>
        );
      })}
    </S.Layout>
  );
}

const SelectMenuRef = forwardRef(SelectMenu);

export default SelectMenuRef;
