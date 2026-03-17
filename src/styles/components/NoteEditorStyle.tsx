import styled from "styled-components";

const Layout = styled.div`
  overflow: auto;
  width: 90%;
  height: 90%;
  padding: 1.5rem 2rem 1.5rem 1rem;
  margin: auto;
  background-color: ${({ theme }) => theme.color.cardBgColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 0.75rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.06);

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 1rem 1.25rem 1rem 0.5rem;
    padding-top: 2.5rem;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
`;

export { Layout };
