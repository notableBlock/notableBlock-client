import { useEffect } from "react";

import useNotificationStore from "stores/useNotificationStore";

import handRightIcon from "assets/images/hand-right-icon.png";

import * as S from "styles/components/NotificationStyle";

import type { Notification } from "types/models";

function Toast() {
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
    const MAX_RETRY = 3;
    let retryCount = 0;

    const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_URL}/notification/live`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const { fullDocument } = JSON.parse(event.data) as { fullDocument: Notification };

      if (fullDocument) {
        setToast([fullDocument]);
      }
      setIsToastVisible(true);
      retryCount = 0;
    };

    eventSource.onerror = () => {
      retryCount += 1;

      if (retryCount >= MAX_RETRY) {
        console.warn(`SSE 연결이 ${MAX_RETRY}회 실패하여 알림 수신을 중단합니다.`);
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
    };
  }, [setToast, setIsToastVisible]);

  return (
    <>
      {toast.map((notification) => {
        const { _id, message, link } = notification;

        return (
          <S.Layout key={_id}>
            {isToastVisible ? (
              <S.SlideIn>
                <S.MessageBox>
                  {message}
                  {link && (
                    <S.Link to={link}>
                      <S.Icon $src={handRightIcon} alt="손가락 아이콘" />
                      보러가기
                    </S.Link>
                  )}
                </S.MessageBox>
              </S.SlideIn>
            ) : (
              <S.SlideOut onAnimationEnd={() => setToast([])}>
                <S.MessageBox>{message}</S.MessageBox>
              </S.SlideOut>
            )}
          </S.Layout>
        );
      })}
    </>
  );
}

export default Toast;
