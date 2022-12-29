import axios from "axios";
import LocalStorageApi from "./LocalStorageApi";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/token/",
  headers: {
    "Content-Type": "application/json",
  },
});

class TokenApi {
  static async refreshToken() {
    const refreshToken = LocalStorageApi.getLocalStorageTokens().refresh;

    const response = await axiosInstance.post("refresh/", {
      refresh: refreshToken,
    });
    const accessToken = response.data.access;
    LocalStorageApi.setLocalStorageTokens({
      access: accessToken,
      refresh: refreshToken,
    });
    return accessToken;
  }
}

export default TokenApi;
