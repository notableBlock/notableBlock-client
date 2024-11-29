import ContentEditable from "react-contenteditable";

import styled from "styled-components";

const NoteBlock = styled(ContentEditable)`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  padding: 1rem;
  background: ${({ theme }) => theme.color.noteBlockColor};
`;

export { NoteBlock };
