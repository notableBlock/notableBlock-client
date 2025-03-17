import useControlNotifications from "../hooks/useControlNotifications";

import * as S from "../styles/components/NotificationStyle";

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
                {link && <S.NotiLink to={link}> 👉 보러 가기</S.NotiLink>}
                <S.NotiButton onClick={() => handleDeleteNotification(_id)}>X</S.NotiButton>
              </S.NotiMessageClickBox>
            </S.NotiMessage>
          );
        })
      ) : (
        <S.NotiMessage $notice="notice">모든 알림을 확인했어요.</S.NotiMessage>
      )}
    </S.NotiLayout>
  );
}

export default NotificationHub;
