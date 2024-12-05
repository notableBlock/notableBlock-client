import axios from "axios";

const setupAxios = () => {
  axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;
  axios.defaults.withCredentials = true;
};

export default setupAxios;
