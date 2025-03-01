import axios from "axios";

import downloadTarFile from "../utils/downloadTarFile";

const archiveUploadedFiles = async (formData) => {
  try {
    const response = await axios.post("/notes/uploads/archive", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });

    downloadTarFile(response);
  } catch (err) {
    console.log("파일 가져오기 실패:", err);
    throw err;
  }
};

export default archiveUploadedFiles;
