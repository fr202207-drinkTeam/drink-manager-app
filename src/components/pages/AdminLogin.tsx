import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { FC, memo, useState } from "react";
import { PrimaryInput } from "../atoms/input/Input";

type Props = {};

const AdminLogin: FC<Props> = memo((props) => {
  const [errorMail, setErrorMail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [passText, setPassText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mailBlur = () => {
    setErrorMail(true);
  };

  const passBlur = () => {
    setErrorPass(true);
  };

  const passFocus = () => {
    setPassText(true);
  };

  return (
    <Container maxWidth="sm" sx={{ alignItems: "center", mt: "80px" }}>
      <Box>
        <h1 style={{ textAlign: "left" }}>管理者ログイン</h1>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <PrimaryInput
          type="text"
          label="メールアドレス"
          placeholder="例）example@example.com"
          helperText={errorMail ? "メールアドレスを入力してください" : ""}
          error={errorMail}
          onBlur={mailBlur}
        />
        <PrimaryInput
          type={showPassword ? "text" : "password"}
          label="パスワード"
          placeholder="パスワード"
          helperText={
            errorPass ? "パスワードを入力してください" : "" //半角英字大文字、小文字、数字を8文字以上16文字以内で入力してください
          }
          error={errorPass}
          onBlur={passBlur}
          onFocus={passFocus}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {passText ? (
          // <Box sx={{ textAlign: "left", listStyle: "none" }}>
          //   <ul>
          //     <li>✅8文字以上16文字以内</li>
          //     <li>✅半角英字大文字、小文字、数字の3種類を1つ必ず使用</li>
          //   </ul>
          // </Box>
          <List>
            <ListItem>
              <Stack>
                <ListItemText
                  primary={
                    <>
                      <CheckCircle
                        style={{
                          color: "green",
                          verticalAlign: "middle",
                          marginRight: "5px",
                        }}
                      />
                      8文字以上16文字以内
                    </>
                  }
                />
                <ListItemText
                  primary={
                    <>
                      <CheckCircle
                        style={{
                          color: "green",
                          verticalAlign: "middle",
                          marginRight: "5px",
                        }}
                      />
                      半角英字大文字、小文字、数字の3種類を1つ必ず使用
                    </>
                  }
                />
              </Stack>
            </ListItem>
          </List>
        ) : (
          ""
        )}
        <button>ログイン</button>
      </Box>
    </Container>
  );
});

export default AdminLogin;
