import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Item = styled.div`
  overflow: auto;

  ${({ type }) =>
    type === "notification" &&
    `
    position: absolute;
    top: 1rem;
    right: 3rem;
    overflow: visible;
  `}
`;

export { Layout, Item };
