import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import useNotificationStore from "stores/useNotificationStore";

import handRightIcon from "assets/images/hand-right-icon.png";

import * as S from "styles/components/NotificationStyle";

import type { Notification } from "types/models";

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
      const { fullDocument } = JSON.parse(event.data) as { fullDocument: Notification };

      if (fullDocument) {
        setToast([fullDocument]);
      }
      setIsToastVisible(true);
    };

    eventSource.onerror = () => {
      navigate("/error", {
        state: { from: location.pathname, message: "알림 수신에 실패했어요." },
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
                  {link && (
                    <S.NotiLink to={link}>
                      <S.Image $src={handRightIcon} alt="손가락 아이콘" />
                      보러가기
                    </S.NotiLink>
                  )}
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
