import React, { useState } from "react";
import { Box, Button, Paper, Stack, TextField, Alert } from "@mui/material";
import useAxiosAuth from "../hooks/useAxiosAuth";
import { useNavigate } from "react-router-dom";
import LocalStorageApi from "../utils/LocalStorageApi";

const JoinRoomPage = () => {
  const navigate = useNavigate();
  const axiosAuth = useAxiosAuth();
  const [roomCode, setRoomCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    try {
      const response = await axiosAuth.put("/join-room/", {
        code: roomCode,
      });
      if (response.status === 200) {
        console.log(response.data);
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
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "whitesmoke",
        height: "100vh",
      }}
    >
      <Stack
        spacing={4}
        direction="column"
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Paper
          sx={{
            width: 300,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: 250, maxHeight: 270 }}>
            <Stack direction="column" spacing={3}>
              <TextField
                label="Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                Join
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default JoinRoomPage;
