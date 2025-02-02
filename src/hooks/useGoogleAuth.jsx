import { useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import useUserStore from "../stores/useUserStore";

import { login, autoLogin, logout } from "../services/googleAuth";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setProfile, clearProfile } = useUserStore();

  const handleLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      try {
        const profile = await login(code);

        setProfile(profile);
        navigate("/notes");
      } catch (err) {
        navigate("/error", { state: { message: err.message } });
      }
    },
    onError: async () => {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    },
    flow: "auth-code",
  });

  const handleLogout = async () => {
    try {
      await logout();
      clearProfile();
      navigate("/login");
    } catch (err) {
      navigate("/error", { state: { message: err.message } });
    }
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          await autoLogin();

          return axios(error.config);
        } catch {
          try {
            await logout();
            clearProfile();
            navigate("/login");
          } catch (err) {
            navigate("/error", { state: { message: err.message } });
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    handleLogin,
    handleLogout,
  };
};

export default useGoogleAuth;
