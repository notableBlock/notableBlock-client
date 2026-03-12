import styled from "styled-components";
import { NavLink } from "react-router";

import notableBlockLogo from "assets/images/notable-block-logo.png";

interface NavBarItemProps {
  $type?: "title" | "option" | "logout";
}

interface NavBarImageProps {
  $picture?: string;
}

interface NavLinkProps {
  $isActive: boolean;
}

interface NavBarLayoutProps {
  $isMenuOpen: boolean;
}

const Layout = styled.nav<NavBarLayoutProps>`
  display: flex;
  flex: 0 0 10.5rem;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 3rem;
  background: linear-gradient(
    ${({ theme }) => theme.color.mainColor},
    ${({ theme }) => theme.color.subColor}
  );
  color: ${({ theme }) => theme.color.whiteColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};

  @media screen and (max-width: 768px) {
    /* 모바일: 레이아웃 흐름에서 분리하여 슬라이드 패널로 전환 */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 16rem;
    height: 100vh;
    flex: none;

    /* GPU 가속 슬라이드 애니메이션 */
    transform: ${({ $isMenuOpen }) =>
      $isMenuOpen ? "translateX(0)" : "translateX(-100%)"};
    transition:
      transform 0.3s ease,
      visibility 0s ${({ $isMenuOpen }) => ($isMenuOpen ? "0s" : "0.3s")};

    /* 닫힌 상태에서 Tab 포커스 방지 */
    visibility: ${({ $isMenuOpen }) => ($isMenuOpen ? "visible" : "hidden")};
  }
`;

const Item = styled.div<NavBarItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  font-weight: ${({ $type, theme }) =>
    $type === "title" ? theme.fontWeight.title : theme.fontWeight.normal};
  cursor: ${({ $type }) => ($type === "logout" ? "pointer" : "defaults")};
`;

const Icon = styled.img.attrs<NavBarImageProps>(({ $picture }) => ({
  src: $picture && $picture.startsWith("http") ? $picture : notableBlockLogo,
  alt: $picture && $picture.startsWith("http") ? "사용자 사진" : "notable-block 로고",
}))`
  width: 3rem;
  border-radius: 1rem;
`;

const Link = styled(NavLink)<NavLinkProps>`
  padding: 1rem;

  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.color.activeColor : "transparent"};
  font-weight: ${({ $isActive, theme }) =>
    $isActive ? theme.fontWeight.bold : theme.fontWeight.normal};

  &:hover {
    background-color: ${({ theme }) => theme.color.activeColor};
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  color: ${({ theme }) => theme.color.whiteColor};
`;

/* 모바일 햄버거 토글 버튼 — 데스크톱에서는 숨김 */
const ToggleButton = styled.button`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1100;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.color.mainColor};
    color: ${({ theme }) => theme.color.whiteColor};
    cursor: pointer;
    box-shadow: 0 0.125rem 0.5rem ${({ theme }) => theme.color.shadowColor};
  }
`;

/* 모바일 오버레이 — 메뉴 열렸을 때 배경 반투명 처리 */
const Overlay = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    width: 100vw;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.shadowColor};
    cursor: pointer;
  }
`;

export { Layout, Item, Icon, Link, Section, ToggleButton, Overlay };
