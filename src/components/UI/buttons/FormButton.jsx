import { Button } from "@mui/material";
import React from "react";

const FormButton = (props) => {
  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        height: {
          xs: 40,
          sm: 50,
          md: 60,
        },
        fontSize: {
          xs: 15,
          sm: 20,
          md: 25,
        },
      }}
    >
      {props.children}
    </Button>
  );
};

export default FormButton;
