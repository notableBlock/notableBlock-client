import axios from "axios";

import archiveUploadedFiles from "services/archiveServices";
import downloadTarFile from "utils/downloadTarFile";

jest.mock("axios");
jest.mock("utils/downloadTarFile");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedDownloadTarFile = downloadTarFile as jest.MockedFunction<typeof downloadTarFile>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("archiveUploadedFiles", () => {
  test("POST /notes/uploads/archive에 multipart 헤더 + responseType: blob으로 전송한다.", async () => {
    const response = { data: new Blob(["x"]), headers: {}, status: 200 };
    mockedAxios.post.mockResolvedValueOnce(response);
    const formData = new FormData();
    formData.append("files", new Blob(["x"]));

    await archiveUploadedFiles(formData);

    expect(mockedAxios.post).toHaveBeenCalledWith("/notes/uploads/archive", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: "blob",
    });
  });

  test("성공 시 응답을 downloadTarFile에 위임한다.", async () => {
    const response = { data: new Blob(["x"]), headers: {}, status: 200 };
    mockedAxios.post.mockResolvedValueOnce(response);

    await archiveUploadedFiles(new FormData());

    expect(mockedDownloadTarFile).toHaveBeenCalledWith(response);
  });

  test("실패 시 downloadTarFile은 호출되지 않고 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("upload failed"));

    await expect(archiveUploadedFiles(new FormData())).rejects.toThrow("upload failed");
    expect(mockedDownloadTarFile).not.toHaveBeenCalled();
  });
});
