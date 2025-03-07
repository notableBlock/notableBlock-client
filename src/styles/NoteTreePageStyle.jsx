import styled from "styled-components";

const NoteTreePageLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 80vw;
  height: 100vh;
`;

const NoteTreePageList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 3rem;
  left: 15rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.shadowColor};
  border-radius: 1rem;
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};

  li {
    margin: 0.5rem;
    text-align: left;
  }

  li span {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.mainColor};
  }
`;

const NoteTreePageContainer = styled.div`
  margin: 0.5rem;
`;

export { NoteTreePageLayout, NoteTreePageList, NoteTreePageContainer };
