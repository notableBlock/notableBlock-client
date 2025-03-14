import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import useNotificationStore from "../stores/useNotificationStore";

import * as S from "../styles/NotificationStyle";

function Toast() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast, setToast, isToastVisible, setIsToastVisible } = useNotificationStore();

  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(() => {
        setIsToastVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isToastVisible, setIsToastVisible]);

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_URL}/notification/live`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const { fullDocument } = JSON.parse(event.data);

      if (fullDocument) {
        setToast([fullDocument]);
      }
      setIsToastVisible(true);
    };

    eventSource.onerror = () => {
      navigate("/error", {
        state: { from: location.pathname, message: "알림 수신에 실패했습니다." },
      });
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [setToast, setIsToastVisible, navigate, location]);

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
              <S.SlideOut onAnimationEnd={() => setToast([])}>
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
