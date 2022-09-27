import axios from "axios";
import Cookie from "js-cookie";
const url = import.meta.env.VITE_API_ROUTE;
// Create axios instance

const service = axios.create({
  baseURL: url,
});

service.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded; charset=UTF-8";

// Request intercepter
service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + Cookie.get("token");
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response pre-processing
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // if unauthorize, redirect to login
    if (error.response.status === 401) {
      location.replace('login');
    }
    return Promise.reject(error);
  }
);

export default service;
