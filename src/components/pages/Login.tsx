import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import { CheckCircle } from "@mui/icons-material";
import { FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryInput } from "../input/Input";

type Props = {};

const Login: FC<Props> = memo((props) => {
  const [errorMail, setErrorMail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [passText, setPassText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mailBlur = () => {
    setErrorMail(true);
  };

  const passFocus = () => {
    setPassText(true);
  };

  const passBlur = () => {
    setErrorPass(true);
  };
  return (
    <Container maxWidth="sm" sx={{ alignItems: "center", mt: "80px" }}>
      <Box>
        <h1>ログイン</h1>
      </Box>
      <Box component="form" sx={{ textAlign: "center" }}>
        <PrimaryInput
          type="text"
          label="メールアドレス"
          placeholder="例）example@example.com"
          helperText={errorMail ? "メールアドレスを入力してください" : ""}
          error={errorMail}
          onBlur={mailBlur}
          InputProps={{
            readOnly: true,
          }}
        />
        <PrimaryInput
          type={showPassword ? "text" : "password"}
          label="パスワード"
          placeHolder="パスワード"
          required
          helperText={
            errorPass ? "パスワードを入力してください" : "" //半角英字大文字、小文字、数字を8文字以上16文字以内で入力してください
          }
          error={errorPass}
          onFocus={passFocus}
          onBlur={passBlur}
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
        <Box
          sx={{
            margin: "10px",
            ":hover": { opacity: "0.8" },
            fontSize: "14px",
          }}
        >
          <Link to="/register" style={{ textDecoration: "none" }}>
            会員登録はこちら
          </Link>
        </Box>
      </Box>
    </Container>
  );
});

export default Login;
