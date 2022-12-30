import { Box, Stack } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import Message from "./Message";

const ChatLog = ({ messages }) => {
  const { user } = useAuth();

  return (
    <Box
      p={1}
      sx={{
        width: 320,
        height: {
          xs: 420,
          sm: 470,
          md: 520,
        },
        overflowY: "scroll",
      }}
    >
      <Stack direction="column" spacing={1}>
        {messages.map((message) =>
          message.user === user.id ? (
            <Message key={message.id} username={message.username}>
              {message.text}
            </Message>
          ) : (
            <Message right key={message.id} username={message.username}>
              {message.text}
            </Message>
          )
        )}
      </Stack>
    </Box>
  );
};

export default ChatLog;
