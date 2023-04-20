import React from "react";
import Button from "@mui/material/Button";

 const PrimaryButton = ({ children, ...props }: any) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
};

const SecondaryButton = ({ children, ...props }: any) => {
  return (
    <Button variant="contained" color="secondary" {...props}>
      {children}
    </Button>
  );
};

export { PrimaryButton, SecondaryButton };
