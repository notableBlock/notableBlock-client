import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Item = styled.div`
  overflow: auto;
  width: 100vw;

  ${({ $notification }) =>
    $notification === "notification" &&
    `
    overflow: visible;
    position: absolute;
    top: 2rem;
    right: 7rem;
    width: 0;
  `}
`;

const NotiContainer = styled.div`
  position: absolute;
  right: 3rem;
  width: 45rem;

  @media screen and (max-width: 768px) {
    right: 1rem;
    width: 37.5rem;
  }
`;

const Toast = styled.div`
  position: absolute;
  bottom: 8rem;
  right: 3rem;
`;

const Button = styled.button`
  align-self: flex-end;
  margin-right: 1.75rem;
  color: ${({ theme }) => theme.color.whiteColor};

  &:hover {
    text-decoration: underline;
  }
`;

export { Layout, Item, NotiContainer, Toast, Button };
