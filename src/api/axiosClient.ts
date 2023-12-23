// api/axiosClient.js
import axios from "axios";

import queryString from "query-string";
import { userLogin } from "../utils/interface/interface";
const REFRESH_THRESHOLD = 30000;

// Cai dat config mac dinh cho http request
// Tham khao: `https://github.com/axios/axios#request-config`
// de xem chi tiet
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log("co nhay vao");
      const loginUser = localStorage.getItem("userLogin");
      let user: userLogin = {
        isLogin: false,
        username: "",
        password: "",
        token: "",
        expireTime: 0,
        id: 0,
      };
      if (loginUser != null) {
        user = JSON.parse(loginUser);
      }
      console.log(user.password);
      

      updateAxiosAccessToken("");
      const refeshToken = await axiosClient.post("/user/login", {
        userName: user.username,
        password: user.password,
      });
      localStorage.setItem(
        "userLogin",
        JSON.stringify({
          ...user,
          token: refeshToken.data.token,
          expireTime: refeshToken.data.expireTime,
        })
      );
      updateAxiosAccessToken(refeshToken.data.token);
      originalRequest.headers.Authorization = `Bearer ${refeshToken.data.token}`;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

// Update base url
const updateAxiosBaseURL = (baseUrl: string) => {
  axiosClient.defaults.baseURL = baseUrl;
};

// Update access token
const updateAxiosAccessToken = (accessToken: string) => {
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};

// Remove access token
const removeAxiosAccessToken = () => {
  delete axiosClient.defaults.headers.common["Authorization"];
};
updateAxiosBaseURL("http://localhost:8080");
console.log(axiosClient.defaults.baseURL);

export { updateAxiosAccessToken, removeAxiosAccessToken, updateAxiosBaseURL };

export default axiosClient;
