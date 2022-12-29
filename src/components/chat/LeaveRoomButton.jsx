import React from "react";
import { Box, Button } from "@mui/material";
import useRoom from "../../hooks/useRoom";
import LocalStorageApi from "../../utils/LocalStorageApi";
import useAuth from "../../hooks/useAuth";

const LeaveRoomButton = ({ sendEvent }) => {
  const { user } = useAuth();
  const roomData = LocalStorageApi.getLocalStorageRoom();
  const { leaveRoom } = useRoom();
  const handleClick = async () => {
    await leaveRoom(roomData.code);
    const event =
      user.id === roomData.hostId ? "Host Left Room" : "User Left Room";
    sendEvent(event);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Button variant="contained" sx={{ width: 150 }} onClick={handleClick}>
        Leave Room
      </Button>
    </Box>
  );
};

export default LeaveRoomButton;
