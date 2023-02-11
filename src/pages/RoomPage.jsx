import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/chat/Chat";
import RoomData from "../components/RoomData";
import useRoom from "../hooks/useRoom";
import LocalStorageApi from "../utils/LocalStorageApi";

const RoomPage = () => {
  const [roomData, setRoomData] = useState(
    LocalStorageApi.getLocalStorageRoom()
  );
  const roomApi = useRoom();
  const { roomCode } = useParams();
  const webSocket = useRef(null);
  const [messages, setMessages] = useState([]);
  const getRoomMessages = async () => {
    const messageData = await roomApi.getRoomMessages(roomData.id);
    setMessages(messageData.reverse());
  };

  useEffect(() => {
    roomApi.checkIfRoomActive(roomCode);
    const messagesDataTimeout = setTimeout(getRoomMessages, 200);
    return () => {
      clearTimeout(messagesDataTimeout);
    };
  }, []);

  useEffect(() => {
    webSocket.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${roomCode}/`
      // `wss://chat-backend-gj81.onrender.com/ws/chat/${roomCode}/`
    );
    webSocket.current.onopen = (event) => {
      console.log("Connection open");
      sendEvent("User Joined Room");
    };

    webSocket.current.onclose = (event) => {
      console.log("Connection Closed!");
    };

    webSocket.current.onmessage = async (json) => {
      const messageData = JSON.parse(json.data);
      if (messageData.message) {
        setMessages((prev) => [...prev, messageData.message]);
      } else {
        if (messageData.event === "Host Left Room") {
          roomApi.kickUser();
        } else {
          await roomApi.setRoomDetails(roomCode);
          setRoomData(LocalStorageApi.getLocalStorageRoom());
        }
      }
    };

    return () => {
      webSocket.current.close();
    };
  }, []);

  const sendMessage = (message) => {
    webSocket.current.send(
      JSON.stringify({
        message,
      })
    );
  };

  const sendEvent = (event) => {
    webSocket.current.send(
      JSON.stringify({
        event,
      })
    );
  };

  return (
    <Box>
      <RoomData roomData={roomData} roomCode={roomCode} />
      <Chat
        messages={messages}
        sendMessage={sendMessage}
        sendEvent={sendEvent}
      />
    </Box>
  );
};

export default RoomPage;
