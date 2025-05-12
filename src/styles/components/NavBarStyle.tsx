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

const Layout = styled.nav`
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
  src: $picture || notableBlockLogo,
  alt: $picture ? "사용자 사진" : "notable-block 로고",
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

export { Layout, Item, Icon, Link, Section };
