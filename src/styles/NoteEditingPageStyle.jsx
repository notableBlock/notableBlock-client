import styled from "styled-components";

const NoteEditingPageLayout = styled.div`
  display: flex;
  width: 85vw;
  height: 100%;

  @media (max-width: 768px) {
    width: 78vw;
  }
`;

const NoteEditingPageItem = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 3rem;
`;
const SavingStatusItem = styled.p`
  position: absolute;
  top: 1rem;
  left: 20rem;
  color: ${({ $isSaving, theme }) =>
    $isSaving ? theme.color.successColor : theme.color.failColor};
`;

export { NoteEditingPageLayout, NoteEditingPageItem, SavingStatusItem };
