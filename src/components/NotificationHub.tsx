import useControlNotifications from "hooks/useControlNotifications";

import handRightIcon from "assets/images/hand-right-icon.png";

import * as S from "styles/components/NotificationStyle";

function NotificationHub() {
  const { allNotification, handleDeleteNotification } = useControlNotifications();

  return (
    <S.Layout>
      {allNotification.length ? (
        allNotification.map((notification) => {
          const { _id, receivedAt, message, link } = notification;

          return (
            <S.MessageBox key={_id}>
              {receivedAt} - {message}
              <S.LinkBox>
                {link && (
                  <S.Link to={link}>
                    <S.Icon $src={handRightIcon} alt="손가락 아이콘" />
                    보러 가기
                  </S.Link>
                )}
                <S.Button onClick={() => handleDeleteNotification(_id)}>X</S.Button>
              </S.LinkBox>
            </S.MessageBox>
          );
        })
      ) : (
        <S.MessageBox $isReadAllMessage={true}>모든 알림을 확인했어요.</S.MessageBox>
      )}
    </S.Layout>
  );
}

export default NotificationHub;
