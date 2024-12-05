import { Outlet } from "react-router";

import NavBar from "./NavBar";
import Button from "./Button";
import Loading from "./Loading";

import useLoadingStore from "../../stores/useLoadingStore";

import notificationIcon from "../../assets/images/notification-icon.png";

import * as S from "../../styles/LayoutStyle";

function Layout({ children }) {
  const { isLoading } = useLoadingStore();

  return (
    <S.Layout>
      <NavBar />
      <S.Item>{isLoading ? <Loading /> : <Outlet />}</S.Item>
      <S.Item type="notification">
        <Button image={notificationIcon} />
      </S.Item>
    </S.Layout>
  );
}

export default Layout;
