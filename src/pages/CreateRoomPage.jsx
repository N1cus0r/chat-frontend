import { Box, Button, Paper, Stack, TextField, Alert } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import FormButton from "../components/UI/buttons/FormButton";
import MyInput from "../components/UI/MyInput";
import useAxiosAuth from "../hooks/useAxiosAuth";
import useRoom from "../hooks/useRoom";
import LocalStorageApi from "../utils/LocalStorageApi";

const CreateRoomPage = () => {
  const roomApi = useRoom();
  const axiosAuth = useAxiosAuth();
  const tokenInfo = jwtDecode(LocalStorageApi.getLocalStorageTokens().access);
  const [numberOfParticipants, setNumberOfParticipants] = useState("2");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNumberOfParticipantsChange = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    if (!isNaN(e.target.value)) {
      setNumberOfParticipants(e.target.value);
    }
  };

  const handleClick = async () => {
    if (!["2", "3", "4", "5"].includes(numberOfParticipants)) {
      setErrorMessage(
        "The number of participants should be in the range of 2 to 5"
      );
      setNumberOfParticipants(2);
      return;
    }
    try {
      const response = await axiosAuth.post("/create-room/", {
        max_participants: numberOfParticipants,
        host_id: tokenInfo.user_id,
      });
      if (response.status === 201) {
        roomApi.joinRoom(response.data.code);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
            width: {
              xs: 300,
              sm: 350,
              md: 400,
            },
            height: {
              xs: 220,
              sm: 250,
              md: 270,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 250,
              maxHeight: 270,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack direction="column" spacing={3}>
              <MyInput
                label="Number of participants"
                helperText="The range is form 2 to 5"
                value={numberOfParticipants}
                onChange={handleNumberOfParticipantsChange}
              />
              <FormButton onClick={handleClick}>Create</FormButton>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CreateRoomPage;
