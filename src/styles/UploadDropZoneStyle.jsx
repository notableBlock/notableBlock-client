import styled from "styled-components";

import uploadIcon from "../assets/images/upload-icon.png";

const UploadDropZoneLayout = styled.div`
  width: 100%;
  padding: 3rem;
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

  ${({ $isDragging, theme }) =>
    $isDragging &&
    `
    border-color: ${theme.color.mainColor};
    background-color: ${theme.color.dropColor};
    color: ${theme.color.mainColor};
  `}
`;

const UploadImage = styled.img.attrs({
  src: uploadIcon,
  alt: "업로드 이미지",
})`
  width: 5rem;
  height: 5rem;
  margin-bottom: 0.75rem;
`;

export { UploadDropZoneLayout, UploadImage };
