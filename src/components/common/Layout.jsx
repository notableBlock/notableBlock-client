import * as S from "../../styles/LayoutStyle";

import NavBar from "./NavBar";
import Button from "./Button";

function Layout({ children }) {
  return (
    <S.Layout>
      <NavBar />
      <S.Item>{children}</S.Item>
      <S.Item type="notification">
        <Button />
      </S.Item>
    </S.Layout>
  );
}

export default Layout;
