import { NavLink } from "react-router";

import notableBlockLogo from "../assets/images/notable-block-logo.png";

import styled from "styled-components";

const NavBarLayout = styled.nav`
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

const NavBarItem = styled.div`
  padding: 1rem;
  font-weight: ${({ $type, theme }) =>
    $type === "title" ? theme.fontWeight.title : theme.fontWeight.normal};
  cursor: ${({ $type }) => ($type === "logout" ? "pointer" : "defaults")};
`;

const NavBarImage = styled.img.attrs(({ $picture }) => ({
  src: $picture || notableBlockLogo,
  alt: $picture ? "사용자 사진" : "notable-block 로고",
}))`
  width: 2.5rem;
  border-radius: 5rem;
`;

const NavBarLink = styled(NavLink)`
  padding: 1rem;

  &.active {
    background-color: ${({ theme }) => theme.color.activeColor};
    font-weight: bold;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.activeColor};
  }
`;

const NavBarUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  color: ${({ theme }) => theme.color.whiteColor};
`;

export { NavBarLayout, NavBarItem, NavBarImage, NavBarLink, NavBarUserContainer };
