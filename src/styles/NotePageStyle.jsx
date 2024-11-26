import { NavLink } from "react-router";

import styled from "styled-components";

const NotePageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5rem;
  gap: 3rem;
`;

const NoteLink = styled(NavLink)``;

const NotePageItem = styled.div`
  ${({ type }) =>
    type === "option" &&
    `
    position: absolute;
    right: 3rem;
    bottom: 3rem;`}
`;

export { NotePageLayout, NoteLink, NotePageItem };
