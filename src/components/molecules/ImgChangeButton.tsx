import { Autorenew } from "@mui/icons-material";
import { Box, IconButton, InputLabel, TextField, Typography } from "@mui/material";
import { FC, memo } from "react";

type Props = {};

const ImgChangeButton: FC<Props> = memo(() => {
  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <InputLabel variant="standard" htmlFor="changeImage">
        <IconButton
          sx={{
            color: "black",
            borderRadius: "none",
          }}
          onClick={() => {
            console.log("hello");
          }}
        >
          <Autorenew />
          <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>変更</Typography>
        </IconButton>
      </InputLabel>
      <TextField
        id="changeImage"
        type="file"
        inputProps={{ accept: "image/*" }}
        sx={{ p: "0", display: "none" }}
        size="small"
        onChange={() => {
          console.log("hello");
        }}
      />
    </Box>
  );
});

export default ImgChangeButton;
