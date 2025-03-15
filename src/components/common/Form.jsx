import { forwardRef } from "react";

import * as S from "../../styles/components/FormStyle";

function Form({ children, title, notification }, ref) {
  return (
    <S.FormLayout ref={ref} $notification={notification}>
      {!notification && <S.FormImage />}
      <S.FormTitle>{title}</S.FormTitle>
      {children}
    </S.FormLayout>
  );
}
const FormRef = forwardRef(Form);

export default FormRef;
