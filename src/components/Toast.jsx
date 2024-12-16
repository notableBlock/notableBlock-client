import { useEffect } from "react";

import { useNavigate } from "react-router";

import useNotificationStore from "../stores/useNotificationStore";

import * as S from "../styles/NotificationStyle";

function Toast() {
  const navigate = useNavigate();
  const { toast, setToast, setAddNotification, isToastVisible, SetIsToastVisible } =
    useNotificationStore();

  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(() => {
        SetIsToastVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isToastVisible, SetIsToastVisible]);

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_URL}/notification`);

    eventSource.onmessage = (event) => {
      const { fullDocument } = JSON.parse(event.data);
      setToast([fullDocument]);
      setAddNotification(fullDocument);
      SetIsToastVisible(true);
    };

    eventSource.onerror = () => {
      navigate("/error", { state: { message: "알림 수신에 실패했습니다." } });
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [setToast, SetIsToastVisible, setAddNotification, navigate]);

  return (
    <>
      {toast.map((notification) => {
        const { _id, message, link } = notification;

        return (
          <S.NotiLayout key={_id}>
            {isToastVisible ? (
              <S.SlideIn>
                <S.NotiMessage>
                  {message}
                  {link && <S.NotiLink to={link}> 👉 보러가기</S.NotiLink>}
                </S.NotiMessage>
              </S.SlideIn>
            ) : (
              <S.SlideOut>
                <S.NotiMessage>{message}</S.NotiMessage>
              </S.SlideOut>
            )}
          </S.NotiLayout>
        );
      })}
    </>
  );
}

export default Toast;
