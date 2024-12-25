import { useNavigate } from "react-router";

import useNotificationStore from "../stores/useNotificationStore";

import deleteNotification from "../services/notification";

import * as S from "../styles/NotificationStyle";

function NotificationHub() {
  const navigate = useNavigate();
  const { allNotification, setRemoveNotification } = useNotificationStore();

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      setRemoveNotification(notificationId);
    } catch (err) {
      navigate("/error", { state: { message: "알림을 삭제하는데 실패했습니다." } });
    }
  };

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
