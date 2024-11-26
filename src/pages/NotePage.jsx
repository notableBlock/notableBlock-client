import * as S from "../styles/NotePageStyle";

import Button from "../components/common/Button";
import NoteViewer from "../components/NoteViewer";

function NotePage() {
  return (
    <S.NotePageLayout>
      <S.NoteLink to="/note/:id">
        <NoteViewer />
      </S.NoteLink>
      <S.NotePageItem type="option">
        <Button />
      </S.NotePageItem>
    </S.NotePageLayout>
  );
}

export default NotePage;
