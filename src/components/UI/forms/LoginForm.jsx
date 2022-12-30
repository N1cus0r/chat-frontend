import { Box, Button, Paper, TextField, Alert, Link } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import FormButton from "../buttons/FormButton";
import MyInput from "../MyInput";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser } = useAuth();

  const handleUsernameChange = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setPassword(e.target.value);
  };

  const handleClick = async (e) => {
    if (!username || !password) {
      setErrorMessage("Please provide the password an the username !");
      return;
    }

    const error = await loginUser(username, password);
    if (error) {
      setErrorMessage(error);
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
              sm: 380,
              md: 420,
            },
            height: {
              xs: 280,
              sm: 320,
              md: 370,
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
              textAlign: "center",
            }}
          >
            <Stack direction="column" spacing={3}>
              <MyInput
                type="text"
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                error={!!errorMessage}
              />
              <MyInput
                type="password"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                error={!!errorMessage}
              />
              <FormButton onClick={handleClick}>Login</FormButton>
              <Link href="/register">Register</Link>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default LoginForm;
