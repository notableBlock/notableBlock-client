import * as S from "../styles/NavBarStyle";

function NavigationBar() {
  return (
    <S.NavBarLayout>
      <S.NavBarItem>Notable Block</S.NavBarItem>
      <S.NavBarItem>내 노트</S.NavBarItem>
      <S.NavBarItem>실시간 공유 노트</S.NavBarItem>
      <S.NavBarItem>내 노트 트리</S.NavBarItem>
      <S.NavBarUserContainer>
        <S.NavBarItem>사용자 이름</S.NavBarItem>
        <S.NavBarItem>◀ 로그아웃</S.NavBarItem>
      </S.NavBarUserContainer>
    </S.NavBarLayout>
  );
}

export default NavigationBar;
