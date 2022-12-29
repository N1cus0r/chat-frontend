import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LocalStorageApi from "../utils/LocalStorageApi";

const RoomExists = () => {
  const room = LocalStorageApi.getLocalStorageRoom();
  return room ? <Navigate to={`room/${room.code}/`} /> : <Outlet />;
};

export default RoomExists;
