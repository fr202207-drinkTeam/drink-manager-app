import { Box } from "@mui/material";
import { Questionnaire } from "../../../types/type";

type PollTitleProps = {
  poll: Questionnaire;
};

const PollTitleResult = ({ poll }: PollTitleProps) => {
  const startData = new Date(poll?.startDate).toLocaleDateString()
  const endData = new Date(poll?.endDate).toLocaleDateString()

  return (
    <>
      {poll?.id?
      <Box
      sx={{
        background: "#fff9f5",
        backgroundImage:{
          xs: "",
          sm: "",
          md: "url(/iwai.png)",
          lg: "url(/iwai.png)",
          xl: "url(/iwai.png)"
        },
        backgroundSize: {
          xs: "0",
          sm: "0",
          md: "60px",
          lg: "100px",
          xl: "100px"
        },
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left 20px center",
        py: [4, 5], 
        mb: 5,
      }}
    >
      <Box
        sx={{
          fontSize:  {
            xs: "13px",
            sm: "23px",
            md: "25px",
            lg: "30px",
            xl: "40px"
          },
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: 2,
        }}
      >
        {poll?.name}&nbsp;投票結果
      </Box>
    
      <Box
        sx={{
          fontSize:  {
            xs: "8px",
            sm: "15px",
            md: "15px",
            lg: "15px",
            xl: "20px"
          },
          textAlign: "center",
          mt: 3,
          letterSpacing: 5,
        }}
      >
        開催期間: {startData}&nbsp;〜&nbsp;{endData}
      </Box>
        </Box> : <></>}
    </>
  );
};

export default PollTitleResult;
