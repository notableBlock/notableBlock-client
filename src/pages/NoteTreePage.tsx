import { useState, useEffect } from "react";

import Loading from "components/common/Loading";
import NoteTreeChart from "components/NoteTreeChart";

import useUserStore from "stores/useUserStore";

import useControlNotes from "hooks/useControlNotes";

import convertToTree from "utils/convertToTree";

import toolIcon from "assets/images/tool-icon.png";
import handCursorIcon from "assets/images/hand-cursor-icon.png";
import handDragIcon from "assets/images/hand-drag-icon.png";
import leftClickIcon from "assets/images/left-click-icon.png";
import mouseScrollingIcon from "assets/images/mouse-scrolling-icon.png";
import pinIcon from "assets/images/pin-icon.png";
import shareIcon from "assets/images/share-icon.png";
import checkIcon from "assets/images/check-icon.png";
import greenCircleIcon from "assets/images/green-circle-icon.png";
import redCircleIcon from "assets/images/red-circle-icon.png";

import * as S from "styles/pages/NoteTreePageStyle";

function NoteTreePage() {
  const { profile } = useUserStore();
  const { fetchedOwnedNotes, getOwnedNotes } = useControlNotes();

  const [isLoading, setIsLoading] = useState(false);

  if (!profile) return;
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
    <S.Layout>
      {isLoading ? <Loading /> : <NoteTreeChart noteData={noteData} />}
      <S.UnorderedList>
        <S.InfoBox>
          <S.InfoHeader>
            <S.Icon $src={toolIcon} alt="도구 아이콘" />
            <h3>사용 방법</h3>
          </S.InfoHeader>
          <li>
            <S.Icon $src={mouseScrollingIcon} alt="마우스 스크롤 아이콘" />
            <span>마우스 휠</span>로 확대/축소할 수 있어요.
          </li>
          <li>
            <S.Icon $src={handDragIcon} alt="손 드래그 아이콘" />
            <span>마우스 드래그</span>로 화면을 이동할 수 있어요.
          </li>
          <li>
            <S.Icon $src={handCursorIcon} alt="손 커서 아이콘" />
            <span>노드에 마우스를 올리면</span> 노트 정보가 표시돼요.
          </li>
          <li>
            <S.Icon $src={leftClickIcon} alt="마우스 클릭 아이콘" />
            <span>노드를 클릭하면</span> 해당 노트 페이지로 이동해요.
          </li>
        </S.InfoBox>
        <S.InfoBox>
          <S.InfoHeader>
            <S.Icon $src={pinIcon} alt="핀 아이콘" />
            <h3>노트 이동 기준</h3>
          </S.InfoHeader>
          <li>
            <S.Icon $src={checkIcon} alt="체크박스 아이콘" /> <span>내가 수정한 노트</span> → 에디터
            페이지
          </li>
          <li>
            <S.Icon $src={checkIcon} alt="체크박스 아이콘" /> <span>다른 사람이 수정한 노트</span> →
            공유된 경우에만 공유 페이지
          </li>
        </S.InfoBox>
        <S.InfoBox>
          <S.InfoHeader>
            <S.Icon $src={shareIcon} alt="공유 아이콘" />
            <h3>공유 상태</h3>
          </S.InfoHeader>
          <li>
            <S.Icon $src={greenCircleIcon} alt="공유 상태 아이콘" />
            <span>공유된 노트</span> - 다른 사람도 볼 수 있어요.
          </li>
          <li>
            <S.Icon $src={redCircleIcon} alt="비공유 상태 아이콘" />
            <span>비공유 노트</span> - 수정한 사람만 볼 수 있어요.
          </li>
        </S.InfoBox>
      </S.UnorderedList>
    </S.Layout>
  );
}

export default NoteTreePage;
