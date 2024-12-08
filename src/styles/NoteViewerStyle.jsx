import styled from "styled-components";

const NoteViewerLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ theme }) => theme.color.noteColor};
  gap: 1rem;
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const NoteViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;

  img {
    width: 2rem;
  }
`;

const NoteViewerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3rem;
  border-top: 1px solid ${({ theme }) => theme.color.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
`;

const NoteViewerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const NoteViewerImage = styled.img.attrs(({ $src }) => ({
  src: $src,
  alt: "사용자 사진",
}))`
  width: 2rem;
  border-radius: 5rem;
`;

export { NoteViewerLayout, NoteViewerHeader, NoteViewerContent, NoteViewerFooter, NoteViewerImage };
