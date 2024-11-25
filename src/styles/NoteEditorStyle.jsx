import styled from "styled-components";

const NoteEditorLayout = styled.div`
  width: 50rem;
  height: 40rem;
  padding: 3rem;
  background: ${({ theme }) => theme.color.noteColor};
  box-shadow: 0 4px 12px ${({ theme }) => theme.color.shadowColor};
`;

const NoteEditorBlock = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.color.noteBlockColor};
`;

export { NoteEditorLayout, NoteEditorBlock };
