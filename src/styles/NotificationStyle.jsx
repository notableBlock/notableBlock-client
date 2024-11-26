import styled from "styled-components";

const NotiLayout = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  width: 25rem;
  height: 20rem;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const NotiMessage = styled.div`
  padding: 1rem;
  border-radius: 0.35rem;
  background: ${({ theme }) => theme.color.messageColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
  margin: 1rem;
`;
export { NotiLayout, NotiMessage };
