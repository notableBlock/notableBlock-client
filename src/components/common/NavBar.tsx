import { useMatch } from "react-router";

import useUserStore from "stores/useUserStore";

import useGoogleAuth from "hooks/useGoogleAuth";

import * as S from "styles/components/NavBarStyle";

function NavBar() {
  const { handleLogout } = useGoogleAuth();
  const { profile } = useUserStore();

  const isNotePageActive = Boolean(useMatch("/notes/*"));
  const isSharedPageActive = Boolean(useMatch("/shared/*"));
  const isNoteTreePageActive = Boolean(useMatch("/notes/tree"));

  const userPicture = profile?.picture;
  const userName = profile?.name;

  return (
    <S.Layout>
      <S.Item>
        <S.Icon />
      </S.Item>
      <S.Item $type="title">Notable Block</S.Item>
      <S.Link to="/notes" $isActive={isNotePageActive && !isNoteTreePageActive}>
        내 노트
      </S.Link>
      <S.Link to="/shared" $isActive={isSharedPageActive}>
        실시간 공유 노트
      </S.Link>
      <S.Link to="/notes/tree" $isActive={isNoteTreePageActive}>
        내 노트 트리
      </S.Link>
      <S.Section>
        <S.Item>
          <S.Icon $picture={userPicture} /> <p>{`${userName}님`}</p>
        </S.Item>
        <S.Item onClick={handleLogout} $type="logout">
          ◀ 로그아웃
        </S.Item>
      </S.Section>
    </S.Layout>
  );
}

export default NavBar;
