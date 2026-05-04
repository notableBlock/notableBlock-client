import styled from "styled-components";
import { NavLink } from "react-router";

import { CONTENT_MAX_WIDTH } from "styles/layoutConstants";

interface NoteViewerImageProps {
  $src: string;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${CONTENT_MAX_WIDTH};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ theme }) => theme.color.cardBgColor};
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  }

  @media screen and (max-width: 768px) {
    width: calc(100% - 2rem);
    max-width: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0.25rem 0.625rem 0.75rem;
  color: ${({ theme }) => theme.color.metaTextColor};
  font-size: ${({ theme }) => theme.fontSize.medium};

  @media screen and (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  height: 12rem;
  max-height: 12rem;
  padding: 1.5rem 2rem;
  color: ${({ theme }) => theme.color.contentTextColor};
  word-break: keep-all;
  text-align: left;
  line-height: 1.6;

  h1 {
    font-size: 1.375rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  h2 {
    font-size: 1.125rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    margin-bottom: 0.375rem;
    line-height: 1.4;
  }

  h3 {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }

  p {
    font-size: 0.9375rem;
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    line-height: 1.7;
    color: ${({ theme }) => theme.color.metaTextColor};
  }

  blockquote {
    font-size: 0.9375rem;
    font-style: italic;
    line-height: 1.7;
    color: ${({ theme }) => theme.color.metaTextColor};
    border-left: 3px solid ${({ theme }) => theme.color.mainColor};
    padding-left: 0.75rem;
    margin: 0.25rem 0;
  }

  /* 코드 블록만 매칭 — 인라인 <code>(p 안 등)는 GlobalStyle이 처리 */
  & > code {
    display: block;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    background-color: #1e1e2e;
    color: #cdd6f4;
    padding: 1rem 1.25rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    tab-size: 2;
    width: 100%;
    box-sizing: border-box;
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

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3rem;
    background: linear-gradient(transparent, ${({ theme }) => theme.color.cardBgColor});
    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    height: 8rem;
    max-height: 8rem;
    padding: 1rem 1.25rem;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.color.metaTextColor};
  font-size: ${({ theme }) => theme.fontSize.medium};
  border-top: 1px solid ${({ theme }) => theme.color.borderColor};

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.25rem 0.75rem;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  @media screen and (max-width: 768px) {
    font-size: 0.875rem;
    min-width: 40%;
  }
`;

const Link = styled(NavLink)``;

const Icon = styled.img.attrs<NoteViewerImageProps>(({ $src }) => ({
  src: $src,
}))`
  width: 1.25rem;
  border-radius: 0.5rem;

  @media screen and (max-width: 768px) {
    width: 1.125rem;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 6rem;
  object-fit: contain;
  border-radius: 0.25rem;
  margin-bottom: 0.375rem;

  @media screen and (max-width: 768px) {
    max-height: 4rem;
  }
`;

// 뷰어용 구분선: hr 의미 그대로 사용
const DividerLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.borderColor};
  margin: 0.5rem 0;
`;

interface TodoLineProps {
  $checked?: boolean;
}

// 뷰어용 todo: 비활성 체크박스 + 텍스트
const TodoLine = styled.div<TodoLineProps>`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 0.25rem;

  & > input[type="checkbox"] {
    margin-top: 0.3rem;
    accent-color: ${({ theme }) => theme.color.mainColor};
    cursor: default;
    flex-shrink: 0;
  }

  & > span {
    font-size: 0.9375rem;
    line-height: 1.7;
    text-decoration: ${({ $checked }) => ($checked ? "line-through" : "none")};
    color: ${({ $checked, theme }) =>
      $checked ? theme.color.placeholderColor : theme.color.contentTextColor};
  }
`;

export {
  Layout,
  Header,
  Content,
  Footer,
  Section,
  Icon,
  Link,
  PreviewImage,
  DividerLine,
  TodoLine,
};
