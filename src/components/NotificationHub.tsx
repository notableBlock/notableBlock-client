import useControlNotifications from "hooks/useControlNotifications";

import handRightIcon from "assets/images/hand-right-icon.png";

import * as S from "styles/components/NotificationStyle";

function NotificationHub() {
  const { allNotification, handleDeleteNotification } = useControlNotifications();

  return (
    <S.NotiLayout>
      {allNotification.length ? (
        allNotification.map((notification) => {
          const { _id, receivedAt, message, link } = notification;

          return (
            <S.NotiMessage key={_id}>
              {receivedAt} - {message}
              <S.NotiMessageClickBox>
                {link && (
                  <S.NotiLink to={link}>
                    <S.Image $src={handRightIcon} alt="손가락 아이콘" />
                    보러 가기
                  </S.NotiLink>
                )}
                <S.NotiButton onClick={() => handleDeleteNotification(_id)}>X</S.NotiButton>
              </S.NotiMessageClickBox>
            </S.NotiMessage>
          );
        })
      ) : (
        <S.NotiMessage $isReadAllMessage={true}>모든 알림을 확인했어요.</S.NotiMessage>
      )}
    </S.NotiLayout>
  );
}

export default NotificationHub;
