import { Box, Typography, Paper } from "@mui/material";
import React from "react";

const Message = ({ children, right, username }) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowWrap: "break-word",
        justifyContent: right ? "right" : "left",
      }}
    >
      <Paper
        sx={{ maxWidth: 200, width: "min-content", padding: 0.5 }}
        elevation={4}
      >
        <Typography variant="body2">{children}</Typography>
      </Paper>
    </Box>
  );
};

export default Message;
