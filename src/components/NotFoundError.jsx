import React from "react";
import { Typography, Box, Stack } from "@mui/material";

const NotFoundError = ({ element }) => {
  return (
    <Box>
      <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h5">This {element} Doesn't Exist...</Typography>
      </Stack>
    </Box>
  );
};

export default NotFoundError;
