import styled from "styled-components";
import ContentEditable from "react-contenteditable";

interface NoteBlockItemProps {
  $isDragging?: boolean;
  $image?: string;
}

const Layout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const TextItem = styled(ContentEditable)<NoteBlockItemProps>`
  flex-grow: 1;
  width: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.noteBlockColor};
  box-shadow: ${({ $isDragging, theme }) =>
    $isDragging ? `0 0.25rem 0.75rem ${theme.color.shadowColor}` : "none"};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.focusColor};
  }
`;

const ImageItem = styled.div<NoteBlockItemProps>`
  flex-grow: 1;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.noteBlockColor};
  box-shadow: ${({ $isDragging, theme }) =>
    $isDragging ? `0 0.25rem 0.75rem ${theme.color.shadowColor}` : "none"};

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }
`;

const DragItem = styled.img.attrs<NoteBlockItemProps>(({ $image }) => ({
  src: $image,
  alt: "드래그 버튼 아이콘",
}))`
  opacity: 0;
  transition: opacity 0.2s ease;
  margin-right: 0.25rem;
  border-radius: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  ${Layout}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }
`;

const EmptyItem = styled.div`
  width: 1.5rem;
`;

export { Layout, TextItem, ImageItem, DragItem, EmptyItem };
