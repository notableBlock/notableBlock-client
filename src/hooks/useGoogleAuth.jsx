import { useEffect } from "react";
import { useNavigate } from "react-router";

import { googleLogout } from "@react-oauth/google";
import axios from "axios";

import useUserStore from "../stores/useUserStore";

const useGoogleAuth = () => {
  const navigate = useNavigate();

  const { userId, setUserId, idToken, setIdToken } = useUserStore();

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    setIdToken(token);
  };

  const handleLoginError = (error) => {
    return error;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    googleLogout();
    setUserId(null);
    setIdToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const savedUserData = localStorage.getItem("user");

    if (savedUserData) {
      const userId = JSON.parse(savedUserData);

      setUserId(userId);
      navigate(`/notes`);
    } else {
      navigate("/login");
    }
  }, [setUserId]);

  useEffect(() => {
    if (idToken) {
      const fetchUserProfile = async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, {
            token: idToken,
          });
          localStorage.setItem("user", JSON.stringify(res.data.user._id));

          setUserId(res.data.user._id);
          navigate(`/notes`);
        } catch (error) {
          handleLoginError(error);
        }
      };

      fetchUserProfile();
    }
  }, [idToken]);

  return {
    userId,
    handleLoginSuccess,
    handleLogout,
  };
};

export default useGoogleAuth;
