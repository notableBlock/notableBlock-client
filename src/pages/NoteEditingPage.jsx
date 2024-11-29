import * as S from "../styles/NoteDetailPageStyle";

import NoteEditor from "../components/NoteEditor";
import Button from "../components/common/Button";

function NoteEditingPage() {
  return (
    <S.NoteEditingPageLayout>
      <NoteEditor />
      <S.EditingPageItem>
        <Button />
      </S.EditingPageItem>
    </S.NoteEditingPageLayout>
  );
}

export default NoteEditingPage;
