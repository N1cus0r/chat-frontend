import { Box, Button, Paper, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../components/UI/buttons/FormButton";
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
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          width: {
            xs: 300,
            sm: 380,
            md: 420,
          },
          height: {
            xs: 220,
            sm: 280,
            md: 320,
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack direction="column" spacing={3}>
          <FormButton onClick={() => navigate("join-room")}>
            Join Existing Room
          </FormButton>
          <FormButton onClick={() => navigate("create-room")}>
            Create Room
          </FormButton>
          <FormButton onClick={() => logoutUser()}>Logout</FormButton>
        </Stack>
      </Paper>
    </Box>
  );
};

export default HomePage;
