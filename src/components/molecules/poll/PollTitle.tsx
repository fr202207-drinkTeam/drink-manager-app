import { Box } from "@mui/material";
import React from "react";
import { Questionnaire } from "../../../types/type";

type PollTitleProps = {
  poll: Questionnaire[];
};

const PollTitle = ({ poll }: PollTitleProps) => {
  return (
    <>
      <Box
        sx={{
          pt: 1,
          borderTop: 'double #81671C',
          borderBottom: 'double #81671C',
          pb: 1,
          backgroundImage: {
            xs: '',
            sm:'',
            md:'url(/coffee2.png)',
          },
          backgroundRepeat: 'no-repeat',
          backgroundSize: 120,
          opacity: 0.8,
          mb: 5,
          mt: 4,
          backgroundPosition: {
            xs: '',
            sm: 'left 40px center ',
          },
          mx: 2,
        }}
      >
        <Box
          sx={{
              fontSize: {
                xs: "20px",
                sm: "35px",
                md: "47px",
              },
            textAlign: 'center',
            mt: 1,
            py: 1,
            fontWeight: 'bold',
            color: '#6B3906',
            letterSpacing: 3,
          }}
        >
          {poll[0]?.name}
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            mt: 1,
            fontWeight: 'bold',
            letterSpacing:        { xs: 0,
            sm: 2,
            md: 3,},
            py: 1,
            fontSize: {
              xs: "10px",
              sm: "20px",
              md: "25px",
            },
          }}
        >
          開催期間:&emsp; {poll[0]?.startDate.toLocaleDateString()}&emsp;〜&emsp;
          {poll[0]?.endDate.toLocaleDateString()}
        </Box>
      </Box>
    </>
  );
};

export default PollTitle;
