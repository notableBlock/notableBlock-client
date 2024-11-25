import styled from "styled-components";

const NavBarLayout = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 10rem;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: linear-gradient(
    ${({ theme }) => theme.color.mainColor},
    ${({ theme }) => theme.color.subColor}
  );
  color: ${({ theme }) => theme.color.whiteColor};
`;

const NavBarItem = styled.div`
  padding: 1rem;
`;

const NavBarUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding: 1rem;
  color: ${({ theme }) => theme.color.whiteColor};
`;

export { NavBarLayout, NavBarItem, NavBarUserContainer };
