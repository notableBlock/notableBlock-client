import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router";

interface NotiMessageProps {
  $isReadAllMessage?: boolean;
}

interface NotiImageProps {
  $src: string;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-x: hidden;
  scrollbar-gutter: stable both-edges;
  color: ${({ theme }) => theme.color.blackColor};
`;

const MessageBox = styled.div<NotiMessageProps>`
  display: flex;
  justify-content: ${({ $isReadAllMessage }) => ($isReadAllMessage ? "center" : "space-between")};
  align-items: center;
  height: 3rem;
  padding: 0.5rem;
  margin: 0.75rem;
  border-radius: 0.35rem;
  background-color: ${({ theme }) => theme.color.whiteColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const LinkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Link = styled(NavLink)`
  border-radius: 0.35rem;
  background-color: ${({ theme }) => theme.color.whiteColor};

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const Button = styled.button`
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.color.mainColor};
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const SlideIn = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.mainColor};
  border-radius: 1rem;
  animation: ${slideInRight} 0.5s ease forwards;
`;

const SlideOut = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.mainColor};
  border-radius: 1rem;
  animation: ${slideOutRight} 0.5s ease forwards;
`;

const Icon = styled.img.attrs<NotiImageProps>(({ $src }) => ({
  src: $src,
}))`
  width: 1.75rem;
  vertical-align: middle;
  margin: 0 0.5rem 0 1rem;
`;

export { Layout, MessageBox, LinkBox, SlideIn, SlideOut, Link, Button, Icon };
