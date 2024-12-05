import { useNavigate } from "react-router";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

import useUserStore from "../stores/useUserStore";

import { login } from "../services/googleAuth";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setProfile } = useUserStore();

  const handleLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      try {
        const profile = await login(code);
        setProfile(profile);
        navigate("/notes");
      } catch (err) {
        console.log(err);
      }
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
