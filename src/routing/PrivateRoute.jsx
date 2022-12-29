import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import LocalStorageApi from "../utils/LocalStorageApi";

const PrivateRoute = () => {
  const tokens = LocalStorageApi.getLocalStorageTokens();
  return tokens ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;
