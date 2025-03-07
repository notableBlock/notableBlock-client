import { useState, useEffect } from "react";

import Loading from "../components/common/Loading";
import NoteTreeChart from "../components/NoteTreeChart";

import useUserStore from "../stores/useUserStore";

import useControlNotes from "../hooks/useControlNotes";

import convertToTree from "../utils/convertToTree";

import * as S from "../styles/NoteTreePageStyle";

function NoteTreePage() {
  const { profile } = useUserStore();
  const { fetchedOwnedNotes, getOwnedNotes } = useControlNotes();

  const [isLoading, setIsLoading] = useState(false);

  const noteData = convertToTree(fetchedOwnedNotes, profile.name);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      await getOwnedNotes();
      setIsLoading(false);
    };

    fetchNotes();
  }, [getOwnedNotes]);

  return (
    <S.NoteTreePageLayout>
      {isLoading ? <Loading /> : <NoteTreeChart noteData={noteData} />}
      <S.NoteTreePageList>
        <S.NoteTreePageContainer>
          <li>
            🔍 <span>마우스 휠</span>로 확대/축소가 가능합니다.
          </li>
          <li>
            🖱️ <span>마우스 드래그</span>로 화면을 자유롭게 이동할 수 있습니다.
          </li>
          <li>
            👀 <span>노드에 마우스를 올리면</span> 노트 정보가 표시됩니다.
          </li>
          <li>
            📖 <span>노드를 클릭하면</span> 해당 노트 페이지로 이동합니다.
          </li>
        </S.NoteTreePageContainer>
        <S.NoteTreePageContainer>
          <li>🟢 공유 활성화</li>
          <li>🔴 공유 비활성화</li>
        </S.NoteTreePageContainer>
      </S.NoteTreePageList>
    </S.NoteTreePageLayout>
  );
}

export default NoteTreePage;
