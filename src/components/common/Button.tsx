import useNotificationStore from "stores/useNotificationStore";

import * as S from "styles/components/ButtonStyle";

import type { ButtonProps } from "types/components";

function Button({ image, onClick, type }: ButtonProps) {
  const { allNotification } = useNotificationStore();

  const isNotificationImage = type === "notification";
  const isKebabImage = type === "kebab";

  return (
    <S.ButtonLayout onClick={onClick} $isKebabImage={isKebabImage}>
      {isNotificationImage && <S.NotiCount>{allNotification.length}</S.NotiCount>}
      <S.ButtonImage $image={image} />
    </S.ButtonLayout>
  );
}

export default Button;
