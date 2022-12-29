import axios from "axios";

const useAxiosApi = () => {
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
};

export default useAxiosApi;
