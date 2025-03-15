import styled from "styled-components";

const SelectMenuLayout = styled.div`
  display: flex;
  position: absolute;
  top: ${({ $position }) => $position.top + "px"};
  left: ${({ $position }) => $position.left + "px"};
  flex-direction: column;
  width: 7.5rem;
  background-color: ${({ theme }) => theme.color.whiteColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const SelectMenuItem = styled.button`
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

const SelectMenuContainer = styled.div`
  padding: 0;
`;

const SelectMenuInput = styled.input`
  display: none;
`;

export { SelectMenuLayout, SelectMenuItem, SelectMenuContainer, SelectMenuInput };
