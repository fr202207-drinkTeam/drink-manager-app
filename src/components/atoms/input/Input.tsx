import React from "react";
import TextField from "@mui/material/TextField";

const PrimaryInput = ({ ...props }: any) => {
  return (
    <>
      <TextField variant="outlined" margin="normal" fullWidth {...props} />
    </>
  );
};

const SecondaryInput = ({ ...props }: any) => {
  return <TextField variant="outlined" margin="normal" {...props} />;
};

export { PrimaryInput, SecondaryInput };
