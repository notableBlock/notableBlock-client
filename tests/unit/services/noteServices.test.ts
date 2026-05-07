import axios from "axios";

import {
  createNote,
  getAllNote,
  getBlocks,
  getSharedBlocks,
  updateNote,
  deleteNote,
  shareNote,
  exportNote,
  importNote,
  getAllSharedNote,
  copySharedNote,
  uploadNoteImage,
  deleteNoteImage,
  getAllOwnedNote,
} from "services/noteServices";
import downloadTarFile from "utils/downloadTarFile";

import type { Block } from "types/block";

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

describe("createNote", () => {
  test("POST /notes 응답 data를 그대로 반환한다.", async () => {
    const note = { _id: "n1", title: "" };
    mockedAxios.post.mockResolvedValueOnce({ data: note });

    const result = await createNote();

    expect(result).toEqual(note);
    expect(mockedAxios.post).toHaveBeenCalledWith("/notes");
  });

  test("실패 시 에러를 그대로 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("server down"));

    await expect(createNote()).rejects.toThrow("server down");
  });
});

describe("getAllNote", () => {
  test("notesId 배열을 받아 각 noteId를 병렬 fetch하여 결과 배열을 반환한다.", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { notesId: ["a", "b"] } })
      .mockResolvedValueOnce({ data: { _id: "a", title: "A" } })
      .mockResolvedValueOnce({ data: { _id: "b", title: "B" } });

    const result = await getAllNote();

    expect(result).toEqual([
      { _id: "a", title: "A" },
      { _id: "b", title: "B" },
    ]);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, "/notes");
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, "/notes/a");
    expect(mockedAxios.get).toHaveBeenNthCalledWith(3, "/notes/b");
  });

  test("notesId가 빈 배열이면 빈 배열을 반환한다.", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { notesId: [] } });

    const result = await getAllNote();

    expect(result).toEqual([]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("개별 fetch가 실패하면 throw한다.", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { notesId: ["a"] } })
      .mockRejectedValueOnce(new Error("not found"));

    await expect(getAllNote()).rejects.toThrow("not found");
  });
});

describe("getBlocks", () => {
  test("응답 data.blocks를 반환한다.", async () => {
    const blocks: Block[] = [{ id: "b1", html: "h", tag: "p", imageUrl: "" }];
    mockedAxios.get.mockResolvedValueOnce({ data: { blocks } });

    const result = await getBlocks("note-1");

    expect(result).toBe(blocks);
    expect(mockedAxios.get).toHaveBeenCalledWith("/notes/note-1");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("forbidden"));

    await expect(getBlocks("note-1")).rejects.toThrow("forbidden");
  });
});

describe("getSharedBlocks", () => {
  test("/shared/:noteId GET 응답의 blocks를 반환한다.", async () => {
    const blocks: Block[] = [{ id: "b1", html: "", tag: "p", imageUrl: "" }];
    mockedAxios.get.mockResolvedValueOnce({ data: { blocks } });

    const result = await getSharedBlocks("note-1");

    expect(result).toBe(blocks);
    expect(mockedAxios.get).toHaveBeenCalledWith("/shared/note-1");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("forbidden"));

    await expect(getSharedBlocks("note-1")).rejects.toThrow("forbidden");
  });
});

describe("updateNote", () => {
  test("PUT /notes/:noteId에 { data: { blocks } } 형태로 전송한다.", async () => {
    mockedAxios.put.mockResolvedValueOnce({ data: {} });
    const blocks: Block[] = [{ id: "b1", html: "", tag: "p", imageUrl: "" }];

    await updateNote(blocks, "note-1");

    expect(mockedAxios.put).toHaveBeenCalledWith("/notes/note-1", { data: { blocks } });
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.put.mockRejectedValueOnce(new Error("network"));

    await expect(updateNote([], "note-1")).rejects.toThrow("network");
  });
});

describe("deleteNote", () => {
  test("DELETE /notes/:noteId를 호출한다.", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: {} });

    await deleteNote("note-1");

    expect(mockedAxios.delete).toHaveBeenCalledWith("/notes/note-1");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("forbidden"));

    await expect(deleteNote("note-1")).rejects.toThrow("forbidden");
  });
});

