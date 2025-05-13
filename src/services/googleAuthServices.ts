import axios from "axios";

const login = async (authCode: string) => {
  try {
    const { data } = await axios.post("/users", { authCode });

    return data.profile;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "로그인에 실패했어요.";
    throw new Error(errorMessage);
  }
};

const autoLogin = async () => {
  try {
    await axios.get("/users");
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "자동 로그인에 실패했어요. 재로그인이 필요해요.";
    throw new Error(errorMessage);
  }
};

const logout = async () => {
  try {
    await axios.post("/users/logout");
  } catch (err) {
    const errorMessage = err.response?.data?.message || "로그아웃에 실패했어요.";
    throw new Error(errorMessage);
  }
};

export { login, autoLogin, logout };
