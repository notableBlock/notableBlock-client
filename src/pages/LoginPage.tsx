import Form from "components/common/Form";

import useGoogleAuth from "hooks/useGoogleAuth";

import * as S from "styles/pages/FormPageStyle";

function LoginPage() {
  const { handleLogin, handleGuestLogin } = useGoogleAuth();

  return (
    <S.Layout>
      <Form title="Notable Block">
        <S.Button onClick={handleLogin}>
          <S.GoogleIcon />
          구글 로그인 하기
        </S.Button>
        <S.GuestButton onClick={handleGuestLogin}>게스트로 시작하기</S.GuestButton>
      </Form>
    </S.Layout>
  );
}

export default LoginPage;
