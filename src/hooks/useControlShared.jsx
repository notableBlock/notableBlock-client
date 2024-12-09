import { useState, useEffect, useCallback } from "react";

import { getSharedNotes } from "../services/shared";

const useControlShared = () => {
  const [fetchedSharedNotes, setFetchedSharedNotes] = useState([]);

  const handleGetSharedNotes = useCallback(async () => {
    const fetchedData = await getSharedNotes();
    console.log(fetchedData);

    setFetchedSharedNotes(fetchedData);
  }, []);

  useEffect(() => {
    handleGetSharedNotes();
  }, [handleGetSharedNotes]);

  return { fetchedSharedNotes };
};

export default useControlShared;
