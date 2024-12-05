import styled from "styled-components";

import loadingIcon from "../assets/images/loading-icon.gif";

const LoadingLayout = styled.div`
  display: flex;
  width: 90vw;
  height: 100vh;
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
