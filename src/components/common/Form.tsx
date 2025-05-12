import { forwardRef } from "react";

import * as S from "styles/components/FormStyle";

import type { ForwardedRef } from "react";
import type { FormProps } from "types/components";

function Form(
  { children, title, isNotification = false }: FormProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Layout ref={ref} $isNotification={isNotification}>
      {!isNotification && <S.Icon />}
      <S.Heading>{title}</S.Heading>
      {children}
    </S.Layout>
  );
}
const FormRef = forwardRef(Form);

export default FormRef;
