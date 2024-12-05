import * as S from "../../styles/FormStyle";

function Form({ children }) {
  return (
    <S.FormLayout>
      <S.FormTitle>
        <S.FormImage />
        <h2>Notable Block</h2>
      </S.FormTitle>
      {children}
    </S.FormLayout>
  );
}

export default Form;
