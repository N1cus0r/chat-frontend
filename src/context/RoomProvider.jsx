import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosAuth from "../hooks/useAxiosAuth";
import LocalStorageApi from "../utils/LocalStorageApi";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const axiosAuth = useAxiosAuth();

  const setRoomDetails = async (roomCode) => {
    const response = await axiosAuth.get("/get-room-details/", {
      params: { code: roomCode },
    });
    const { host_id, max_participants, participants, id } = response.data;
    LocalStorageApi.setLocalStorageRoom({
      id,
      code: roomCode,
      hostId: host_id,
      maxParticipants: max_participants,
      participants,
    });
  };

  const joinRoom = async (roomCode) => {
    const response = await axiosAuth.put("/join-room/", {
      code: roomCode,
    });
    if (response.status === 200) {
      const data = response.data;
      const room = {
        id: data.id,
        code: data.code,
        hostId: data.host_id,
        maxParticipants: data.max_participants,
        participants: data.participants,
      };
      LocalStorageApi.setLocalStorageRoom(room);
      navigate(`/room/${roomCode}/`);
    }
  };

  const leaveRoom = async (roomCode) => {
    const response = await axiosAuth.put("/leave-room/", {
      code: roomCode,
    });
    if (response.status === 200) {
      LocalStorageApi.delLocalStorageRoom();
      navigate("/");
    }
  };

  const kickUser = () => {
    LocalStorageApi.delLocalStorageRoom();
    navigate("/");
  };

  const getRoomMessages = async (roomId) => {
    const response = await axiosAuth.get("/get-messages/", {
      params: { roomId: roomId },
    });
    return response.data;
  };

  const context = {
    setRoomDetails,
    getRoomMessages,
    joinRoom,
    leaveRoom,
    kickUser,
  };

  return (
    <RoomContext.Provider value={context}>{children}</RoomContext.Provider>
  );
};

export default RoomProvider;
