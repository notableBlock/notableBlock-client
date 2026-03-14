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

  /* 데스크톱: lucide SVG 아이콘을 기존 PNG(3rem)와 동일한 크기로 유지 */
  svg {
    width: 3rem;
    height: 3rem;
  }

  /* 모바일: 알림 버튼을 햄버거 버튼과 동일한 크기로 통일 */
  @media screen and (max-width: 768px) {
    ${({ $isKebabImage }) =>
      !$isKebabImage &&
      `
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;

      img {
        width: 1.5rem;
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    `}
  }
`;

const NotiCount = styled.p`
  position: absolute;
  left: 2rem;
  width: 1.5rem;
  border-radius: 5rem;
  background-color: ${({ theme }) => theme.color.redColor};

  /* 모바일: 축소된 버튼에 맞게 뱃지 위치·크기 조정 */
  @media screen and (max-width: 768px) {
    left: 1.25rem;
    width: 1.25rem;
    font-size: 0.7rem;
  }
`;

const Icon = styled.img.attrs<ButtonImageProps>(({ $image }) => ({
  src: $image,
  alt: "버튼 아이콘",
}))`
  width: 3rem;
`;

export { Layout, Icon, NotiCount };
