import { useMatch } from "react-router";

import useUserStore from "../../stores/useUserStore";

import useGoogleAuth from "../../hooks/useGoogleAuth";

import * as S from "../../styles/components/NavBarStyle";

function NavBar() {
  const { handleLogout } = useGoogleAuth();
  const { profile } = useUserStore();
  const isNotePageActive = useMatch("/notes/*");
  const isSharedPageActive = useMatch("/shared/*");
  const isNoteTreePageActive = useMatch("/notes/tree");

  const userPicture = profile?.picture;
  const userName = profile?.name || "게스트";

  return (
    <S.NavBarLayout>
      <S.NavBarItem>
        <S.NavBarImage />
      </S.NavBarItem>
      <S.NavBarItem $type="title">Notable Block</S.NavBarItem>
      <S.NavBarLink to="/notes" $isActive={isNotePageActive && !isNoteTreePageActive}>
        내 노트
      </S.NavBarLink>
      <S.NavBarLink to="/shared" $isActive={isSharedPageActive}>
        실시간 공유 노트
      </S.NavBarLink>
      <S.NavBarLink to="/notes/tree" $isActive={isNoteTreePageActive}>
        내 노트 트리
      </S.NavBarLink>
      <S.NavBarUserContainer>
        <S.NavBarItem>
          <S.NavBarImage $picture={userPicture} /> {userName}
        </S.NavBarItem>
        <S.NavBarItem onClick={handleLogout} $type="logout">
          ◀ 로그아웃
        </S.NavBarItem>
      </S.NavBarUserContainer>
    </S.NavBarLayout>
  );
}

export default NavBar;
