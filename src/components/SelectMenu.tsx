import { forwardRef, useEffect, useRef } from "react";
import { matchSorter } from "match-sorter";

import useSelectionStore from "stores/useSelectionStore";

import useDragDrop from "hooks/useDragDrop";
import useControlMenu from "hooks/useControlMenu";

import { tagsMenu } from "assets/data/menu";
import { NOTE_EDITING_SELECT_MENU_POSITION } from "src/constants";

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

  // 키보드 네비게이션 시 선택 항목이 가시 영역 밖이면 자동 스크롤
  // block: "nearest" — 이미 보이면 no-op이라 마우스 hover로 인한 점프 없음
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const target = itemRefs.current[selectionIndex];
    target?.scrollIntoView({ block: "nearest" });
  }, [selectionIndex]);

  const isExpanded = items.some((item) => "icon" in item && Boolean(item.icon));

  return (
    <S.Layout
      ref={ref}
      $position={positionAttributes ?? NOTE_EDITING_SELECT_MENU_POSITION}
      $expanded={isExpanded}
    >
      {items.map((item, index) => {
        const isFileInput = item.label === "로컬에서 가져오기";

        return isFileInput ? (
          <S.MenuBox
            key={item.id}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[index] = el;
            }}
          >
            <S.FileItem
              type="file"
              accept=".tar"
              ref={fileInputRef}
              onChange={(event) => onImportFromLocal?.(event)}
            />
            <S.MenuItem onClick={handleFileInputClick}>
              <S.TextBox>
                <S.Label>{item.label}</S.Label>
              </S.TextBox>
            </S.MenuItem>
          </S.MenuBox>
        ) : (
          <S.MenuItem
            key={item.id}
            ref={(el: HTMLButtonElement | null) => {
              itemRefs.current[index] = el;
            }}
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
            {item.icon && (
              <S.IconBox $isSelected={index === selectionIndex}>{item.icon}</S.IconBox>
            )}
            <S.TextBox>
              <S.Label>{item.label}</S.Label>
              {item.description && (
                <S.Description $isSelected={index === selectionIndex}>
                  {item.description}
                </S.Description>
              )}
            </S.TextBox>
          </S.MenuItem>
        );
      })}
    </S.Layout>
  );
}

const SelectMenuRef = forwardRef(SelectMenu);

export default SelectMenuRef;
