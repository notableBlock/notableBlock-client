import styled from "styled-components";

const Layout = styled.p`
  position: absolute;
  left: 1.75rem;
  right: 0;
  padding: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.color.placeholderColor};
  pointer-events: none;
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    padding: 0.375rem 0.5rem;
  }
`;

export { Layout };
