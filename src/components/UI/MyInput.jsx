import { TextField } from "@mui/material";
import React from "react";

const MyInput = (props) => {
  return (
    <TextField
      {...props}
      inputProps={{
        sx: {
          width: {
            xs: 250,
            sm: 300,
            md: 350,
          },
          height: {
            xs: 25,
            sm: 35,
            md: 45,
          },
          fontSize: {
            xs: 20,
            sm: 27,
            md: 30,
          },
        },
      }}
    >
      MyInput
    </TextField>
  );
};

export default MyInput;
