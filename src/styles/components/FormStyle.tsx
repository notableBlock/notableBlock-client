import styled from "styled-components";

import notableBlockLogo from "assets/images/notable-block-logo.png";

interface FormLayoutProps {
  $isNotification: boolean;
}

const Layout = styled.div<FormLayoutProps>`
  display: flex;
  flex-direction: column;
  overflow: auto;
  justify-content: ${({ $isNotification }) => ($isNotification ? "flex-start" : "center")};
  width: ${({ $isNotification }) => ($isNotification ? "100%" : "17.5rem")};
  height: ${({ $isNotification }) => ($isNotification ? "auto" : "22.5rem")};
  max-height: 25rem;
  margin: auto;
  border-radius: 0.5rem;
  background-color: ${({ $isNotification, theme }) =>
    $isNotification ? theme.color.mainColor : theme.color.whiteColor};
  color: ${({ $isNotification, theme }) =>
    $isNotification ? theme.color.whiteColor : theme.color.blackColor};
  box-shadow: 0 0.25rem 0.75rem ${({ theme }) => theme.color.shadowColor};
`;

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xxxLarge};
  font-weight: ${({ theme }) => theme.fontWeight.title};
  padding-top: 1rem;
`;

const Icon = styled.img.attrs({
  src: notableBlockLogo,
  alt: "notable-block 로고",
})`
  margin: auto;
  width: 5rem;
`;

export { Layout, Heading, Icon };
