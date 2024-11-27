import styled from "styled-components";

const LoginPageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    ${({ theme }) => theme.color.mainColor},
    ${({ theme }) => theme.color.subColor}
  );
`;

const LoginPageItem = styled.div`
  margin: auto;
`;

export { LoginPageLayout, LoginPageItem };
