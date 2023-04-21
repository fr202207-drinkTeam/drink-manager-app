import { Paper, Box } from '@mui/material';
import { FC, memo } from 'react';

//icon
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import DottedMemo from "../memo/DottedMemo";

type Props = {};

const PollResult: FC<Props> = memo((props) => {
  return (
    <>
      <Paper>
        <Box
          sx={{
            background: '#fff9f5',
            p: 5,
            backgroundImage: "url(/iwai.png)",
            backgroundSize: "250px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            mt:5,
            mb: 5,
          }}
        >
          <Box
            sx={{
              fontFamily: 'cursive',
              fontSize: '40px',
              textAlign: 'center',
              mt: 10,
              backgroundColor: 'white',
              background:
                '-webkit-repeating-linear-gradient(-45deg, #6ad1c8, #6ad1c8 2px, #fff 2px, #fff 4px)',
            }}
          >
            3月度社内drink人気投票結果（仮）
          </Box>
          <Box
            sx={{
              fontFamily: 'cursive',
              fontSize: '20px',
              textAlign: 'center',
              mt: 5,
            }}
          >
            開催期間:4月15日〜5月15日まで
          </Box>
        </Box>
        <DottedMemo
          text={"たくさんのご投票ありがとうございました!!"}
          information={""}
          fontSize={"25px"}
          maxWidth={700}
          minWidth={500}
          margin={1}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Box
              sx={{
                mt: 10,
                pb: 10,
                backgroundImage: 'url(/crown1.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '70px',
                backgroundPosition: 'center',
              }}
            ></Box>
            <Box sx={{ fontSize: '30px', textAlign: 'center' }}>100票</Box>
            <Box
              sx={{
                mt: 10,
                pb: 10,
                backgroundImage: 'url(/crown1.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '70px',
                backgroundPosition: 'center',
              }}
            ></Box>
            <Box sx={{ fontSize: '30px', textAlign: 'center' }}>100票</Box>
            <Box
              sx={{
                mt: 10,
                pb: 10,
                backgroundImage: 'url(/crown1.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '70px',
                backgroundPosition: 'center',
              }}
            ></Box>
            <Box sx={{ fontSize: '30px', textAlign: 'center' }}>100票</Box>
          </Box>
        </Box>
        <Box>4位</Box>
        <Box>5位</Box>
        <Box>6位</Box>
      </Paper>
    </>
  );
});

export default PollResult;
