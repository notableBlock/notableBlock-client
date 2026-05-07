import axios from "axios";

import {
  getAllNotification,
  deleteNotification,
  deleteAllNotification,
} from "services/notificationServices";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("getAllNotification", () => {
  test("notificationsId 배열을 받아 각 항목을 병렬 fetch하여 결과 배열을 반환한다.", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { notificationsId: ["a", "b"] } })
      .mockResolvedValueOnce({ data: { _id: "a", message: "msg-a" } })
      .mockResolvedValueOnce({ data: { _id: "b", message: "msg-b" } });

    const result = await getAllNotification();

    expect(result).toEqual([
      { _id: "a", message: "msg-a" },
      { _id: "b", message: "msg-b" },
    ]);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, "/notification");
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, "/notification/a");
    expect(mockedAxios.get).toHaveBeenNthCalledWith(3, "/notification/b");
  });

  test("notificationsId가 빈 배열이면 빈 배열을 반환한다.", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { notificationsId: [] } });

    const result = await getAllNotification();

    expect(result).toEqual([]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("forbidden"));

    await expect(getAllNotification()).rejects.toThrow("forbidden");
  });
});

describe("deleteNotification", () => {
  test("DELETE /notification/:id를 호출한다.", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: {} });

    await deleteNotification("notif-1");

    expect(mockedAxios.delete).toHaveBeenCalledWith("/notification/notif-1");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("forbidden"));

    await expect(deleteNotification("notif-1")).rejects.toThrow("forbidden");
  });
});

describe("deleteAllNotification", () => {
  test("DELETE /notification을 호출한다.", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: {} });

    await deleteAllNotification();

    expect(mockedAxios.delete).toHaveBeenCalledWith("/notification");
  });

  test("실패 시 throw한다.", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("forbidden"));

    await expect(deleteAllNotification()).rejects.toThrow("forbidden");
  });
});
