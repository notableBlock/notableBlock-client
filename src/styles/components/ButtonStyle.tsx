import styled from "styled-components";

interface ButtonLayoutProps {
  $isKebabImage: boolean;
}

interface ButtonImageProps {
  $image: string;
}

const Layout = styled.button<ButtonLayoutProps>`
  padding: 0.5rem;
  border-radius: 10rem;
  background-color: ${({ theme, $isKebabImage }) =>
    $isKebabImage ? theme.color.noteColor : theme.color.mainColor};
  box-shadow: ${({ theme, $isKebabImage }) =>
    $isKebabImage ? "none" : `0 0.25rem 0.75rem ${theme.color.shadowColor}`};
  color: ${({ theme }) => theme.color.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

const NotiCount = styled.p`
  position: absolute;
  left: 2rem;
  width: 1.5rem;
  border-radius: 5rem;
  background-color: ${({ theme }) => theme.color.redColor};
`;

const Icon = styled.img.attrs<ButtonImageProps>(({ $image }) => ({
  src: $image,
  alt: "버튼 아이콘",
}))`
  width: 3rem;
`;

export { Layout, Icon, NotiCount };
