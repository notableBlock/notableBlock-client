import { act, renderHook } from "@testing-library/react";

import useDebouncedSave from "hooks/useDebouncedSave";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("useDebouncedSave", () => {
  test("delay 만료 후 정확히 한 번만 호출된다.", () => {
    const save = jest.fn();
    const { result } = renderHook(() => useDebouncedSave(save, { delay: 1000 }));
    const [debouncedSave] = result.current;

    act(() => {
      debouncedSave("payload-1");
    });

    act(() => {
      jest.advanceTimersByTime(999);
    });
    expect(save).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("payload-1");
  });

  test("delay 안에 다시 호출되면 타이머가 리셋되고 마지막 인자만 저장된다.", () => {
    const save = jest.fn();
    const { result } = renderHook(() => useDebouncedSave(save, { delay: 1000 }));
    const [debouncedSave] = result.current;

    act(() => {
      debouncedSave("first");
    });

    act(() => {
      jest.advanceTimersByTime(800);
    });

    act(() => {
      debouncedSave("second");
    });

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(save).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("second");
  });

  test("maxWait이 설정되어 있어도 매 호출이 타이머를 리셋하면 호출되지 않다가, 멈춘 후 delay 만료로 호출된다.", () => {
    // 현재 구현 한계: cancelTimer가 매 호출마다 maxWait 타이머까지 클리어하고,
    // 두 번째 호출부터는 lastCallTimeRef가 0이 아니라 maxWait 재설정이 안 됨.
    // → 사실상 maxWait는 단독으로 발화하지 않음(현재 동작 보호용 테스트).
    const save = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedSave(save, { delay: 1000, maxWait: 3000 })
    );
    const [debouncedSave] = result.current;

    // 매 500ms마다 호출. delay 1000ms와 maxWait 3000ms 모두 만료되지 않음.
    for (let elapsed = 0; elapsed < 3000; elapsed += 500) {
      act(() => {
        debouncedSave(`call-${elapsed}`);
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });
    }
    expect(save).not.toHaveBeenCalled();

    // 호출을 멈추고 delay 1000ms 만큼 추가 진행 → 마지막 인자로 1회 호출
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("call-2500");
  });

  test("flush 호출 시 즉시 마지막 인자로 실행되고 이후 타이머는 호출되지 않는다.", () => {
    const save = jest.fn();
    const { result } = renderHook(() => useDebouncedSave(save, { delay: 1000 }));
    const [debouncedSave, flush] = result.current;

    act(() => {
      debouncedSave("payload");
    });

    act(() => {
      flush();
    });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("payload");

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(save).toHaveBeenCalledTimes(1);
  });

  test("pending이 없을 때 flush를 호출해도 아무 일도 일어나지 않는다.", () => {
    const save = jest.fn();
    const { result } = renderHook(() => useDebouncedSave(save, { delay: 1000 }));
    const [, flush] = result.current;

    act(() => {
      flush();
    });

    expect(save).not.toHaveBeenCalled();
  });

  test("unmount 시 대기 중인 타이머가 정리되어 호출이 발생하지 않는다.", () => {
    const save = jest.fn();
    const { result, unmount } = renderHook(() => useDebouncedSave(save, { delay: 1000 }));
    const [debouncedSave] = result.current;

    act(() => {
      debouncedSave("payload");
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(save).not.toHaveBeenCalled();
  });

  test("delay 만료 1회 후 다음 호출 사이클이 정상 동작한다.", () => {
    const save = jest.fn();
    const { result } = renderHook(() => useDebouncedSave(save, { delay: 1000 }));
    const [debouncedSave] = result.current;

    // 1차 사이클: 단일 호출 + delay 만료
    act(() => {
      debouncedSave("first");
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenLastCalledWith("first");

    // 2차 사이클: 단일 호출 + delay 만료
    act(() => {
      debouncedSave("second");
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(save).toHaveBeenCalledTimes(2);
    expect(save).toHaveBeenLastCalledWith("second");
  });

  test("maxWait 미설정 시 maxWait 분기는 발동하지 않는다.", () => {
    const save = jest.fn();
    const { result } = renderHook(() => useDebouncedSave(save, { delay: 1000 }));
    const [debouncedSave] = result.current;

    // 매 500ms마다 호출. maxWait이 없으므로 영영 호출되지 않음.
    for (let elapsed = 0; elapsed < 5000; elapsed += 500) {
      act(() => {
        debouncedSave(`call-${elapsed}`);
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });
    }
    expect(save).not.toHaveBeenCalled();

    // 호출을 멈추고 1초 더 기다리면 마지막 인자로 1회 호출
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("call-4500");
  });
});
