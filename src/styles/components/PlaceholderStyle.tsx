import styled from "styled-components";

const Layout = styled.p`
  position: absolute;
  left: 1.75rem;
  padding: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.color.placeholderColor};
  pointer-events: none;
  user-select: none;
`;

export { Layout };
