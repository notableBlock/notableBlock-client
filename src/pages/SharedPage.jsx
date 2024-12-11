import { useState, useEffect } from "react";

import NoteViewer from "../components/NoteViewer";

import useControlShared from "../hooks/useControlShared";

import * as S from "../styles/UserPageStyle";
import Loading from "../components/common/Loading";

function SharedPage() {
  const { fetchedSharedNotes, handleGetSharedNotes } = useControlShared();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchShareNotes = async () => {
      setIsLoading(true);
      await handleGetSharedNotes();
      setIsLoading(false);
    };

    fetchShareNotes();
  }, [handleGetSharedNotes]);

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
            />
          );
        })
      )}
    </S.UserPageLayout>
  );
}

export default SharedPage;
