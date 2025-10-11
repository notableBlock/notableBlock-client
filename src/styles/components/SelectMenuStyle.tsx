import styled from "styled-components";

interface SelectMenuLayoutProps {
  $position: {
    top: number | string;
    left: number | string;
  };
}

interface SelectMenuItemProps {
  $isSelected?: boolean;
}

const Layout = styled.div<SelectMenuLayoutProps>`
  display: flex;
  position: fixed;
  top: ${({ $position }) =>
    typeof $position.top === "number" ? $position.top + "px" : $position.top};
  left: ${({ $position }) =>
    typeof $position.left === "number" ? $position.left + "px" : $position.left};
  flex-direction: column;
  width: 5.5rem;
  background-color: ${({ theme }) => theme.color.whiteColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
  word-break: keep-all;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    width: 5rem;
  }
`;

const MenuBox = styled.div`
  padding: 0;
`;

const MenuItem = styled.button<SelectMenuItemProps>`
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.mainColor : theme.color.whiteColor};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.whiteColor : theme.color.blackColor};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  font-size: ${({ theme }) => theme.fontSize.small};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const FileItem = styled.input`
  display: none;
`;

export { Layout, MenuItem, MenuBox, FileItem };
