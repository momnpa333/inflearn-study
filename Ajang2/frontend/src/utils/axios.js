import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? "" : "http://localhost:8080",
});
axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.Authorization =
            "Bearer " + localStorage.getItem("accessToken");
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.data === "jwt expired") {
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
