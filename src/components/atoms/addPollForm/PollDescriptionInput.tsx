import { Box } from "@mui/material";
import React, { FC } from "react";
import { PrimaryInput } from "../input/Input";

type PollDescriptionInputProps = {
  pollDescription: string;
  setPollDescription: React.Dispatch<React.SetStateAction<string>>;
  descriptionError: string;
  setDescriptionError: React.Dispatch<React.SetStateAction<string>>;
};

const PollDescriptionInput: FC<PollDescriptionInputProps> = ({
  pollDescription,
  setDescriptionError,
  setPollDescription,
  descriptionError,
}) => {
  return (
    <Box>
      {descriptionError && (
        <Box style={{ color: "red", fontSize: 15 }}>{descriptionError}</Box>
      )}
      <PrimaryInput
        type="text"
        label="投票詳細"
        helperText={`${pollDescription.length}/31`}
        inputProps={{ maxLength: 31 }}
        placeholder="投票詳細"
        onChange={(e: any) => {
          setPollDescription(e.target.value);
        }}
        required
      />
    </Box>
  );
};

export default PollDescriptionInput;
