import axios from "axios";

const login = async (code) => {
  try {
    const { data } = await axios.post("/users", { code });
    const { profile, access_token } = data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return profile;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "로그인에 실패했습니다.";
    throw new Error(errorMessage);
  }
};

const autoLogin = async () => {
  try {
    await axios.get("/users");
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "자동 로그인에 실패했습니다. 재로그인이 필요합니다.";
    throw new Error(errorMessage);
  }
};

const logout = async () => {
  try {
    await axios.post("/users/logout");
  } catch (err) {
    const errorMessage = err.response?.data?.message || "로그아웃에 실패했습니다.";
    throw new Error(errorMessage);
  }
};

export { login, autoLogin, logout };
