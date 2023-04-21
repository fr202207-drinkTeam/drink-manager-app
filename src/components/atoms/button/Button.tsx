import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface InactiveButtonProps extends ButtonProps {
  sxStyle?: any;
}

interface ActiveButtonProps extends ButtonProps {
  event: () => void;
  sxStyle?: any;
}

const PrimaryButton = ({ children, ...props }: any) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
};

const InactiveButton = ({
  children,
  sxStyle,
  ...props
}: InactiveButtonProps) => {
  return (
    <Button
      variant="contained"
      disabled
      sx={{
        fontWeight: "bold",
        fontFamily: "'M PLUS 1p', sans-serif",
        ...sxStyle }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ActiveBlueButton = ({
  children,
  event,
  sxStyle,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={event}
      sx={{ background: "#8FB8D6",
      fontWeight: "bold",
      ":hover": {
        background: "#8FB8D6",
        opacity: 0.7,
        cursor: "pointer",
      },
      fontFamily: "'M PLUS 1p', sans-serif",
      ...sxStyle }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ActiveOrangeButton = ({
  children,
  event,
  sxStyle,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={event}
      sx={{ background: "#ea6f00",
      fontWeight: "bold",
      ":hover": {
        background: "#ea6f00",
        opacity: 0.7,
        cursor: "pointer",
      },
      fontFamily: "'M PLUS 1p', sans-serif",
      ...sxStyle }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ActiveBeigeButton = ({
  children,
  event,
  sxStyle,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={event}
      sx={{ background: "#C89F81",
      fontWeight: "bold",
      ":hover": {
        background: "#C89F81",
        opacity: 0.7,
        cursor: "pointer",
      }, 
      fontFamily: "'M PLUS 1p', sans-serif",
      ...sxStyle }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ActivePinkButton = ({
  children,
  event,
  sxStyle,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={event}
      sx={{ background: "#e29399",
      fontWeight: "bold",
      ":hover": {
        background: "#e29399",
        opacity: 0.7,
        cursor: "pointer",
      }, 
      fontFamily: "'M PLUS 1p', sans-serif",
      ...sxStyle }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ActiveDarkBlueButton = ({
  children,
  event,
  sxStyle,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={event}
      sx={{ background: "#024098",
      fontWeight: "bold",
      ":hover": {
        background: "#024098",
        opacity: 0.7,
        cursor: "pointer",
      }, 
      fontFamily: "'M PLUS 1p', sans-serif",
      ...sxStyle }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ActiveRedButton = ({
  children,
  event,
  sxStyle,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={event}
      sx={{ background: "#ff0000",
      fontWeight: "bold",
      ":hover": {
        background: "#ff0000",
        opacity: 0.7,
        cursor: "pointer",
      }, 
      fontFamily: "'M PLUS 1p', sans-serif",
      ...sxStyle }}
      {...props}
    >
      {children}
    </Button>
  );
};

export {
  PrimaryButton,
  InactiveButton,
  ActiveBlueButton,
  ActiveOrangeButton,
  ActiveBeigeButton,
  ActivePinkButton,
  ActiveDarkBlueButton,
  ActiveRedButton
};
