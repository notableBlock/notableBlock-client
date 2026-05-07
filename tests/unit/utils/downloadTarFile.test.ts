import type { AxiosResponse } from "axios";

import downloadTarFile from "utils/downloadTarFile";

const makeResponse = (contentDisposition?: string): AxiosResponse => {
  const blob = new Blob(["dummy"], { type: "application/x-tar" });
  return {
    data: blob,
    headers: contentDisposition ? { "content-disposition": contentDisposition } : {},
    status: 200,
    statusText: "OK",
    config: {} as AxiosResponse["config"],
  };
};

const createObjectURL = jest.fn(() => "blob:mock-url");
const revokeObjectURL = jest.fn();

beforeEach(() => {
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: createObjectURL,
  });
  Object.defineProperty(URL, "revokeObjectURL", {
    configurable: true,
    value: revokeObjectURL,
  });
  createObjectURL.mockClear();
  revokeObjectURL.mockClear();
});

afterEach(() => {
  // jsdom에 없는 API였으므로 다음 테스트에 누수되지 않도록 정리
  // @ts-expect-error - delete the test-only stub
  delete URL.createObjectURL;
  // @ts-expect-error - delete the test-only stub
  delete URL.revokeObjectURL;
  document.body.innerHTML = "";
  jest.restoreAllMocks();
});

describe("downloadTarFile", () => {
  test("Content-Disposition이 없으면 기본 파일명 '노트.tar'로 다운로드한다.", async () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {
      const link = document.querySelector("a")!;
      expect(link.getAttribute("download")).toBe("노트.tar");
    });

    await downloadTarFile(makeResponse());

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test("filename*=UTF-8'' 형식의 헤더에서 한국어 파일명을 디코딩한다.", async () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {
      const link = document.querySelector("a")!;
      expect(link.getAttribute("download")).toBe("노트.tar");
    });

    await downloadTarFile(makeResponse("attachment; filename*=UTF-8''%EB%85%B8%ED%8A%B8.tar"));

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test("filename=\"...\" 형식의 헤더에서 파일명을 추출한다.", async () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {
      const link = document.querySelector("a")!;
      expect(link.getAttribute("download")).toBe("example.tar");
    });

    await downloadTarFile(makeResponse('attachment; filename="example.tar"'));

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test("두 형식이 모두 있을 때 filename*=가 우선된다.", async () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {
      const link = document.querySelector("a")!;
      expect(link.getAttribute("download")).toBe("priority.tar");
    });

    // filename*=가 헤더 끝에 위치 (greedy 정규식의 swallow 영향을 피하기 위해)
    await downloadTarFile(
      makeResponse('attachment; filename="legacy.tar"; filename*=UTF-8\'\'priority.tar'),
    );

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test("<a> 생성 → click → DOM 제거 + revokeObjectURL 순서로 실행된다.", async () => {
    const events: string[] = [];

    createObjectURL.mockImplementationOnce(() => {
      events.push("createObjectURL");
      return "blob:mock-url";
    });
    revokeObjectURL.mockImplementationOnce(() => {
      events.push("revokeObjectURL");
    });

    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {
      events.push("click");
      // click 시점에는 <a>가 body에 붙어 있어야 함
      expect(document.body.querySelector("a")).not.toBeNull();
    });

    await downloadTarFile(makeResponse("attachment; filename=\"x.tar\""));

    // 호출 후에는 <a>가 body에서 제거되어 있어야 함
    expect(document.body.querySelector("a")).toBeNull();

    expect(events).toEqual(["createObjectURL", "click", "revokeObjectURL"]);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
