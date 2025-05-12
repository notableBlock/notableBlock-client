import styled from "styled-components";

interface SavingStatusItemProps {
  $isSaving: boolean;
}

const Layout = styled.div`
  display: flex;
  width: 85vw;
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
  left: 20rem;
  color: ${({ $isSaving, theme }) =>
    $isSaving ? theme.color.successColor : theme.color.failColor};
`;

export { Layout, Item, Status };
