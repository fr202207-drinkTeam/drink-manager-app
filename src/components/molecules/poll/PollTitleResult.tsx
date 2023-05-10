import { Box } from "@mui/material";
import React from "react";
import { Questionnaire } from "../../../types/type";
import DottedMemo from "../../atoms/memo/DottedMemo";

type PollTitleProps = {
  poll: Questionnaire[];
};

const PollTitle = ({ poll }: PollTitleProps) => {

  return (
    <>
      {poll.map((data, index) => (
        <Box
          sx={{
            background: "#fff9f5",
            p: 5,
            backgroundImage: "url(/iwai.png)",
            backgroundSize: "250px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            mt: 5,
            mb: 5,
          }}
        >
          <Box
            sx={{
              fontFamily: "cursive",
              fontSize: "40px",
              textAlign: "center",
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
              fontFamily: "cursive",
              fontSize: "20px",
              textAlign: "center",
              mt: 5,
            }}
          >
            開催期間:{" "}{data.startDate.toLocaleDateString()}〜{" "}
            {data.endDate.toLocaleDateString()}
          </Box>
        </Box>
      ))}
      <DottedMemo
        text={"たくさんのご投票ありがとうございました!!"}
        information={""}
        fontSize={"25px"}
        maxWidth={700}
        minWidth={500}
        margin={1}
      />
    </>
  );
};

export default PollTitle;
