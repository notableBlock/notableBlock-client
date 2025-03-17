import styled from "styled-components";

import markdownIcon from "../../assets/images/markdown-icon.png";
import tarIcon from "../../assets/images/tar-icon.png";

const UploadDropZoneLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 2.5rem;
  border: 2px dashed ${({ theme }) => theme.color.borderColor};
  border-radius: 0.75rem;
  text-align: center;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  h3 span {
    color: ${({ theme }) => theme.color.mainColor};
    cursor: pointer;
  }

  h3 span:hover {
    text-decoration: underline;
  }

  p span {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  &:hover p {
    color: ${({ theme }) => theme.color.mainColor};
  }

  ${({ $isDragging, theme }) =>
    $isDragging &&
    `
    border-color: ${theme.color.mainColor};
    background-color: ${theme.color.dropColor};
    color: ${theme.color.mainColor};
  `}

  @media screen and (max-width : 768px) {
    width: 15rem;
    height: 30rem;
  }
`;

const UploadItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 3rem;
  gap: 1rem;
`;

const UploadImage = styled.img.attrs(({ $isFileTypes }) => ({
  src: $isFileTypes === "마크다운·이미지" ? markdownIcon : tarIcon,
  alt: "파일 아이콘 이미지",
}))`
  width: 5rem;
  height: 5rem;
  margin-bottom: 0.75rem;
`;

export { UploadDropZoneLayout, UploadItem, UploadImage };
