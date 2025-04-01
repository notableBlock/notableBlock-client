import styled from "styled-components";

import loadingIcon from "assets/images/loading-icon.gif";

const LoadingLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const LoadingImage = styled.img.attrs({
  src: loadingIcon,
  alt: "로딩 이미지",
})`
  width: 15rem;
  height: 15rem;
`;

export { LoadingLayout, LoadingImage };
