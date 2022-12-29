import { Box, Paper, Stack } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatLog from "./ChatLog";
import LeaveRoomButton from "./LeaveRoomButton";

const Chat = ({ messages, sendMessage, sendEvent }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack direction="column" spacing={1}>
        <Paper
          sx={{
            width: 370,
            height: 500,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box p={1} sx={{ width: 320 }}>
            <Stack direction="column" spacing={1}>
              <ChatLog messages={messages} />
              <ChatInput sendMessage={sendMessage} />
            </Stack>
          </Box>
        </Paper>
        <LeaveRoomButton sendEvent={sendEvent} />
      </Stack>
    </Box>
  );
};

export default Chat;
