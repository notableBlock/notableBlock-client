import Form from "../components/common/Form";

import useGoogleAuth from "../hooks/useGoogleAuth";

import * as S from "../styles/pages/PageStyle";

function LoginPage() {
  const { handleLogin } = useGoogleAuth();

  return (
    <S.PageLayout>
      <Form title="Notable Block">
        <S.PageButton onClick={handleLogin}>
          <S.PageImage />
          구글 로그인 하기
        </S.PageButton>
      </Form>
    </S.PageLayout>
  );
}

export default LoginPage;
