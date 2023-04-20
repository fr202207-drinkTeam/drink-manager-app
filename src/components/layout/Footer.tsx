import React from "react";
// import { Typography } from "@mui/material";
// import Paper from "@mui/material/Paper";
// const Footer = () => {
//   return (
//     <Paper
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         py: 6,
//       }}
//     >
//       <Typography sx={{ mx: 2 }}>TOP</Typography>
//       <Typography sx={{ mx: 2 }}>ご利用ガイド</Typography>
//       <Typography sx={{ mx: 2 }}>お問い合わせ</Typography>
//       <Typography sx={{ mx: 2 }}>投票</Typography>
//     </Paper>
//   );
// };

// export default Footer;

// import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Paper } from "@mui/material";
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
        <Typography sx={{ mx: 2 }}>TOP</Typography>
        <Typography sx={{ mx: 2 }}>ご利用ガイド</Typography>
        <Typography sx={{ mx: 2 }}>お問い合わせ</Typography>
        <Typography sx={{ mx: 2 }}>投票</Typography>
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