import useControlNotifications from "../hooks/useControlNotifications";

import * as S from "../styles/components/NotificationStyle";

function NotificationHub() {
  const { allNotification, handleDeleteNotification } = useControlNotifications();

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
                <S.NotiButton onClick={() => handleDeleteNotification(_id)}>X</S.NotiButton>
              </S.NotiMessage>
            );
          })
        ) : (
          <S.NotiMessage $notice="notice">모든 알림을 확인하셨습니다. 📩</S.NotiMessage>
        )}
      </S.NotiContainer>
    </S.NotiLayout>
  );
}

export default NotificationHub;
