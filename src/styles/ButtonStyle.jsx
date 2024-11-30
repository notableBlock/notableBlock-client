import styled from "styled-components";

const ButtonLayout = styled.button`
  height: 2.8rem;
  border-radius: 10rem;
  background-color: ${({ theme }) => theme.color.mainColor};
  color: ${({ theme }) => theme.color.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

export { ButtonLayout };
