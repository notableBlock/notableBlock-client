import ContentEditable from "react-contenteditable";

import styled from "styled-components";

const NoteBlockLayout = styled.div``;

const NoteBlockItem = styled(ContentEditable)`
  display: flex;
  text-align: left;
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.noteBlockColor};

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.focusColor};
  }
`;

export { NoteBlockLayout, NoteBlockItem };
