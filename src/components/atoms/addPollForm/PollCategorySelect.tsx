import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";

type PollCategorySelectProps = {
  pollCategory: string;
  setPollCategory: React.Dispatch<React.SetStateAction<string>>;
  categoryError:string;
  setCategoryError: React.Dispatch<React.SetStateAction<string>>;
};

const PollCategorySelect: FC<PollCategorySelectProps> = ({
  pollCategory,
  categoryError,
  setPollCategory,
  setCategoryError,
}) => {
  return( 
  <Box>
     {categoryError && (
            <Box sx={{ color: "red", fontSize: 15, pt: 2 }}>
              {categoryError}
            </Box>
          )}
          <Select
            onChange={(e: SelectChangeEvent) => setPollCategory(e.target.value)}
            value={pollCategory}
            sx={{ my: 2, backgroundColor: "#fffffc" }}
            required
          >
            <MenuItem value="投票種別を選択してください">
              投票種別を選択してください
            </MenuItem>
            <MenuItem value="1">人気投票</MenuItem>
            <MenuItem value="2">その他</MenuItem>
          </Select>
        </Box>
  );
};

export default PollCategorySelect;
