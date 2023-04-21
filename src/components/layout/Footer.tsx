import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 3,
          background: "#f3bf88",
          color: "white",
        }}
      >
        <Link to="/home">
          <Typography sx={{ mx: 2 }}>TOP</Typography>
        </Link>
        <Link to="/home/guide">
          <Typography sx={{ mx: 2 }}>ご利用ガイド</Typography>
        </Link>
        <Link to="/home/contact">
          <Typography sx={{ mx: 2 }}>お問い合わせ</Typography>
        </Link>
        <Link to="/home/poll">
          <Typography sx={{ mx: 2 }}>投票</Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 3,
          background: "#f3bf88",
          color: "white",
        }}
      >
        <Typography variant="body2" sx={{ mr: 1 }}>
          © 2023 RakuCafe All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
