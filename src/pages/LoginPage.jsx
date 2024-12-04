import Form from "../components/common/Form";

import useGoogleAuth from "../hooks/useGoogleAuth";

import googleLogo from "../assets/images/google-logo.png";

import * as S from "../styles/LoginPageStyle";

function LoginPage() {
  const { handleLogin } = useGoogleAuth();

  return (
    <S.LoginPageLayout>
      <Form>
        <S.LoginPageButton onClick={handleLogin}>
          <img src={googleLogo} alt="구글 로고" />
          <p>구글 로그인 하기</p>
        </S.LoginPageButton>
      </Form>
    </S.LoginPageLayout>
  );
}

export default LoginPage;
