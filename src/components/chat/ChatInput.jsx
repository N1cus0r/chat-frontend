import React, { useState } from "react";
import { Box, Stack, Button, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import LocalStorageApi from "../../utils/LocalStorageApi";

const ChatInput = ({ sendMessage }) => {
  const { user } = useAuth();
  const room = LocalStorageApi.getLocalStorageRoom();
  const [message, setMessage] = useState("");
  const handleClick = () => {
    if (message.length) {
      const messageData = {
        username: user.username,
        user: user.id,
        roomId: room.id,
        text: message,
      };
      sendMessage(messageData);
      setMessage("");
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          sx={{ width: 300 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={handleClick}>
          Send
        </Button>
      </Stack>
    </Box>
  );
};

export default ChatInput;
