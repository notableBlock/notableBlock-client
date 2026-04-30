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
  margin-bottom: 0.25rem;

  h1 {
    font-size: 1.375rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 1.4;
  }

  h2 {
    font-size: 1.125rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    line-height: 1.4;
  }

  h3 {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    line-height: 1.5;
  }

  p {
    font-size: 0.9375rem;
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    line-height: 1.7;
  }

  code {
    display: block;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    background-color: #1e1e2e;
    color: #cdd6f4;
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    tab-size: 2;

    &:hover,
    &:focus {
      background-color: #1e1e2e;
      box-shadow: inset 2px 0 0 ${({ theme }) => theme.color.mainColor};
    }

    @media screen and (max-width: 768px) {
      font-size: 0.8125rem;
      padding: 0.75rem 1rem;
    }
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-built_in {
    color: #cba6f7;
  }
  .hljs-string,
  .hljs-attr {
    color: #a6e3a1;
  }
  .hljs-number,
  .hljs-literal {
    color: #fab387;
  }
  .hljs-comment,
  .hljs-quote {
    color: #6c7086;
    font-style: italic;
  }
  .hljs-function .hljs-title,
  .hljs-title.function_ {
    color: #89b4fa;
  }
  .hljs-title,
  .hljs-name,
  .hljs-tag {
    color: #89dceb;
  }
  .hljs-variable,
  .hljs-params {
    color: #f5e0dc;
  }
`;

const TextItem = styled(ContentEditable)<NoteBlockItemProps>`
  flex-grow: 1;
  width: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: transparent;
  border-radius: 0.375rem;
  color: ${({ theme }) => theme.color.contentTextColor};
  line-height: 1.6;
  transition: background-color 0.15s ease;
  box-shadow: ${({ $isDragging, theme }) =>
    $isDragging ? `0 0.25rem 0.75rem ${theme.color.shadowColor}` : "none"};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.focusColor};
    box-shadow: inset 2px 0 0 ${({ theme }) => theme.color.mainColor};
  }

  @media screen and (max-width: 768px) {
    padding: 0.375rem 0.5rem;
  }
`;

const ImageItem = styled.div<NoteBlockItemProps>`
  flex-grow: 1;
  padding: 0.5rem 0.75rem;
  background-color: transparent;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease;
  box-shadow: ${({ $isDragging, theme }) =>
    $isDragging ? `0 0.25rem 0.75rem ${theme.color.shadowColor}` : "none"};

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }

  @media screen and (max-width: 768px) {
    padding: 0.375rem 0.5rem;
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
