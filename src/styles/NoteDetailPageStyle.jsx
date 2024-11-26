import styled from "styled-components";

const NoteDetailPageLayout = styled.div`
  display: flex;
  width: 90vw;
  height: 100%;

  @media (max-width: 768px) {
    width: 78vw;
  }
`;

const NoteDetailItem = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 3rem;
`;

export { NoteDetailPageLayout, NoteDetailItem };
