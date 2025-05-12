import { useState, useEffect } from "react";

import NoteViewer from "components/NoteViewer";
import Loading from "components/common/Loading";

import useControlNotes from "hooks/useControlNotes";

import * as S from "styles/pages/CommonNotePageStyle";

function SharedPage() {
  const { fetchedSharedNotes, handleSelectMenu, getSharedNotes, getMenu } = useControlNotes();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchShareNotes = async () => {
      setIsLoading(true);
      await getSharedNotes();
      setIsLoading(false);
    };

    fetchShareNotes();
  }, [getSharedNotes]);

  const kebabMenu = getMenu("실시간 공유 노트 '⋮' 버튼 메뉴");

  return (
    <S.CommonNotePageLayout>
      {isLoading ? (
        <Loading />
      ) : (
        fetchedSharedNotes.map((note) => {
          const {
            _id,
            blocks,
            creator,
            creatorPicture,
            createdAt,
            updatedAt,
            editor,
            editorPicture,
            isShared,
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
              isShared={isShared}
              kebabMenu={kebabMenu(_id)}
              onSelectMenu={handleSelectMenu}
            />
          );
        })
      )}
    </S.CommonNotePageLayout>
  );
}

export default SharedPage;
