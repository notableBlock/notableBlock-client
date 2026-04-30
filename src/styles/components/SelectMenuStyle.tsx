import styled from "styled-components";

interface SelectMenuLayoutProps {
  $position: {
    top: number | string;
    left: number | string;
  };
  $expanded?: boolean;
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
  width: ${({ $expanded }) => ($expanded ? "16rem" : "max-content")};
  min-width: ${({ $expanded }) => ($expanded ? "auto" : "6rem")};
  max-width: 16rem;
  max-height: 18rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.whiteColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 0.375rem;
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
  word-break: keep-all;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    max-width: min(16rem, 90vw);
  }
`;

const MenuBox = styled.div`
  padding: 0;
`;

const MenuItem = styled.button<SelectMenuItemProps>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.mainColor : theme.color.whiteColor};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.whiteColor : theme.color.blackColor};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  font-size: ${({ theme }) => theme.fontSize.small};
  cursor: pointer;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }
`;

const IconBox = styled.span<SelectMenuItemProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.color.whiteColor : theme.color.borderColor};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.color.whiteColor};
  color: ${({ theme }) => theme.color.blackColor};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  line-height: 1.3;
`;

const Description = styled.span<SelectMenuItemProps>`
  font-size: 0.75rem;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.whiteColor : theme.color.metaTextColor};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileItem = styled.input`
  display: none;
`;

export { Layout, MenuItem, MenuBox, FileItem, IconBox, TextBox, Label, Description };
