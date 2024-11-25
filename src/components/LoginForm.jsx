import * as S from "../styles/LoginFormStyle";

function LoginForm() {
  return (
    <S.LoginFormLayout>
      <S.LoginFormTitle>
        <img src="notable-block-logo.png" alt="notable-block 로고" />
        <h2>Notable Block</h2>
      </S.LoginFormTitle>
      <S.LoginFormButton>
        <img src="google-logo.png" alt="구글 로고" />
        <p>Sign in with Google</p>
      </S.LoginFormButton>
    </S.LoginFormLayout>
  );
}

export default LoginForm;
