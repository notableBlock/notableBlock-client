import { GoogleLogin } from "@react-oauth/google";

import Form from "../components/common/Form";

import useGoogleAuth from "../hooks/useGoogleAuth";

import * as S from "../styles/LoginPageStyle";

function LoginPage() {
  const { handleLoginSuccess, handleLoginError } = useGoogleAuth();

  return (
    <S.LoginPageLayout>
      <Form>
        <S.LoginPageItem>
          <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
        </S.LoginPageItem>
      </Form>
    </S.LoginPageLayout>
  );
}

export default LoginPage;
