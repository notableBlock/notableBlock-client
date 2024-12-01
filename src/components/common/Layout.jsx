import NavBar from "./NavBar";
import Button from "./Button";

import notificationIcon from "../../assets/images/notification-icon.png";

import * as S from "../../styles/LayoutStyle";

function Layout({ children }) {
  return (
    <S.Layout>
      <NavBar />
      <S.Item>{children}</S.Item>
      <S.Item type="notification">
        <Button image={notificationIcon} />
      </S.Item>
    </S.Layout>
  );
}

export default Layout;
