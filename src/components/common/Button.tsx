import useNotificationStore from "stores/useNotificationStore";

import * as S from "styles/components/ButtonStyle";

import type { ButtonProps } from "types/components";

function Button({ image, onClick, type }: ButtonProps) {
  const { allNotification } = useNotificationStore();

  const isNotificationImage = type === "notification";
  const isKebabImage = type === "kebab";

  return (
    <S.Layout onClick={onClick} $isKebabImage={isKebabImage}>
      {isNotificationImage && <S.NotiCount>{allNotification.length}</S.NotiCount>}
      <S.Icon $image={image} />
    </S.Layout>
  );
}

export default Button;
