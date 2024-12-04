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

const LoginPageButton = styled.button`
  display: flex;
  justify-content: center;
  width: 10rem;
  padding: 0.5rem;
  margin: auto;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.color.blackColor};
  border-radius: 0.25rem;
  box-shadow: 0 4px 12px ${({ theme }) => theme.color.shadowColor};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  cursor: pointer;

  img {
    width: 1rem;
  }
`;

export { LoginPageLayout, LoginPageButton };
