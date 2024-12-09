import axios from "axios";

const getSharedNotes = async () => {
  try {
    const { data } = await axios.get("/shared");
    const { notesId } = data;

    return await Promise.all(
      notesId.map(async (noteId) => {
        const { data } = await axios.get(`/shared/${noteId}`);

        return data;
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getSharedNotes };
