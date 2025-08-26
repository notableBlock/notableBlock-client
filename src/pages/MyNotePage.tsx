import { useState, useEffect } from "react";

import Button from "components/common/Button";
import NoteViewer from "components/NoteViewer";
import UploadDropZone from "components/UploadDropZone";
import Loading from "components/common/Loading";

import useControlNotes from "hooks/useControlNotes";

import plusOptionIcon from "assets/images/plus-option-icon.png";

import * as S from "styles/pages/CommonNotePageStyle";

function MyNotePage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    fetchedNotes,
    getUserNotes,
    handleCreateNewNote,
    handleImportFromLocal,
    handleSelectMenu,
    handleArchiveUploadedFiles,
    getMenu,
  } = useControlNotes(setIsLoading);

  const kebabMenu = getMenu("내 노트 '⋮' 버튼 메뉴");

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      await getUserNotes();
      setIsLoading(false);
    };

    fetchNotes();
  }, [getUserNotes]);

  return (
    <S.Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <S.Item>
            <UploadDropZone onUserUpload={handleArchiveUploadedFiles} fileTypes="마크다운·이미지" />
            <UploadDropZone onUserUpload={handleImportFromLocal} fileTypes="TAR" />
          </S.Item>
          {fetchedNotes.map((note) => {
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
                path="notes"
                noteId={_id}
                content={blocks}
                creator={creator}
                creatorPicture={creatorPicture}
                createdAt={createdAt}
                editor={editor}
                editorPicture={editorPicture}
                updatedAt={updatedAt}
                isShared={isShared}
                kebabMenu={kebabMenu(_id, isShared)}
                onSelectMenu={handleSelectMenu}
              />
            );
          })}
        </>
      )}
      <S.Item $isOption={true}>
        <Button image={plusOptionIcon} onClick={handleCreateNewNote} dataTestId="add-note-button" />
      </S.Item>
    </S.Layout>
  );
}

export default MyNotePage;
