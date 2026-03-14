import styled from "styled-components";

interface ItemProps {
  $notification?: string;
}

const Layout = styled.div`
  display: flex;
  height: 100vh;

  @media screen and (max-width: 768px) {
    /* 모바일: NavBar가 fixed로 분리되므로 단일 컬럼으로 전환 */
    flex-direction: column;
  }
`;

const Item = styled.div<ItemProps>`
  overflow: auto;
  flex: 1;
  min-width: 0;

  ${({ $notification }) =>
    $notification === "notification" &&
    `
    overflow: visible;
    position: absolute;
    top: 2rem;
    right: 7rem;
    width: 0;

    @media screen and (max-width: 768px) {
      top: 1rem;
      right: 3.5rem; /* 1rem(여백) + 2.5rem(버튼 너비) = 버튼 오른쪽 가장자리가 뷰포트 right에서 1rem */
    }
  `}
`;

const NotiBox = styled.div`
  position: absolute;
  right: 3rem;
  width: 45rem;

  @media screen and (max-width: 768px) {
    right: 1rem;
    width: 37.5rem;
  }
`;

const ToastBox = styled.div`
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

export { Layout, Item, NotiBox, ToastBox, Button };
