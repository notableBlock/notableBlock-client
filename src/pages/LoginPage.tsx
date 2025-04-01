import Form from "components/common/Form";

import useGoogleAuth from "hooks/useGoogleAuth";

import * as S from "styles/pages/FormPageStyle";

function LoginPage() {
  const { handleLogin } = useGoogleAuth();

  return (
    <S.FormPageLayout>
      <Form title="Notable Block">
        <S.FormPageButton onClick={handleLogin}>
          <S.FormPageImage />
          구글 로그인 하기
        </S.FormPageButton>
      </Form>
    </S.FormPageLayout>
  );
}

export default LoginPage;
