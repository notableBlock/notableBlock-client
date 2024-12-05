import DOMPurify from "isomorphic-dompurify";

import * as S from "../styles/NoteViewerStyle";

function NoteViewer({
  noteId,
  content,
  creator,
  creatorPicture,
  createdAt,
  editor,
  editorPicture,
  updatedAt,
  shared,
}) {
  return (
    <S.NoteViewerLayout>
      <S.NoteViewerHeader>
        <p>생성날짜: {createdAt}</p>
        <p>공유 여부: {shared ? "✅" : "❌"}</p>
        <p>ℹ️</p>
      </S.NoteViewerHeader>
      <S.NoteViewerContent>
        {content.map((block, key) => {
          const HTMLTag = block.tag;
          const html = DOMPurify.sanitize(block.html);

          return <HTMLTag key={key} dangerouslySetInnerHTML={{ __html: html }} />;
        })}
      </S.NoteViewerContent>
      <S.NoteViewerFooter>
        <img src={creatorPicture} alt="원본소유자 사진" />
        <p>원본 소유자: {creator}</p>
        <img src={editorPicture} alt="수정자 사진" />
        <p>수정자: {editor}</p>
        <p>마지막 수정날짜: {updatedAt}</p>
      </S.NoteViewerFooter>
    </S.NoteViewerLayout>
  );
}

export default NoteViewer;
