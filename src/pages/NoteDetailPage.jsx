import * as S from "../styles/NoteDetailPageStyle";

import NoteEditor from "../components/NoteEditor";
import Button from "../components/common/Button";

function NoteDetailPage() {
  return (
    <S.NoteDetailPageLayout>
      <NoteEditor />
      <S.NoteDetailItem>
        <Button />
      </S.NoteDetailItem>
    </S.NoteDetailPageLayout>
  );
}

export default NoteDetailPage;
