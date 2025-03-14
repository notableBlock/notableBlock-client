import { useLocation, useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import useUserStore from "../stores/useUserStore";

import { login, autoLogin, logout } from "../services/googleAuthServices";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation;
  const { profile, setProfile, clearProfile } = useUserStore();

  const handleLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      try {
        const profile = await login(code);

        setProfile(profile);
        navigate("/notes");
      } catch (err) {
        navigate("/error", { state: { from: location.pathname, message: err.message } });
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
      navigate("/error", { state: { from: location.pathname, message: err.message } });
    }
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        if (profile) {
          try {
            await autoLogin();

            return axios(error.config);
          } catch {
            await logout();
            clearProfile();

            navigate("/login", { replace: true });
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
