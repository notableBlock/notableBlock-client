import useUserStore from "stores/useUserStore";

import type { User } from "types/models";

const profile: User = { userId: "u1", name: "Choi", picture: "https://x/p.png" };
const guestProfile: User = { userId: "g1", name: "게스트", picture: "", isGuest: true };

beforeEach(() => {
  // persist 미들웨어가 사용하는 localStorage와 store 상태를 모두 초기화
  // (replace 모드 X — 액션 함수까지 날아가면 다음 테스트가 깨짐)
  useUserStore.setState({ profile: null });
  localStorage.clear();
});

describe("useUserStore", () => {
  test("초기 profile은 null이다.", () => {
    expect(useUserStore.getState().profile).toBeNull();
  });

  test("setProfile은 profile을 갱신한다.", () => {
    useUserStore.getState().setProfile(profile);

    expect(useUserStore.getState().profile).toEqual(profile);
  });

  test("clearProfile은 profile을 null로 만든다.", () => {
    useUserStore.getState().setProfile(profile);
    useUserStore.getState().clearProfile();

    expect(useUserStore.getState().profile).toBeNull();
  });

  test("setProfile 후 localStorage('user-profile')에 직렬화되어 저장된다.", () => {
    useUserStore.getState().setProfile(profile);

    const raw = localStorage.getItem("user-profile");
    expect(raw).not.toBeNull();

    const parsed = JSON.parse(raw!);
    expect(parsed.state.profile).toEqual(profile);
  });

  test("게스트 사용자도 동일하게 저장된다(isGuest 플래그 보존).", () => {
    useUserStore.getState().setProfile(guestProfile);

    const parsed = JSON.parse(localStorage.getItem("user-profile")!);
    expect(parsed.state.profile.isGuest).toBe(true);
  });
});
