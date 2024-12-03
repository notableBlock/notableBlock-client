import { useState } from "react";

import NoteEditor from "../components/NoteEditor";
import Button from "../components/common/Button";

import plusOptionIcon from "../assets/images/plus-option-icon.png";

import * as S from "../styles/NoteEditingPageStyle";

function NoteEditingPage() {
  const [isSaving, setIsSaving] = useState(false);
  return (
    <S.NoteEditingPageLayout>
      <S.SavingStatusItem $isSaving={isSaving}>
        {isSaving ? "자동저장 성공 ✅" : "자동저장 실패 ⛔️"}
      </S.SavingStatusItem>
      <NoteEditor setIsSaving={setIsSaving} />
      <S.NoteEditingPageItem>
        <Button image={plusOptionIcon} />
      </S.NoteEditingPageItem>
    </S.NoteEditingPageLayout>
  );
}

export default NoteEditingPage;
