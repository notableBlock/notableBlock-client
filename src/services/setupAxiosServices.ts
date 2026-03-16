import axios from "axios";

const setupAxios = () => {
  axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  // CSRF 심층 방어: form 기반 CSRF와 레거시 브라우저 대비 커스텀 헤더 추가
  // sameSite: "strict" 쿠키가 주 방어선이며, 이 헤더는 추가 방어층 역할
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
};

export default setupAxios;
