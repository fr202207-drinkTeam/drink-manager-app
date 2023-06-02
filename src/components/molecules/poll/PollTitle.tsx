import { Box, useTheme } from "@mui/material";
import React from "react";
import { Questionnaire } from "../../../types/type";

type PollTitleProps = {
  poll: Questionnaire[];
};

const PollTitle = ({ poll }: PollTitleProps) => {
  const theme = useTheme();
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
              xs: theme.typography.pxToRem(35),
              sm: theme.typography.pxToRem(47),
            },
            textAlign: 'center',
            mt: 1,
            py: 1,
            fontWeight: 'bold',
            color: '#6B3906',
            letterSpacing: 5,
          }}
        >
          {poll[0]?.name}
        </Box>
        <Box
          sx={{
            fontSize: {
              xs: theme.typography.pxToRem(16),
              sm: theme.typography.pxToRem(20),
            },
            textAlign: 'center',
            mt: 1,
            fontWeight: 'bold',
            letterSpacing: 3,
            py: 1,
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
