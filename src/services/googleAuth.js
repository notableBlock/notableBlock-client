import axios from "axios";

const login = async (code) => {
  const { data } = await axios.post("/users", { code });
  const { profile, access_token } = data;
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

  return profile;
};

export { login };
