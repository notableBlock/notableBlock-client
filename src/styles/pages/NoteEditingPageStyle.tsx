import styled from "styled-components";

interface SavingStatusItemProps {
  $isSaving: boolean;
}

const Layout = styled.div`
  display: flex;
  position: relative;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Item = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 3rem;

  @media screen and (max-width: 768px) {
    right: 1rem;
    bottom: 1.5rem;
  }
`;
const Status = styled.p<SavingStatusItemProps>`
  position: absolute;
  top: 1rem;
  left: calc(4.5% + 1rem);
  color: ${({ $isSaving, theme }) =>
    $isSaving ? theme.color.successColor : theme.color.placeholderColor};

  @media screen and (max-width: 768px) {
    left: 4rem;
  }
`;

export { Layout, Item, Status };
