import { Box, Typography } from "@mui/material";
import React from "react";
import { Questionnaire } from "../../../types/type";

type PollTitleProps = {
  poll: Questionnaire[];
};

const PollComplateTitle = ({ poll }: PollTitleProps) => {
  return (
    <>
      <Box sx={{ position: "relative", maxWidth: "100%", }}>
        <Box
          sx={{
            pt: 1,
            borderTop: "double #81671C",
            borderBottom: "double #81671C",
            pb: 1,
            backgroundImage: {
              xs: '',
              sm:'',
              md:'url(/coffee2.png)',
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: 120,
            opacity: 0.8,
            mb: 5,
            mt: 4,
            backgroundPosition: {
              xs: '',
              sm: 'left 40px center ',
            },
          }}
        >
          <Box
            sx={{
                fontSize: {
                  xs: "20px",
                  sm: "35px",
                  md: "47px",
                },
              textAlign: "center",
              mt: 1,
              py: 1,
              fontWeight: "bold",
              color: "#6B3906",
              letterSpacing: 5,
            }}
          >
            {poll[0]?.name}
          </Box>
          <Typography
                variant="h5"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#fff",
                  zIndex: 1,
                  textAlign: "center",
                  width: "100%",
                  fontSize: {
                    xs: "20px",
                    sm: "30px",
                    md: "40px",
                  },
                }}
              >
                投票ありがとうございました！！
              </Typography>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <Box
            sx={{
              fontSize: {
              xs: "10px",
              sm: "20px",
              md: "20px",
            },
              textAlign: "center",
              mt: 1,
              // backgroundColor: "white",
              fontWeight: "bold",
              letterSpacing: 3,
              py: 1,
            }}
          >
            開催期間:&emsp; {poll[0]?.startDate.toLocaleDateString()}&emsp;〜&emsp;
            {poll[0]?.endDate.toLocaleDateString()}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PollComplateTitle;
