import { useRef, useState, useEffect } from "react";
import { Outlet } from "react-router";

import NavBar from "components/common/NavBar";
import Button from "components/common/Button";
import Form from "components/common/Form";
import Toast from "components/Toast";
import NotificationHub from "components/NotificationHub";

import useControlNotifications from "hooks/useControlNotifications";
import useOnClickOutside from "hooks/useOnClickOutside";

import { Bell } from "lucide-react";

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
      <S.ToastBox>
        <Toast />
      </S.ToastBox>
      <S.Item $notification="notification">
        {isOpen && (
          <S.NotiBox>
            <Form ref={modalRef} title="🔔 알림 허브" isNotification={true}>
              <S.Button onClick={handleDeleteAllNotification}>모두 삭제</S.Button>
              <NotificationHub />
            </Form>
          </S.NotiBox>
        )}
        <Button
          icon={<Bell size={20} />}
          onClick={handleOpenModal}
          type="notification"
          dataTestId="notification-button"
        />
      </S.Item>
    </S.Layout>
  );
}

export default Layout;
