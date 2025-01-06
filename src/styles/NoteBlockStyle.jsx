import ContentEditable from "react-contenteditable";

import styled from "styled-components";

const NoteBlockLayout = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const NoteBlockTextItem = styled(ContentEditable)`
  flex-grow: 1;
  text-align: left;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.noteBlockColor};

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.focusColor};
  }
`;

const NoteBlockImageItem = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.color.noteBlockColor};

  &:hover {
    background-color: ${({ theme }) => theme.color.hoverColor};
  }
`;

export { NoteBlockLayout, NoteBlockTextItem, NoteBlockImageItem };
