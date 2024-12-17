import { useState, useEffect } from "react";

import Loading from "../components/common/Loading";
import NoteTreeChart from "../components/NoteTreeChart";

import useUserStore from "../stores/useUserStore";

import useControlNotes from "../hooks/useControlNotes";

import convertToTree from "../utils/convertToTree";

import * as S from "../styles/NoteTreePageStyle";

function NoteTreePage() {
  const { profile } = useUserStore();
  const { fetchedNotes, getUserNotes } = useControlNotes();

  const [isLoading, setIsLoading] = useState(false);

  const noteData = convertToTree(fetchedNotes, profile.name);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      await getUserNotes();
      setIsLoading(false);
    };

    fetchNotes();
  }, [getUserNotes]);

  return (
    <S.NoteTreePageLayout>
      {isLoading ? <Loading /> : <NoteTreeChart data={noteData} />}
    </S.NoteTreePageLayout>
  );
}

export default NoteTreePage;
