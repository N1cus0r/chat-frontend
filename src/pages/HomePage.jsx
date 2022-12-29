import { Box, Button, Paper, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

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
      <Paper
        sx={{
          width: 250,
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack direction="column" spacing={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("join-room")}
          >
            Join Existing Room
          </Button>
          <Button variant="contained" onClick={() => navigate("create-room")}>
            Create Room
          </Button>
          <Button variant="contained" onClick={() => logoutUser()}>
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default HomePage;
