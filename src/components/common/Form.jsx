import * as S from "../../styles/FormStyle";

function Form() {
  return (
    <S.FormLayout>
      <S.FormTitle>
        <img src="notable-block-logo.png" alt="notable-block 로고" />
        <h2>Notable Block</h2>
      </S.FormTitle>
      <S.FormButton>
        <img src="google-logo.png" alt="구글 로고" />
        <p>Sign in with Google</p>
      </S.FormButton>
      <p> 유효하지 않은 페이지 설명 state & 홈으로 돌아가기 버튼 </p>
    </S.FormLayout>
  );
}

export default Form;
