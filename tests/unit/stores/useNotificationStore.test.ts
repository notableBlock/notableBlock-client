import useNotificationStore from "stores/useNotificationStore";

import type { Notification } from "types/models";

const makeNotification = (overrides: Partial<Notification> = {}): Notification => ({
  _id: "n1",
  link: null,
  message: "msg",
  receivedAt: "2026-05-07T00:00:00.000Z",
  recipientId: "u1",
  __v: 0,
  ...overrides,
});

beforeEach(() => {
  useNotificationStore.setState({
    toast: [],
    isToastVisible: true,
    allNotification: [],
  });
});

describe("useNotificationStore", () => {
  test("초기 상태는 toast: [], isToastVisible: true, allNotification: []이다.", () => {
    const state = useNotificationStore.getState();

    expect(state.toast).toEqual([]);
    expect(state.isToastVisible).toBe(true);
    expect(state.allNotification).toEqual([]);
  });

  test("setToast는 toast 배열을 교체한다.", () => {
    const toast = [makeNotification({ _id: "t1" })];
    useNotificationStore.getState().setToast(toast);

    expect(useNotificationStore.getState().toast).toEqual(toast);
  });

  test("setIsToastVisible은 boolean을 갱신한다.", () => {
    useNotificationStore.getState().setIsToastVisible(false);
    expect(useNotificationStore.getState().isToastVisible).toBe(false);

    useNotificationStore.getState().setIsToastVisible(true);
    expect(useNotificationStore.getState().isToastVisible).toBe(true);
  });

  test("setAllNotification은 알림 배열을 교체한다.", () => {
    const notifs = [makeNotification({ _id: "a" }), makeNotification({ _id: "b" })];
    useNotificationStore.getState().setAllNotification(notifs);

    expect(useNotificationStore.getState().allNotification).toEqual(notifs);
  });

  test("setRemoveNotification은 _id가 일치하는 항목만 제거한다.", () => {
    const notifs = [
      makeNotification({ _id: "a" }),
      makeNotification({ _id: "b" }),
      makeNotification({ _id: "c" }),
    ];
    useNotificationStore.getState().setAllNotification(notifs);
    useNotificationStore.getState().setRemoveNotification("b");

    const remaining = useNotificationStore.getState().allNotification;
    expect(remaining.map((n) => n._id)).toEqual(["a", "c"]);
  });

  test("setRemoveNotification에 매칭되는 항목이 없으면 배열은 유지된다.", () => {
    const notifs = [makeNotification({ _id: "a" })];
    useNotificationStore.getState().setAllNotification(notifs);
    useNotificationStore.getState().setRemoveNotification("non-existent");

    expect(useNotificationStore.getState().allNotification).toEqual(notifs);
  });
});
