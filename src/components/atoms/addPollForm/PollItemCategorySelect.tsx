import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";
import { ActiveBlueButton, ActiveDarkBlueButton } from "../button/Button";

type PollCategorySelectProps = {
  pollItemCategory: string;
  setPollItemCategory: React.Dispatch<React.SetStateAction<string>>;
  categoryItemError:string;
  setCategoryItemError: React.Dispatch<React.SetStateAction<string>>;
};

const PollItemCategorySelect: FC<PollCategorySelectProps> = ({
  pollItemCategory,
  categoryItemError,
  setPollItemCategory,
}) => {
  return( 
  <Box sx={{display:"flex",justifyContent: "flex-end",alignItems:"center",px:1}}>
    <Box>

     {categoryItemError && (
            <Box sx={{ color: "red", fontSize: 15, pt: 2 }}>
              {categoryItemError}
            </Box>
          )}
          <Select
            onChange={(e: SelectChangeEvent) => setPollItemCategory(e.target.value)}
            value={pollItemCategory}
            sx={{ my: 2, backgroundColor: "#fffffc",width: {
              xs: "100%",height:"45px"}, }}
            required
          >
            <MenuItem value="商品検索">
              商品検索
            </MenuItem>
            <MenuItem value="1">コーヒー</MenuItem>
            <MenuItem value="2">ティー</MenuItem>
            <MenuItem value="3">ココア</MenuItem>
            <MenuItem value="4">お菓子</MenuItem>
            <MenuItem value="5">その他</MenuItem>
            <MenuItem value="6">すべて</MenuItem>
          </Select>
    </Box>
    <Box sx={{ml:2}}>
      <ActiveDarkBlueButton event={function (): void {
          throw new Error("Function not implemented.");
        } }>検索リセット</ActiveDarkBlueButton>
    </Box>

        </Box>
  );
};

export default PollItemCategorySelect;
