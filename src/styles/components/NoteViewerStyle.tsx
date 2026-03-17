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
  background-color: ${({ theme }) => theme.color.cardBgColor};
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0.25rem 0.625rem 0.75rem;
  color: ${({ theme }) => theme.color.metaTextColor};
  font-size: ${({ theme }) => theme.fontSize.medium};

  @media screen and (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  height: 12rem;
  max-height: 12rem;
  padding: 1.5rem 2rem;
  color: ${({ theme }) => theme.color.contentTextColor};
  word-break: keep-all;
  text-align: left;
  line-height: 1.6;

  h1 {
    font-size: 1.375rem;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }

  h2 {
    font-size: 1.125rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    margin-bottom: 0.375rem;
    line-height: 1.4;
  }

  h3 {
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }

  p {
    font-size: 0.9375rem;
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    line-height: 1.7;
    color: ${({ theme }) => theme.color.metaTextColor};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3rem;
    background: linear-gradient(transparent, ${({ theme }) => theme.color.cardBgColor});
    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    height: 8rem;
    max-height: 8rem;
    padding: 1rem 1.25rem;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.color.metaTextColor};
  font-size: ${({ theme }) => theme.fontSize.medium};
  border-top: 1px solid ${({ theme }) => theme.color.borderColor};

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.25rem 0.75rem;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  @media screen and (max-width: 768px) {
    font-size: 0.875rem;
    min-width: 40%;
  }
`;

const Link = styled(NavLink)``;

const Icon = styled.img.attrs<NoteViewerImageProps>(({ $src }) => ({
  src: $src,
}))`
  width: 1.25rem;
  border-radius: 0.5rem;

  @media screen and (max-width: 768px) {
    width: 1.125rem;
  }
`;

export { Layout, Header, Content, Footer, Section, Icon, Link };
