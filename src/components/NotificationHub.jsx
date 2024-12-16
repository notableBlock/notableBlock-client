import useNotificationStore from "../stores/useNotificationStore";

import * as S from "../styles/NotificationStyle";

function NotificationHub() {
  const { allNotification } = useNotificationStore();

  return (
    <S.NotiLayout>
      <S.NotiContainer>
        {allNotification.length ? (
          allNotification.map((notification) => {
            const { _id, receivedAt, message, link } = notification;

            return (
              <S.NotiMessage key={_id}>
                {receivedAt} 📩 {message}
                {link && <S.NotiLink to={link}> 👉 보러 가기</S.NotiLink>}
              </S.NotiMessage>
            );
          })
        ) : (
          <S.NotiMessage $notice="notice">현재 알림이 없습니다. 📩</S.NotiMessage>
        )}
      </S.NotiContainer>
    </S.NotiLayout>
  );
}

export default NotificationHub;
