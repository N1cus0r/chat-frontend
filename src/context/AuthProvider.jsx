import jwtDecode from "jwt-decode";
import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosApi from "../hooks/useAxiosApi";
import LocalStorageApi from "../utils/LocalStorageApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const axiosApi = useAxiosApi();

  const registerUser = async (username, password) => {
    try {
      await axiosApi.post("/register/", {
        username,
        password,
      });
      loginUser(username, password);
      navigate("/");
    } catch (error) {
      return error.response.data.username;
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axiosApi.post("/token/", {
        username,
        password,
      });
      LocalStorageApi.setLocalStorageTokens(response.data);
      navigate("/");
    } catch (error) {
      return error.response.data.detail;
    }
  };

  const logoutUser = () => {
    LocalStorageApi.delLocalStorageTokens();
    navigate("login");
  };

  const getUserInfo = () => {
    const tokens = LocalStorageApi.getLocalStorageTokens();
    if (!tokens) return undefined;
    const tokenInfo = jwtDecode(tokens?.access);
    return { id: tokenInfo.user_id, username: tokenInfo.user_username };
  };

  const user = getUserInfo();

  const context = {
    registerUser,
    loginUser,
    logoutUser,
    user,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
