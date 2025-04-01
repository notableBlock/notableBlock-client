import styled from "styled-components";
import { NavLink } from "react-router";

interface NoteViewerImageProps {
  $src: string;
}

const NoteViewerLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 65vw;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ theme }) => theme.color.noteColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const NoteViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  img {
    width: 1.5rem;
    height: 1.25rem;
  }
`;

const NoteViewerContent = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  max-height: 25rem;
  padding: 3rem;
  border-top: 1px solid ${({ theme }) => theme.color.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  word-break: keep-all;
`;

const NoteViewerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const NoteViewerUserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NoteLink = styled(NavLink)``;

const NoteViewerImage = styled.img.attrs<NoteViewerImageProps>(({ $src }) => ({
  src: $src,
  alt: "사용자 사진",
}))`
  width: 2rem;
  border-radius: 0.5rem;
`;

export {
  NoteViewerLayout,
  NoteViewerHeader,
  NoteViewerContent,
  NoteViewerFooter,
  NoteViewerUserBox,
  NoteViewerImage,
  NoteLink,
};
