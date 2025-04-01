import useNotificationStore from "stores/useNotificationStore";

import * as S from "styles/components/ButtonStyle";

import type { ButtonProps } from "types/components";

function Button({ image, onClick }: ButtonProps) {
  const { allNotification } = useNotificationStore();

  const isNotificationImage = image.includes("notification");
  const isKebabImage = image.includes("kebab");

  return (
    <S.ButtonLayout onClick={onClick} $isKebabImage={isKebabImage}>
      {isNotificationImage && <S.NotiCount>{allNotification.length}</S.NotiCount>}
      <S.ButtonImage $image={image} />
    </S.ButtonLayout>
  );
}

export default Button;
