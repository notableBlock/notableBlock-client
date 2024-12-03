import * as S from "../styles/UserPageStyle";

import NoteViewer from "../components/NoteViewer";

function SharedPage() {
  return (
    <S.UserPageLayout>
      <S.NoteLink>
        <NoteViewer to="/note/:id" />
      </S.NoteLink>
    </S.UserPageLayout>
  );
}

export default SharedPage;
