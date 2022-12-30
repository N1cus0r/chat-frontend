import React, { useState } from "react";
import { Box, Button, Paper, TextField, Alert } from "@mui/material";
import { Stack } from "@mui/system";
import useAuth from "../../../hooks/useAuth";
import FormButton from "../buttons/FormButton";
import MyInput from "../MyInput";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { registerUser } = useAuth();

  const handleClick = async () => {
    if (!username || !password || !passwordRepeat) {
      setErrorMessage("Please provide the username, email and password !");
      return;
    }
    if (password !== passwordRepeat) {
      setErrorMessage("Passwords didn't match !");
    }

    const error = await registerUser(username, password);
    if (error) {
      setErrorMessage(error);
    }
  };

  const removeError = () => {
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleUsernameChange = (e) => {
    removeError();
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    removeError();
    setPassword(e.target.value);
  };

  const handlePasswordRepeatChange = (e) => {
    removeError();
    setPasswordRepeat(e.target.value);
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
        direction="column"
        spacing={4}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Paper
          sx={{
            width: {
              xs: 300,
              sm: 380,
              md: 420,
            },
            height: {
              xs: 320,
              sm: 380,
              md: 440,
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: 250, maxHeight: 450 }}>
            <Stack direction="column" spacing={3}>
              <MyInput
                type="text"
                label="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <MyInput
                type="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <MyInput
                type="password"
                label="Repeat Password"
                value={passwordRepeat}
                onChange={handlePasswordRepeatChange}
              />
              <FormButton type="submit" onClick={handleClick}>
                Register
              </FormButton>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
