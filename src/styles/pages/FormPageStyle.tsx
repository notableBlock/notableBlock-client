import styled from "styled-components";

import googleLogo from "assets/images/google-logo.png";
import notableBlockLogo from "assets/images/notable-block-logo.png";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    ${({ theme }) => theme.color.mainColor},
    ${({ theme }) => theme.color.subColor}
  );
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  min-width: 13rem;
  width: fit-content;
  padding: 0.5rem 1.5rem;
  margin: auto;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.color.blackColor};
  border-radius: 0.25rem;
  box-shadow: 0 4px 12px ${({ theme }) => theme.color.shadowColor};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  cursor: pointer;
`;

const Message = styled.p`
  word-break: keep-all;
  padding: 1rem;
`;

const GoogleIcon = styled.img.attrs({
  src: googleLogo,
  alt: "구글 로고",
})`
  width: 1rem;
`;

const NotableBlockIcon = styled.img.attrs({
  src: notableBlockLogo,
  alt: "Notable Block 로고",
})`
  width: 1rem;
  height: 1rem;
  object-fit: contain;
  transform: scale(1.5);
`;

const GuestButton = styled.button`
  display: flex;
  justify-content: center;
  width: 13rem;
  padding: 0.5rem;
  margin: 0 auto;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.color.blackColor};
  border-radius: 0.25rem;
  box-shadow: 0 4px 12px ${({ theme }) => theme.color.shadowColor};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  cursor: pointer;
`;

export { Layout, Button, Message, GoogleIcon, NotableBlockIcon, GuestButton };
