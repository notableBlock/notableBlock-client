import { useState, useEffect } from "react";

import NoteViewer from "../components/NoteViewer";
import Loading from "../components/common/Loading";

import useControlNotes from "../hooks/useControlNotes";

import * as S from "../styles/UserPageStyle";

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

  const kebabMenu = getMenu("노트 가져오기");

  return (
    <S.UserPageLayout>
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
              kebabMenu={kebabMenu(_id)}
              onSelectMenu={handleSelectMenu}
            />
          );
        })
      )}
    </S.UserPageLayout>
  );
}

export default SharedPage;
