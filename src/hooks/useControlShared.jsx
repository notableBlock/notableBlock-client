import { useState, useCallback } from "react";

import { useNavigate } from "react-router";

import { getSharedNotes } from "../services/shared";

const useControlShared = () => {
  const navigate = useNavigate();
  const [fetchedSharedNotes, setFetchedSharedNotes] = useState([]);

  const handleGetSharedNotes = useCallback(async () => {
    try {
      const fetchedData = await getSharedNotes();
      setFetchedSharedNotes(fetchedData);
    } catch {
      navigate("/error", { state: { message: "공유 노트를 불러오는데 실패했습니다." } });
    }
  }, [navigate]);

  return { fetchedSharedNotes, handleGetSharedNotes };
};

export default useControlShared;
