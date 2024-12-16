import Form from "../components/common/Form";

import useGoogleAuth from "../hooks/useGoogleAuth";

import * as S from "../styles/LoginPageStyle";

function LoginPage() {
  const { handleLogin } = useGoogleAuth();

  return (
    <S.LoginPageLayout>
      <Form title="Notable Block">
        <S.LoginPageButton onClick={handleLogin}>
          <S.LoginPageImage />
          <p>구글 로그인 하기</p>
        </S.LoginPageButton>
      </Form>
    </S.LoginPageLayout>
  );
}

export default LoginPage;
