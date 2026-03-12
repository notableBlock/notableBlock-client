import { useState, useEffect } from "react";
import { useMatch, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  /* 라우트 변경 시 모바일 메뉴 자동 닫기 */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /* ESC 키로 메뉴 닫기 */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <>
      <S.ToggleButton
        onClick={handleToggleMenu}
        aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isMenuOpen}
        aria-controls="nav-menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </S.ToggleButton>

      {isMenuOpen && (
        <S.Overlay onClick={handleCloseMenu} aria-hidden="true" />
      )}

      <S.Layout
        id="nav-menu"
        $isMenuOpen={isMenuOpen}
        role="navigation"
        aria-label="메인 내비게이션"
      >
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
    </>
  );
}

export default NavBar;
