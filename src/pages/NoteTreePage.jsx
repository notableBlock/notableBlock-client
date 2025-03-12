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

  const noteData = convertToTree(fetchedOwnedNotes, profile);

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
          <h3>🛠️ 사용 방법</h3>
          <li>
            🔍 <span>마우스 휠</span>로 확대/축소할 수 있어요.
          </li>
          <li>
            🖱️ <span>마우스 드래그</span>로 화면을 이동할 수 있어요.
          </li>
          <li>
            👀 <span>노드에 마우스를 올리면</span> 노트 정보가 표시돼요.
          </li>
          <li>
            📖 <span>노드를 클릭하면</span> 해당 노트 페이지로 이동해요.
          </li>
        </S.NoteTreePageContainer>
        <S.NoteTreePageContainer>
          <h3>📌 노트 이동 기준</h3>
          <li>
            ✔ <span>내가 수정한 노트</span> → 에디터 페이지
          </li>
          <li>
            ✔ <span>다른 사람이 수정한 노트</span> → 공유된 경우에만 공유 페이지
          </li>
        </S.NoteTreePageContainer>
        <S.NoteTreePageContainer>
          <h3>🔗 공유 상태</h3>
          <li>
            🟢 <span>공유된 노트</span> - 다른 사람도 볼 수 있어요.
          </li>
          <li>
            🔴 <span>비공유 노트</span> - 수정한 사람만 볼 수 있어요.
          </li>
        </S.NoteTreePageContainer>
      </S.NoteTreePageList>
    </S.NoteTreePageLayout>
  );
}

export default NoteTreePage;
