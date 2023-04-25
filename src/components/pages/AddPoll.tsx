import { FC, memo } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import { Box, InputLabel, Paper, TextField } from "@mui/material";
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";

type Props = {};

const AddPoll: FC<Props> = memo((props) => {
  return (
    <>
    <Paper sx={{p:2}}>
    <AdmTitleText children={"投票追加"}/>
    <SecondaryInput
          type="text"
          label="投票タイトル"
          placeHolder="投票タイトル"
          required
          />
    <PrimaryInput
          type="text"
          label="投票詳細"
          placeHolder="投票詳細"
          required
          />
              <Box>
          <InputLabel id="brand-label"  sx={{mt:2,fontWeight:"bold"}}>期間</InputLabel>
            <TextField
              type="date"
              variant="standard"
              sx={{ width: "200px", mb: 5 }}
            />
            <span
              style={{
                fontSize: "1.5rem",
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              〜
            </span>
            <TextField
              type="date"
              variant="standard"
              sx={{ width: "200px", mb: 5 }}
            />
          </Box>
    </Paper>
    </>
  );
});

export default AddPoll;