import {
  Paper,
  Typography,
  Input,
  Stack,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { FC, memo, useState } from "react";
import { InactiveButton, PrimaryButton } from "../atoms/button/Button";
import ModalWindow from "../organisms/ModalWindow";
import { useNavigate } from "react-router-dom";
import { PrimaryInput } from "../atoms/input/Input";

type Props = {};

const Contact: FC<Props> = memo((props) => {
  const [contentErr, setContentErr] = useState<boolean>(false)
  const [contactCategory, setContactCategory] = useState<number>(0);
  const [contactContents, setContactContents] = useState<string>("");

  const navigate = useNavigate();

  // const handleInquiryTypeChange = (event: any) => {
  //   setInquiryType(event.target.value as string);
  // };

  const onClickSubmit = () => {
    navigate("/home");
  };

  return (
    <Paper
      sx={{
        padding: "50px 100px",
      }}
    >
      <Box id="top" />
      <Box>
        <Typography
          variant="h3"
          borderBottom="1px solid"
          gutterBottom
          sx={{ mb: "100px" }}
        >
          お問い合わせ
        </Typography>
        <Box sx={{ mb: "30px" }}>
          <FormControl variant="standard" error={contactCategory === 0}>
            <InputLabel id="itemCategoryField" required>
              お問い合わせ種別
            </InputLabel>
            <Select
              labelId="contactCategoryField"
              id="contactCategoryField"
              value={contactCategory}
              label="お問い合わせ種別"
              onChange={(e) => {
                setContactCategory(Number(e.target.value));
              }}
            >
              <MenuItem value={0}>お問い合わせ種別を選択</MenuItem>
              <MenuItem value={1}>システムについてのお問い合わせ</MenuItem>
              <MenuItem value={2}>サービスについてのお問い合わせ</MenuItem>
              <MenuItem value={3}>
                コーヒーサーバについてのお問い合わせ
              </MenuItem>
              <MenuItem value={4}>その他</MenuItem>
            </Select>
            {contactCategory === 0 && (
              <FormHelperText>お問い合わせ種別を選択して下さい</FormHelperText>
            )}
          </FormControl>
        </Box>
        <PrimaryInput
          multiline
          aria-label="contactContents"
          label="お問い合わせ内容"
          sx={{ width: "100%", mb: "60px" }}
          value={contactContents}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContactContents(e.target.value)
          }
          rows={5}
          helperText={
            contentErr && contactContents === "" && "お問い合わせ内容を入力して下さい"
          }
          error={contentErr && contactContents === ""}
          onBlur={() => setContentErr(true)}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mb: "60px" }}>
          {contactCategory === 0 ? (
            <InactiveButton
              sxStyle={{
                px: 7,
                py: 2,
                borderRadius: "15px",
                marginTop: "32px",
                textAlign: "center",
              }}
            >
              送信
            </InactiveButton>
          ) : (
            <ModalWindow
              title="送信します、よろしいですか？"
              content={""}
              openButtonColor="blue"
              buttonName="送信"
              completeButtonColor={"blue"}
              completeButtonName={`はい`}
              completeAction={onClickSubmit}
              cancelButtonColor={"red"}
              openButtonSxStyle={{
                px: 7,
                py: 2,
                borderRadius: "15px",
                marginTop: "32px",
                textAlign: "center",
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
});

export default Contact;