describe("shareNote", () => {
  test("PATCH /notes/:noteId 응답의 note를 반환한다.", async () => {
    const note = { _id: "note-1", isShared: true };
    mockedAxios.patch.mockResolvedValueOnce({ data: { note } });

    const result = await shareNote("note-1");

    expect(result).toEqual(note);
    expect(mockedAxios.patch).toHaveBeenCalledWith("/notes/note-1");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.patch.mockRejectedValueOnce(new Error("forbidden"));

    await expect(shareNote("note-1")).rejects.toThrow("forbidden");
  });
});

describe("exportNote", () => {
  test("GET /notes/:noteId/download with responseType: blob을 호출하고 응답을 downloadTarFile에 위임한다.", async () => {
    const response = { data: new Blob(["x"]), headers: {}, status: 200 };
    mockedAxios.get.mockResolvedValueOnce(response);

    await exportNote("note-1");

    expect(mockedAxios.get).toHaveBeenCalledWith("/notes/note-1/download", { responseType: "blob" });
    expect(mockedDownloadTarFile).toHaveBeenCalledWith(response);
  });

  test("실패 시 downloadTarFile은 호출되지 않고 throw한다.", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("server"));

    await expect(exportNote("note-1")).rejects.toThrow("server");
    expect(mockedDownloadTarFile).not.toHaveBeenCalled();
  });
});

describe("importNote", () => {
  test("POST /notes/uploads에 multipart 헤더로 FormData를 전송하고 notes 배열을 반환한다.", async () => {
    const notes = [{ _id: "n1" }, { _id: "n2" }];
    mockedAxios.post.mockResolvedValueOnce({ data: { notes } });
    const formData = new FormData();
    formData.append("files", new Blob(["x"]));

    const result = await importNote(formData);

    expect(result).toBe(notes);
    expect(mockedAxios.post).toHaveBeenCalledWith("/notes/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("upload failed"));

    await expect(importNote(new FormData())).rejects.toThrow("upload failed");
  });
});

describe("getAllSharedNote", () => {
  test("/shared의 notesId를 병렬로 GET /shared/:id하여 결과 배열을 반환한다.", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { notesId: ["s1", "s2"] } })
      .mockResolvedValueOnce({ data: { _id: "s1" } })
      .mockResolvedValueOnce({ data: { _id: "s2" } });

    const result = await getAllSharedNote();

    expect(result).toEqual([{ _id: "s1" }, { _id: "s2" }]);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, "/shared");
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, "/shared/s1");
    expect(mockedAxios.get).toHaveBeenNthCalledWith(3, "/shared/s2");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("forbidden"));

    await expect(getAllSharedNote()).rejects.toThrow("forbidden");
  });
});

describe("copySharedNote", () => {
  test("POST /shared/:noteId를 호출한다.", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    await copySharedNote("note-1");

    expect(mockedAxios.post).toHaveBeenCalledWith("/shared/note-1");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("forbidden"));

    await expect(copySharedNote("note-1")).rejects.toThrow("forbidden");
  });
});

describe("uploadNoteImage", () => {
  test("POST /notes/:noteId/images?s3=true with multipart 헤더로 전송하고 imageUrl을 반환한다.", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { imageUrl: "https://cdn/img.png" } });
    const formData = new FormData();

    const result = await uploadNoteImage("note-1", formData);

    expect(result).toBe("https://cdn/img.png");
    expect(mockedAxios.post).toHaveBeenCalledWith("/notes/note-1/images?s3=true", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("upload failed"));

    await expect(uploadNoteImage("note-1", new FormData())).rejects.toThrow("upload failed");
  });
});

describe("deleteNoteImage", () => {
  test("imageUrl의 마지막 path segment를 추출하여 DELETE /notes/images/:s3Key를 호출한다.", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: {} });

    await deleteNoteImage("https://cdn.example.com/bucket/path/abc123.png");

    expect(mockedAxios.delete).toHaveBeenCalledWith("/notes/images/abc123.png");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("forbidden"));

    await expect(deleteNoteImage("https://cdn/x.png")).rejects.toThrow("forbidden");
  });
});

describe("getAllOwnedNote", () => {
  test("GET /notes/tree 응답의 ownedNotes를 반환한다.", async () => {
    const ownedNotes = [{ _id: "o1" }];
    mockedAxios.get.mockResolvedValueOnce({ data: { ownedNotes } });

    const result = await getAllOwnedNote();

    expect(result).toBe(ownedNotes);
    expect(mockedAxios.get).toHaveBeenCalledWith("/notes/tree");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("forbidden"));

    await expect(getAllOwnedNote()).rejects.toThrow("forbidden");
  });
});
