import styled from "styled-components";

interface NoteTreeImageProps {
  $src: string;
}

interface UnorderedListProps {
  $isInfoOpen: boolean;
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const UnorderedList = styled.ul<UnorderedListProps>`
  display: flex;
  position: absolute;
  top: 3rem;
  left: 15rem;
  right: 8rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
  background-color: ${({ theme }) => theme.color.whiteColor};
  z-index: 10;

  li {
    display: flex;
    gap: 0.375rem;
    margin: 0.5rem;
    text-align: left;
    align-items: center;
    line-height: 1.4;
  }

  li span {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.mainColor};
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    left: 1rem;
    right: 1rem;
    top: 4rem;
    padding: ${({ $isInfoOpen }) => ($isInfoOpen ? "0.75rem" : "0 0.75rem")};
    max-height: ${({ $isInfoOpen }) => ($isInfoOpen ? "80vh" : "0")};
    opacity: ${({ $isInfoOpen }) => ($isInfoOpen ? 1 : 0)};
    visibility: ${({ $isInfoOpen }) => ($isInfoOpen ? "visible" : "hidden")};
    overflow-y: auto;
    transition:
      max-height 0.3s ease,
      padding 0.3s ease,
      opacity 0.3s ease,
      visibility 0.3s ease;
    box-shadow: ${({ $isInfoOpen, theme }) =>
      $isInfoOpen
        ? `0 0.25rem 0.75rem ${theme.color.shadowColor}`
        : "none"};
  }

  @media screen and (max-width: 480px) {
    padding: ${({ $isInfoOpen }) =>
      $isInfoOpen ? "0.625rem" : "0 0.625rem"};

    li {
      font-size: 0.875rem;
      margin: 0.25rem;
    }
  }
`;

const InfoBox = styled.div`
  padding: 0.5rem;
  min-width: 15rem;
  border-right: 1px solid ${({ theme }) => theme.color.shadowColor};

  h3 {
    padding-bottom: 0.5rem;
  }

  &:last-child {
    border-right: none;
  }

  @media screen and (max-width: 1024px) {
    min-width: 0;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.shadowColor};

    &:last-child {
      border-bottom: none;
    }
  }

  @media screen and (max-width: 768px) {
    min-width: 0;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.shadowColor};

    &:last-child {
      border-bottom: none;
    }
  }

  @media screen and (max-width: 480px) {
    h3 {
      font-size: 1rem;
      padding-bottom: 0.25rem;
    }
  }
`;

const InfoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;

  h3 {
    padding: 0;
  }

  img {
    width: 1.75rem;
  }

  @media screen and (max-width: 480px) {
    img {
      width: 1.5rem;
    }
  }
`;

const Icon = styled.img.attrs<NoteTreeImageProps>(({ $src }) => ({
  src: $src,
}))`
  width: 1.5rem;
  vertical-align: middle;
  border-radius: 0.5rem;
  flex-shrink: 0;

  @media screen and (max-width: 480px) {
    width: 1.25rem;
  }
`;

/* 모바일 Info 토글 버튼 — 데스크톱에서는 숨김 */
const InfoToggleButton = styled.button`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1rem;
    right: 5rem;
    z-index: 11;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.color.mainColor};
    color: ${({ theme }) => theme.color.whiteColor};
    cursor: pointer;
    box-shadow: 0 0.125rem 0.5rem ${({ theme }) => theme.color.shadowColor};
  }
`;

export { Layout, UnorderedList, InfoBox, InfoHeader, Icon, InfoToggleButton };
