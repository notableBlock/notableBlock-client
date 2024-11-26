import * as S from "../../styles/NavBarStyle";

function NavBar() {
  return (
    <S.NavBarLayout>
      <S.NavBarItem>
        <img src="/notable-block-logo.png" alt="notable-block 로고" />
      </S.NavBarItem>
      <S.NavBarItem type="title">Notable Block</S.NavBarItem>
      <S.NavBarLink to="/">내 노트</S.NavBarLink>
      <S.NavBarLink to="/shared">실시간 공유 노트</S.NavBarLink>
      <S.NavBarLink to="/noteTree">내 노트 트리</S.NavBarLink>
      <S.NavBarUserContainer>
        <S.NavBarItem>사용자 이름</S.NavBarItem>
        <S.NavBarLink to="/login">◀ 로그아웃</S.NavBarLink>
      </S.NavBarUserContainer>
    </S.NavBarLayout>
  );
}

export default NavBar;
