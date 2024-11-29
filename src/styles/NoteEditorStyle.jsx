import styled from "styled-components";

const NoteEditorLayout = styled.div`
  width: 90%;
  height: 90%;
  padding: 3rem;
  margin: auto;
  background: ${({ theme }) => theme.color.noteColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

export { NoteEditorLayout };
