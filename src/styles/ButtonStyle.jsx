import styled from "styled-components";

const ButtonLayout = styled.button`
  padding: 0.5rem;
  border-radius: 10rem;
  background-color: ${({ theme }) => theme.color.mainColor};
  color: ${({ theme }) => theme.color.whiteColor};
  font-size: ${({ theme }) => theme.fontSize.large};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const NotiCount = styled.p`
  position: absolute;
  left: 2rem;
  width: 1.5rem;
  border-radius: 5rem;
  background-color: ${({ theme }) => theme.color.redColor};
`;

const ButtonImage = styled.img.attrs(({ $image }) => ({
  src: $image,
  alt: "버튼 아이콘",
}))`
  width: 3rem;
`;

export { ButtonLayout, ButtonImage, NotiCount };
