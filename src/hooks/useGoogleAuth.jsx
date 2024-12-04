import { useNavigate } from "react-router";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import useUserStore from "../stores/useUserStore";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setProfile } = useUserStore();

  const handleLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, { code }).then(({ data }) => {
        const { profile, access_token } = data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        setProfile(profile);
        navigate("/notes");
      });
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });

  const handleLogout = () => {
    googleLogout();
    setProfile(null);
    navigate("/login");
  };
  return {
    handleLogin,
    handleLogout,
  };
};

export default useGoogleAuth;
