import useNotificationStore from "../../stores/useNotificationStore";

import * as S from "../../styles/components/ButtonStyle";

function Button({ image, onClick }) {
  const { allNotification } = useNotificationStore();

  const isNotificationImage = image.includes("notification");

  return (
    <S.ButtonLayout onClick={onClick}>
      {isNotificationImage && <S.NotiCount>{allNotification.length}</S.NotiCount>}
      <S.ButtonImage $image={image} />
    </S.ButtonLayout>
  );
}

export default Button;
