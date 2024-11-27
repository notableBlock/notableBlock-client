import * as S from "../../styles/FormStyle";

function Form({ children }) {
  return (
    <S.FormLayout>
      <S.FormTitle>
        <img src="notable-block-logo.png" alt="notable-block 로고" />
        <h2>Notable Block</h2>
      </S.FormTitle>
      {children}
    </S.FormLayout>
  );
}

export default Form;
