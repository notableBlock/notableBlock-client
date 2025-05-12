import { useRef, useState, useEffect } from "react";
import { Outlet } from "react-router";

import NavBar from "components/common/NavBar";
import Button from "components/common/Button";
import Form from "components/common/Form";
import Toast from "components/Toast";
import NotificationHub from "components/NotificationHub";

import useControlNotifications from "hooks/useControlNotifications";
import useOnClickOutside from "hooks/useOnClickOutside";

import notificationIcon from "assets/images/notification-icon.png";

import * as S from "styles/LayoutStyle";

function Layout() {
  const { toast, getUserNotifications, handleDeleteAllNotification } = useControlNotifications();

  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  useOnClickOutside(modalRef, handleCloseModal);

  useEffect(() => {
    getUserNotifications();
  }, [toast, getUserNotifications]);

  return (
    <S.Layout>
      <NavBar />
      <S.Item>
        <Outlet />
      </S.Item>
      <S.Toast>
        <Toast />
      </S.Toast>
      <S.Item $notification="notification">
        {isOpen && (
          <S.NotiContainer>
            <Form ref={modalRef} title="🔔 알림 확인" isNotification={true}>
              <S.Button onClick={handleDeleteAllNotification}>모두 삭제</S.Button>
              <NotificationHub />
            </Form>
          </S.NotiContainer>
        )}
        <Button image={notificationIcon} onClick={handleOpenModal} type="notification" />
      </S.Item>
    </S.Layout>
  );
}

export default Layout;
