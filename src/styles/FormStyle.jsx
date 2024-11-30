import styled from "styled-components";

const FormLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 18rem;
  height: 22rem;
  margin: auto;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.color.whiteColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const FormTitle = styled.div`
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

const FormButton = styled.button`
  display: flex;
  justify-content: center;
  width: 80%;
  padding: 0.35rem;
  margin: auto;
  border: 1px solid ${({ theme }) => theme.color.blackColor};
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
  gap: 0.5rem;

  img {
    width: 1rem;
  }
`;

export { FormLayout, FormTitle, FormButton };
