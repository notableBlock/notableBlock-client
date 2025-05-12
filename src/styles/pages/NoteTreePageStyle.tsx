import styled from "styled-components";

interface NoteTreeImageProps {
  $src: string;
}

const NoteTreePageLayout = styled.div`
  display: flex;
  height: 100vh;
`;

const NoteTreePageList = styled.ul`
  display: flex;
  position: absolute;
  top: 3rem;
  left: 15rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};

  li {
    margin: 0.5rem;
    text-align: left;
    align-items: center;
  }

  li span {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.mainColor};
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NoteTreePageContainer = styled.div`
  padding: 0.5rem;
  min-width: 15rem;
  border-right: 1px solid ${({ theme }) => theme.color.shadowColor};

  h3 {
    padding-bottom: 0.5rem;
  }

  &:last-child {
    border-right: none;
  }

  @media screen and (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.shadowColor};

    &:last-child {
      border-bottom: none;
    }
  }
`;

const NoteTreePageInfoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    padding: 0;
  }
`;

const NoteTreePageImage = styled.img.attrs<NoteTreeImageProps>(({ $src }) => ({
  src: $src,
}))`
  width: 1.75rem;
  vertical-align: middle;
  border-radius: 0.5rem;
`;

export {
  NoteTreePageLayout,
  NoteTreePageList,
  NoteTreePageContainer,
  NoteTreePageInfoHeader,
  NoteTreePageImage,
};
