import styled from "styled-components";

const LoginFormLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 18rem;
  height: 22rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.whiteColor};
  box-shadow: 0 4px 12px ${({ theme }) => theme.color.shadowColor};
`;

const LoginFormTitle = styled.div`
  padding: 1.5rem;

  h2 {
    padding-top: 3rem;
    font-size: ${({ theme }) => theme.fontSize.xxxLarge};
    font-weight: ${({ theme }) => theme.fontWeight.title};
  }

  img {
    width: 5.5rem;
  }
`;

const LoginFormButton = styled.button`
  display: flex;
  justify-content: center;
  width: 80%;
  padding: 0.35rem;
  margin: auto;
  border: 1px solid ${({ theme }) => theme.color.blackColor};
  border-radius: 0.25rem;
  box-shadow: 0 4px 12px ${({ theme }) => theme.color.shadowColor};
  gap: 0.5rem;

  img {
    width: 1rem;
  }
`;

export { LoginFormLayout, LoginFormTitle, LoginFormButton };
