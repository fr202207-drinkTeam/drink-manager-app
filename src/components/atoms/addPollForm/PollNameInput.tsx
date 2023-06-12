import { Box } from "@mui/material";
import React, { FC } from "react";
import { SecondaryInput } from "../input/Input";

type ValidarionProps = {
  pollName: string;
  setPollName:React.Dispatch<React.SetStateAction<string>>;
  pollNameError:string;
  setPollNameError: React.Dispatch<React.SetStateAction<string>>;
};

const PollNameInput: FC<ValidarionProps> = ({
  pollName,
  setPollName,
  pollNameError,
  setPollNameError
}) => {

  return (
    <Box>
      <Box sx={{ mt: 3 }}>
        {pollNameError && (
          <Box style={{ color: "red", fontSize: 15, marginBottom: 1 }}>
            {pollNameError}
          </Box>
        )}
        <SecondaryInput
          type="text"
          label="投票タイトル"
          helperText={`${pollName.length}/15`}
          placeholder="投票タイトル"
          inputProps={{ maxLength: 15 }}
          onChange={(e: any) => {
            setPollName(e.target.value);
          }}
          required
        />
      </Box>
    </Box>
  );
};

export default PollNameInput;
