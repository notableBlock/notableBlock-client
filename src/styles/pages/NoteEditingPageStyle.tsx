import styled from "styled-components";

interface SavingStatusItemProps {
  $isSaving: boolean;
}

const Layout = styled.div`
  display: flex;
  position: relative;
  height: 100%;

  @media (max-width: 768px) {
    width: 78vw;
  }
`;

const Item = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 3rem;
`;
const Status = styled.p<SavingStatusItemProps>`
  position: absolute;
  top: 1rem;
  left: calc(4.5% + 1rem);
  color: ${({ $isSaving, theme }) =>
    $isSaving ? theme.color.successColor : theme.color.placeholderColor};
`;

export { Layout, Item, Status };
