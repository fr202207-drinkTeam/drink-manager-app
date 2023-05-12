import { Box } from "@mui/material";
import { Questionnaire } from "../../../types/type";

type PollTitleProps = {
  poll: Questionnaire|undefined;
};

const PollTitleResult = ({ poll }: PollTitleProps) => {

  return (
    <>
      <Box
          sx={{
            background: "#fff9f5",
            backgroundImage: "url(/iwai.png)",
            backgroundSize: "110px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left ",
            py:5,
            mb: 5,
          }}
        >
          <Box
            sx={{
              fontSize: "40px",
              textAlign: "center",
              fontWeight: "bold",
              letterSpacing:5,
            }}
          >
            {poll?.name}&nbsp;投票結果
          </Box>

          <Box
            sx={{
              fontSize: "20px",
              textAlign: "center",
              fontWeight: "bold",
              mt: 3,
              letterSpacing:5,
            }}
          >
            開催期間: {poll?.startDate.toLocaleString()}&nbsp;〜&nbsp;
            {poll?.endDate.toLocaleString()}
          </Box>
        </Box>
    </>
  );
};

export default PollTitleResult;
