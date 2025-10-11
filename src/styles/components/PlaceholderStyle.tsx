import styled from "styled-components";

const Layout = styled.p`
  position: absolute;
  left: 1.75rem;
  padding: 1rem;
  color: ${({ theme }) => theme.color.placeholderColor};
  pointer-events: none;
  user-select: none;
`;

export { Layout };
