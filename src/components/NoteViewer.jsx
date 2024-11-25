import * as S from "../styles/NoteViewerStyle";

function NoteViewer() {
  return (
    <S.NoteViewerLayout>
      <S.NoteViewerHeader>
        <p>생성날짜: </p>
        <p>공유 여부: </p>
        <p>ℹ️</p>
      </S.NoteViewerHeader>
      <S.NoteViewerContent>노트 내용</S.NoteViewerContent>
      <S.NoteViewerFooter>
        <p>원본 소유자: 사용자1</p>
        <p>수정자: 사용자2</p>
      </S.NoteViewerFooter>
    </S.NoteViewerLayout>
  );
}

export default NoteViewer;
