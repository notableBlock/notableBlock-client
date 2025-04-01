import { forwardRef } from "react";

import * as S from "styles/components/FormStyle";

import type { ForwardedRef } from "react";
import type { FormProps } from "types/components";

function Form(
  { children, title, isNotification = false }: FormProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <S.FormLayout ref={ref} $isNotification={isNotification}>
      {!isNotification && <S.FormImage />}
      <S.FormTitle>{title}</S.FormTitle>
      {children}
    </S.FormLayout>
  );
}
const FormRef = forwardRef(Form);

export default FormRef;
