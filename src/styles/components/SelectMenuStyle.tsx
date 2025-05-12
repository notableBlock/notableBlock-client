import styled from "styled-components";

interface SelectMenuLayoutProps {
  $position: {
    top: number;
    left: number;
  };
}

interface SelectMenuItemProps {
  $isSelected?: boolean;
}

const Layout = styled.div<SelectMenuLayoutProps>`
  display: flex;
  position: absolute;
  top: ${({ $position }) => $position.top + "px"};
  left: ${({ $position }) => $position.left + "px"};
  flex-direction: column;
  width: 5.5rem;
  background-color: ${({ theme }) => theme.color.whiteColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
  word-break: keep-all;

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

  &:hover {
    background-color: ${({ theme }) => theme.color.mainColor};
    color: ${({ theme }) => theme.color.whiteColor};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const FileItem = styled.input`
  display: none;
`;

export { Layout, MenuItem, MenuBox, FileItem };
