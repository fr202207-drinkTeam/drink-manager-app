import { Box } from "@mui/material";
import React from "react";
import { Polls } from "../../types/type";

type PollTitleProps = {
  poll: Polls[];
};

const PollTitle = ({ poll }: PollTitleProps) => {
  return (
    <>
      {poll.map((data) => (
        <Box
          sx={{
            background: "#fff9f5",
            p: 5,
            backgroundImage: "url(/coffee.png)",
            backgroundSize: 100,
            opacity: 0.8,
            mb: 5,
          }}
        >
          <Box
            sx={{
              fontSize: "40px",
              textAlign: "center",
              fontFamily: "cursive",
              mt: 10,
              backgroundColor: "white",
              background:
                "-webkit-repeating-linear-gradient(-45deg, #6ad1c8, #6ad1c8 2px, #fff 2px, #fff 4px)",
            }}
          >
            {data.name}
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
            開催期間:{" "}
            {data.startDate.toLocaleDateString()}
            〜{" "}
            {data.endDate.toLocaleDateString()}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default PollTitle;
