import * as S from "../styles/NotePageStyle";

import NoteViewer from "../components/NoteViewer";

function SharedPage() {
  return (
    <S.NotePageLayout>
      <S.NoteLink>
        <NoteViewer to="/note/:id" />
      </S.NoteLink>
    </S.NotePageLayout>
  );
}

export default SharedPage;
