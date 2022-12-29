import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import RoomProvider from "../context/RoomProvider";
import CreateRoomPage from "../pages/CreateRoomPage";
import HomePage from "../pages/HomePage";
import JoinRoomPage from "../pages/JoinRoomPage";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import RegisterPage from "../pages/RegisterPage";
import RoomPage from "../pages/RoomPage";
import PrivateRoute from "./PrivateRoute";
import RoomExists from "./RoomExists";

const ChatRouter = () => {
  return (
    <AuthProvider>
      <RoomProvider>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="room/:roomCode/" element={<RoomPage />} />
            <Route element={<RoomExists />}>
              <Route path="/" element={<HomePage />} />
              <Route path="join-room" element={<JoinRoomPage />} />
              <Route path="create-room" element={<CreateRoomPage />} />
            </Route>
          </Route>
        </Routes>
      </RoomProvider>
    </AuthProvider>
  );
};

export default ChatRouter;
