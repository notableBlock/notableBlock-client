import { useRef, useState } from "react";

import { Outlet } from "react-router";

import NavBar from "./NavBar";
import Toast from "../Toast";
import Button from "./Button";
import NotificationHub from "../NotificationHub";
import Form from "./Form";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import notificationIcon from "../../assets/images/notification-icon.png";

import * as S from "../../styles/LayoutStyle";

function Layout({ children }) {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  useOnClickOutside(modalRef, handleCloseModal);

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
            <Form ref={modalRef} title="🔔 알림 확인" notification="notification">
              <NotificationHub />
            </Form>
          </S.NotiContainer>
        )}
        <Button image={notificationIcon} onClick={handleOpenModal} />
      </S.Item>
    </S.Layout>
  );
}

export default Layout;
