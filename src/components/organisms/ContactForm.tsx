import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { Dispatch, FC, SetStateAction, memo, useState } from "react";
import { PrimaryInput } from "../atoms/input/Input";

type Props = {
    setContactCategory: Dispatch<SetStateAction<string>>;
    contactCategory: string;
    setContactContents: Dispatch<SetStateAction<string>>;
    contactContents: string;
};

const PollDescriptionInput: FC<Props> = memo((props) => {
    const [contentErr, setContentErr] = useState<boolean>(false);
    const [categoryErr, setCategoryErr] = useState<boolean>(false);
  
  return (
    <>
      <Box sx={{ mb: "30px" }}>
        <FormControl
          variant="standard"
          error={categoryErr && props.contactCategory === "default"}
        >
          <InputLabel id="itemCategoryField" required>
            お問い合わせ種別
          </InputLabel>
          <Select
            labelId="contactCategoryField"
            id="contactCategoryField"
            value={props.contactCategory}
            label="お問い合わせ種別"
            onChange={(e) => {
              props.setContactCategory(e.target.value);
            }}
            onBlur={() => setCategoryErr(true)}
          >
            <MenuItem value="default">お問い合わせ種別を選択</MenuItem>
            <MenuItem value="system">システムについてのお問い合わせ</MenuItem>
            <MenuItem value="service">サービスについてのお問い合わせ</MenuItem>
            <MenuItem value="server">
              コーヒーサーバについてのお問い合わせ
            </MenuItem>
            <MenuItem value="other">その他</MenuItem>
          </Select>
          {categoryErr && props.contactCategory === "default" && (
            <FormHelperText>お問い合わせ種別を選択して下さい</FormHelperText>
          )}
        </FormControl>
      </Box>
      <PrimaryInput
        multiline
        aria-label="contactContents"
        label="お問い合わせ内容"
        sx={{ width: "100%", mb: "60px" }}
        value={props.contactContents}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setContactContents(e.target.value);
        }}
        rows={5}
        helperText={
          contentErr &&
          props.contactContents === "" &&
          "お問い合わせ内容を入力して下さい"
        }
        error={contentErr && props.contactContents === ""}
        onBlur={() => setContentErr(true)}
      />
    </>
  );
});

export default PollDescriptionInput;
