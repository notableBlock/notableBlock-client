import Form from "components/common/Form";

import useGoogleAuth from "hooks/useGoogleAuth";

import * as S from "styles/pages/FormPageStyle";

function LoginPage() {
  const { handleLogin } = useGoogleAuth();

  return (
    <S.Layout>
      <Form title="Notable Block">
        <S.Button onClick={handleLogin}>
          <S.GoogleIcon />
          구글 로그인 하기
        </S.Button>
      </Form>
    </S.Layout>
  );
}

export default LoginPage;
