import styled from "styled-components";
import { NavLink } from "react-router";

interface NoteViewerImageProps {
  $src: string;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ theme }) => theme.color.noteColor};
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.25rem 0.5rem 0.75rem;

  img {
    padding: 0rem;
    width: 1.75rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  height: 15rem;
  max-height: 15rem;
  padding: 3rem;
  border-top: 1px solid ${({ theme }) => theme.color.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  word-break: keep-all;
  text-align: left;
  line-height: 1.6;

  @media screen and (max-width: 768px) {
    padding: 1.25rem;
    height: 10rem;
    max-height: 10rem;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Link = styled(NavLink)``;

const Icon = styled.img.attrs<NoteViewerImageProps>(({ $src }) => ({
  src: $src,
}))`
  width: 1.75rem;
  border-radius: 0.5rem;

  @media screen and (max-width: 768px) {
    width: 1.5rem;
  }
`;

export { Layout, Header, Content, Footer, Section, Icon, Link };
