import NoteEditor from "../components/NoteEditor";
import Button from "../components/common/Button";

import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/NoteEditingPageStyle";

function NoteEditingPage() {
  return (
    <S.NoteEditingPageLayout>
      <NoteEditor />
      <S.NoteEditingPageItem>
        <Button image={plusOptionIcon} />
      </S.NoteEditingPageItem>
    </S.NoteEditingPageLayout>
  );
}

export default NoteEditingPage;
