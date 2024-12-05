import useUserStore from "../../stores/useUserStore";

import useGoogleAuth from "../../hooks/useGoogleAuth";

import * as S from "../../styles/NavBarStyle";

function NavBar() {
  const { handleLogout } = useGoogleAuth();
  const { profile } = useUserStore();
  const { name, picture } = profile;

  return (
    <S.NavBarLayout>
      <S.NavBarItem>
        <S.NavBarImage />
      </S.NavBarItem>
      <S.NavBarItem type="title">Notable Block</S.NavBarItem>
      <S.NavBarLink to={`/notes`}>내 노트</S.NavBarLink>
      <S.NavBarLink to="/shared">실시간 공유 노트</S.NavBarLink>
      <S.NavBarLink to={`/noteTree`}>내 노트 트리</S.NavBarLink>
      <S.NavBarUserContainer>
        <S.NavBarItem>
          <S.NavBarImage $picture={picture} />
          {name || "게스트"}
        </S.NavBarItem>
        <S.NavBarItem onClick={handleLogout} type="logout">
          ◀ 로그아웃
        </S.NavBarItem>
      </S.NavBarUserContainer>
    </S.NavBarLayout>
  );
}

export default NavBar;
