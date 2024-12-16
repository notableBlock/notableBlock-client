import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Item = styled.div`
  overflow: auto;

  ${({ $notification }) =>
    $notification === "notification" &&
    `
    position: absolute;
    top: 1rem;
    right: 3rem;
    overflow: visible;
  `}
`;

const NotiContainer = styled.div`
  position: absolute;
  right: 5rem;
`;

const Toast = styled.div`
  position: absolute;
  bottom: 8rem;
  right: 3rem;
`;

export { Layout, Item, NotiContainer, Toast };
