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
import { ChangeEvent, FC, memo, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryInput } from "../input/Input";

type Props = {};

const Login: FC<Props> = memo((props) => {
  const [errorMail, setErrorMail] = useState<boolean>(false);
  const [errorPass, setErrorPass] = useState<boolean>(false);
  const [passText, setPassText] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [mailInput, setMailInput] = useState<string>("");
  const [passInput, setPassInput] = useState<string>("");

  const inputCheckSmall = /[a-z]/,
    inputCheckBig = /[A-Z]/,
    inputCheckNumber = /[0-9]/;

  //デフォルトfalse（全て含まれていない）
  const isValidPassword = (passInput: string) => {
    return (
      inputCheckSmall.test(passInput) &&
      inputCheckBig.test(passInput) &&
      inputCheckNumber.test(passInput)
    );
  };

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
          helperText={
            errorMail && mailInput === ""
              ? "メールアドレスを入力してください"
              : ""
          }
          error={errorMail && mailInput === "" ? errorMail : null}
          onBlur={mailBlur}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMailInput(e.target.value)
          }
        />
        <PrimaryInput
          type={showPassword ? "text" : "password"}
          label="パスワード"
          placeholder="パスワード"
          required
          helperText={
            errorPass
              ? passInput === ""
                ? "パスワードを入力してください"
                : errorPass &&
                  isValidPassword(passInput) &&
                  (passInput.length < 8 || passInput.length < 16)
                ? ""
                : "半角英字大文字、小文字、数字の3種類を1つ必ず使用"
              : null
          }
          error={errorPass}
          onFocus={passFocus}
          onBlur={passBlur}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassInput(e.target.value)
          }
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
                    passInput.length >= 8 && passInput.length <= 16 ? (
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
                    ) : (
                      <>
                        <CheckCircle
                          style={{
                            verticalAlign: "middle",
                            marginRight: "5px",
                          }}
                        />
                        8文字以上16文字以内
                      </>
                    )
                  }
                />
                <ListItemText
                  primary={
                    isValidPassword(passInput) ? (
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
                    ) : (
                      <>
                        <CheckCircle
                          style={{
                            verticalAlign: "middle",
                            marginRight: "5px",
                          }}
                        />
                        半角英字大文字、小文字、数字の3種類を1つ必ず使用
                      </>
                    )
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
