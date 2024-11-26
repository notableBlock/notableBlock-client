import styled from "styled-components";

const OptionLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 5rem;
  background: ${({ theme }) => theme.color.whiteColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const OptionItem = styled.button`
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

export { OptionLayout, OptionItem };
