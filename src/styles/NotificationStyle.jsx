import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router";

const NotiLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
  color: ${({ theme }) => theme.color.blackColor};
`;

const NotiContainer = styled.div`
  width: 42.5rem;
`;

const NotiMessage = styled.div`
  display: flex;
  justify-content: ${({ $notice }) => ($notice === "notice" ? "center" : "space-between")};
  align-items: center;
  padding: 0.5rem;
  margin: 1rem;
  height: 3rem;
  border-radius: 0.35rem;
  background-color: ${({ theme }) => theme.color.whiteColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const NotiLink = styled(NavLink)`
  padding: 0.5rem;
  border-radius: 0.35rem;
  background-color: ${({ theme }) => theme.color.whiteColor};
`;

const NotiButton = styled.button`
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

export { NotiLayout, NotiMessage, SlideIn, SlideOut, NotiLink, NotiButton, NotiContainer };
