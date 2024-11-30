import { NavLink } from "react-router";

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

  img {
    width: 3rem;
  }
`;

const NavBarItem = styled.div`
  padding: 1rem;
  font-weight: ${({ theme }) => theme.fontWeight.normal};

  ${({ type, theme }) =>
    type === "title" &&
    `
    font-weight: ${theme.fontWeight.bold};
  `}
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

export { NavBarLayout, NavBarItem, NavBarLink, NavBarUserContainer };
