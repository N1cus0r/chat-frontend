import React from "react";
import { Box, Typography } from "@mui/material";

const RoomData = ({ roomData, roomCode }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: 20,
            sm: 30,
            md: 40,
          },
        }}
      >
        Participants: {roomData.participants}
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: 30,
            sm: 40,
            md: 50,
            lg: 60,
          },
        }}
      >
        Code: {roomCode}
      </Typography>
    </Box>
  );
};

export default RoomData;
