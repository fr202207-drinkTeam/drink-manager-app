import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface InactiveButtonProps extends ButtonProps {
  sxStyle?: any;
}

interface ActiveButtonProps extends ButtonProps {
  event: () => void;
  sxStyle?: any;
}

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
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
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
      sx={{
        background: "#8FB8D6",
        fontWeight: "bold",
        ":hover": {
          background: "#8FB8D6",
          opacity: 0.7,
          cursor: "pointer",
        },
        fontFamily: "'M PLUS 1p', sans-serif",
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
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
      sx={{
        background: "#ea6f00",
        fontWeight: "bold",
        ":hover": {
          background: "#ea6f00",
          opacity: 0.7,
          cursor: "pointer",
        },
        fontFamily: "'M PLUS 1p', sans-serif",
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
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
      sx={{
        background: "#C89F81",
        fontWeight: "bold",
        ":hover": {
          background: "#C89F81",
          opacity: 0.7,
          cursor: "pointer",
        },
        fontFamily: "'M PLUS 1p', sans-serif",
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
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
      sx={{
        background: "#e29399",
        fontWeight: "bold",
        ":hover": {
          background: "#e29399",
          opacity: 0.7,
          cursor: "pointer",
        },
        fontFamily: "'M PLUS 1p', sans-serif",
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
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
      sx={{
        background: "#024098",
        fontWeight: "bold",
        ":hover": {
          background: "#024098",
          opacity: 0.7,
          cursor: "pointer",
        },
        fontFamily: "'M PLUS 1p', sans-serif",
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
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
      sx={{
        background: "#E83929",
        fontWeight: "bold",
        ":hover": {
          background: "#E83929",
          opacity: 0.7,
          cursor: "pointer",
        },
        fontFamily: "'M PLUS 1p', sans-serif",
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ActiveBorderButton = ({
  children,
  event,
  sxStyle,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={event}
      sx={{
        background: "#fff",
        fontWeight: "bold",
        border: "1px solid #E83929",
        color: "#E83929",
        ":hover": {
          background: "#fff",
          opacity: 0.7,
          cursor: "pointer",
        },
        fontFamily: "'M PLUS 1p', sans-serif",
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
const ActiveGrayButton = ({
  children,
  event,
  sxStyle,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={event}
      sx={{
        background: "#a4a8ab",
        fontWeight: "bold",
        color: "#fff",
        ":hover": {
          background: "#a4a8ab",
          opacity: 0.7,
          cursor: "pointer",
        },
        fontFamily: "'M PLUS 1p', sans-serif",
        fontSize: {
          xs: "14px",
          sm: "14px",
          md: "16px",
          lg: "16px"
        },
        ...sxStyle,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
export {
  InactiveButton,
  ActiveBlueButton,
  ActiveOrangeButton,
  ActiveBeigeButton,
  ActivePinkButton,
  ActiveDarkBlueButton,
  ActiveRedButton,
  ActiveBorderButton,
  ActiveGrayButton,
};
