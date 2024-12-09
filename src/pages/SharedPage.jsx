import * as S from "../styles/UserPageStyle";

import NoteViewer from "../components/NoteViewer";

import useControlShared from "../hooks/useControlShared";

function SharedPage() {
  const { fetchedSharedNotes } = useControlShared();
  return (
    <S.UserPageLayout>
      {fetchedSharedNotes.map((note) => {
        const {
          _id,
          blocks,
          creator,
          creatorPicture,
          createdAt,
          updatedAt,
          editor,
          editorPicture,
        } = note;

        return (
          <NoteViewer
            key={_id}
            path="shared"
            noteId={_id}
            content={blocks}
            creator={creator}
            creatorPicture={creatorPicture}
            createdAt={createdAt}
            editor={editor}
            editorPicture={editorPicture}
            updatedAt={updatedAt}
          />
        );
      })}
    </S.UserPageLayout>
  );
}

export default SharedPage;
