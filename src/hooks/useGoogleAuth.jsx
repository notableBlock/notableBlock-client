import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { googleLogout } from "@react-oauth/google";
import axios from "axios";

const useGoogleAuth = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [idToken, setIdToken] = useState(null);

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
    setProfile(null);
    setIdToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const savedUserData = localStorage.getItem("user");

    if (savedUserData) {
      const userId = JSON.parse(savedUserData);

      setProfile(userId);
      navigate(`/user/${userId}`);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (idToken) {
      const fetchUserProfile = async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, {
            token: idToken,
          });

          localStorage.setItem("user", JSON.stringify(res.data.user._id));

          setProfile(res.data.user._id);
          navigate(`/user/${res.data.user._id}`);
        } catch (error) {
          handleLoginError(error);
        }
      };

      fetchUserProfile();
    }
  }, [idToken, navigate]);

  return {
    profile,
    handleLoginSuccess,
    handleLogout,
  };
};

export default useGoogleAuth;
