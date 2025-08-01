import styled from "styled-components";

const Layout = styled.div`
  overflow: auto;
  width: 90%;
  height: 90%;
  padding: 2rem;
  padding-left: 0.5rem;
  margin: auto;
  background-color: ${({ theme }) => theme.color.noteColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

export { Layout };
