import ContentEditable from "react-contenteditable";

import styled from "styled-components";

const NoteBlock = styled(ContentEditable)`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.noteBlockColor};

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.focusColor};
  }
`;

export { NoteBlock };
