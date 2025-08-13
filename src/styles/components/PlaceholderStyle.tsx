import styled from "styled-components";

const Layout = styled.p`
  position: absolute;
  padding: 3rem;
  color: ${({ theme }) => theme.color.placeholderColor};
  pointer-events: none;
  user-select: none;
`;

export { Layout };
