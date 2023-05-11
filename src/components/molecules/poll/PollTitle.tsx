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
          background: "#faf0e6",
          // p: 5,
          // pt:0.5,
          pb:1,
          // backgroundImage: "url(/coffee.png)",
          backgroundSize: 150,
          opacity: 0.8,
          mb: 5,
          mt: 4,
          // fontWeight: "bold",
        }}
      >
        <Box
          sx={{
            fontSize: "47px",
            textAlign: "center",
            mt: 1,
            backgroundColor: "white",
            py: 1,
            background:
              "-webkit-repeating-linear-gradient(-45deg, #fff, #d2691e 2px, #fff 2px, #fff 4px)",
          }}
        >
          {poll[0]?.name}
        </Box>
        <Box
          sx={{
            fontSize: "20px",
            textAlign: "center",
            mt: 1,
            // backgroundColor: "white",
            fontWeight: "bold",
            py: 1,
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
