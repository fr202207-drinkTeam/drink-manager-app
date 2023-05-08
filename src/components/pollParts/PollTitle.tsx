import { Box } from "@mui/material";
import React from "react";
import { Questionnaire } from "../../types/type";

type PollTitleProps = {
  poll: Questionnaire[];
};

const PollTitle = ({ poll }: PollTitleProps) => {
  return (
    <>
      <Box
        sx={{
          background: "#fff9f5",
          p: 5,
          backgroundImage: "url(/coffee.png)",
          backgroundSize: 170,
          opacity: 0.8,
          mb: 5,
          mt: 5,
          fontWeight:"bold"
        }}
      >
        <Box
          sx={{
            fontSize: "40px",
            textAlign: "center",
            mt: 10,
            backgroundColor: "white",
            background:
              "-webkit-repeating-linear-gradient(-45deg, #6ad1c8, #6ad1c8 2px, #fff 2px, #fff 4px)",
          }}
        >
          {poll[0]?.name}
        </Box>
        <Box
          sx={{
            fontSize: "20px",
            textAlign: "center",
            mt: 5,
            backgroundColor: "white",
            fontWeight: "bold",
          }}
        >
          開催期間: {poll[0]?.startDate.toLocaleDateString()}〜{" "}
          {poll[0]?.endDate.toLocaleDateString()}
        </Box>
      </Box>
    </>
  );
};

export default PollTitle;
