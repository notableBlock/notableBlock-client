import axios from "axios";

import { login, autoLogin, logout, guestLogin } from "services/googleAuthServices";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeAxiosError = (message?: string) => {
  // err.response가 아예 없는 경우(네트워크 에러)는 message를 undefined로 호출
  if (message === undefined) return new Error("network down");

  const err = new Error("server error") as Error & {
    response?: { data?: { message?: string } };
  };
  err.response = { data: { message } };
  return err;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("login", () => {
  test("성공 시 응답 data.profile을 반환하고 /users로 authCode를 POST한다.", async () => {
    const profile = { userId: "u1", name: "Choi", picture: "" };
    mockedAxios.post.mockResolvedValueOnce({ data: { profile } });

    const result = await login("auth-code-123");

    expect(result).toEqual(profile);
    expect(mockedAxios.post).toHaveBeenCalledWith("/users", { authCode: "auth-code-123" });
  });

  test("서버가 메시지를 내려주면 그 메시지로 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(makeAxiosError("이미 가입된 계정이에요."));

    await expect(login("any")).rejects.toThrow("이미 가입된 계정이에요.");
  });

  test("서버 메시지가 없으면 기본 메시지로 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(makeAxiosError());

    await expect(login("any")).rejects.toThrow("로그인에 실패했어요.");
  });
});

describe("autoLogin", () => {
  test("성공 시 예외 없이 종료되고 /users를 GET한다.", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await expect(autoLogin()).resolves.toBeUndefined();
    expect(mockedAxios.get).toHaveBeenCalledWith("/users");
  });

  test("서버 메시지가 있으면 그 메시지로 throw한다.", async () => {
    mockedAxios.get.mockRejectedValueOnce(makeAxiosError("세션 만료"));

    await expect(autoLogin()).rejects.toThrow("세션 만료");
  });

  test("서버 메시지가 없으면 기본 메시지로 throw한다.", async () => {
    mockedAxios.get.mockRejectedValueOnce(makeAxiosError());

    await expect(autoLogin()).rejects.toThrow("자동 로그인에 실패했어요. 재로그인이 필요해요.");
  });
});

describe("logout", () => {
  test("성공 시 예외 없이 종료되고 /users/logout을 POST한다.", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    await expect(logout()).resolves.toBeUndefined();
    expect(mockedAxios.post).toHaveBeenCalledWith("/users/logout");
  });

  test("서버 메시지가 있으면 그 메시지로 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(makeAxiosError("쿠키 삭제 실패"));

    await expect(logout()).rejects.toThrow("쿠키 삭제 실패");
  });

  test("서버 메시지가 없으면 기본 메시지로 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(makeAxiosError());

    await expect(logout()).rejects.toThrow("로그아웃에 실패했어요.");
  });
});

describe("guestLogin", () => {
  test("성공 시 응답 data.profile을 반환하고 /users/guest를 POST한다.", async () => {
    const profile = { userId: "g1", name: "게스트", picture: "", isGuest: true };
    mockedAxios.post.mockResolvedValueOnce({ data: { profile } });

    const result = await guestLogin();

    expect(result).toEqual(profile);
    expect(mockedAxios.post).toHaveBeenCalledWith("/users/guest");
  });

  test("서버 메시지가 있으면 그 메시지로 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(makeAxiosError("게스트 풀 가득 참"));

    await expect(guestLogin()).rejects.toThrow("게스트 풀 가득 참");
  });

  test("서버 메시지가 없으면 기본 메시지로 throw한다.", async () => {
    mockedAxios.post.mockRejectedValueOnce(makeAxiosError());

    await expect(guestLogin()).rejects.toThrow("게스트 로그인에 실패했어요.");
  });
});
