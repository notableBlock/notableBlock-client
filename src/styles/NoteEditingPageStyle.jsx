import styled from "styled-components";

const NoteEditingPageLayout = styled.div`
  display: flex;
  width: 90vw;
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

export { NoteEditingPageLayout, NoteEditingPageItem };
