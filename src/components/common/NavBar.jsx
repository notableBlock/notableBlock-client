import useGoogleAuth from "../../hooks/useGoogleAuth";

import * as S from "../../styles/NavBarStyle";

function NavBar() {
  const { profile, handleLogout } = useGoogleAuth();

  return (
    <S.NavBarLayout>
      <S.NavBarItem>
        <img src="/notable-block-logo.png" alt="notable-block 로고" />
      </S.NavBarItem>
      <S.NavBarItem type="title">Notable Block</S.NavBarItem>
      <S.NavBarLink to={`/user/${profile}`}>내 노트</S.NavBarLink>
      <S.NavBarLink to="/shared">실시간 공유 노트</S.NavBarLink>
      <S.NavBarLink to="/noteTree">내 노트 트리</S.NavBarLink>
      <S.NavBarUserContainer>
        <S.NavBarItem>{profile}</S.NavBarItem>
        <S.NavBarItem onClick={handleLogout}>◀ 로그아웃</S.NavBarItem>
      </S.NavBarUserContainer>
    </S.NavBarLayout>
  );
}

export default NavBar;
