import React, { useEffect } from "react";
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
import { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PrimaryInput } from "../atoms/input/Input";
import { ActiveOrangeButton } from "../atoms/button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/loginUserState";

const LoginForm = ({ loginTitle }: any) => {
  const [errorMail, setErrorMail] = useState<boolean>(false);
  const [errorPass, setErrorPass] = useState<boolean>(false);
  const [passText, setPassText] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorUser, setErrorUser] = useState<boolean>(false);

  //入力フォーム
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const location = useLocation();
  const currentLocation = location.pathname;
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  //パスワードの入力形式チェック
  const inputCheckSmall = /[a-z]/,
    inputCheckBig = /[A-Z]/,
    inputCheckNumber = /[0-9]/;

  //デフォルトfalse（全て含まれていない）
  const isValidPassword = (password: string) => {
    return (
      inputCheckSmall.test(password) &&
      inputCheckBig.test(password) &&
      inputCheckNumber.test(password)
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

  const loginSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //firebaseでのログイン処理
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loginUser = userCredential.user;

      // JSONサーバーからデータ取得
      const response = await fetch(
        `http://localhost:8880/users?email=${loginUser.email}`
      );
      const user = await response.json();
      //Recoil
      setLoginUser(user[0]);
      if (user[0].isAdmin === false) {
        navigate("/home");
      } else {
        navigate("/adminhome");
      }
    } catch (error) {
      setErrorUser(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      onSubmit={loginSubmit}
      sx={{ alignItems: "center", mt: "80px" }}
    >
      <Box>
        <h1>{loginTitle}</h1>
      </Box>
      <Box component="form" sx={{ textAlign: "center" }}>
        <PrimaryInput
          type="email"
          label="メールアドレス"
          placeholder="例）example@example.com"
          helperText={
            errorMail
              ? email === ""
                ? "メールアドレスを入力してください"
                : errorMail && (!email.includes("@") || email.length > 40)
                ? "＠を含んだ40文字以内で入力してください"
                : ""
              : null
          }
          error={
            errorMail &&
            (email === "" || !email.includes("@") || email.length > 40)
              ? errorMail
              : null
          }
          onBlur={mailBlur}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <PrimaryInput
          type={showPassword ? "text" : "password"}
          label="パスワード"
          placeholder="パスワード"
          helperText={
            errorPass
              ? password === ""
                ? "パスワードを入力してください"
                : errorPass &&
                  isValidPassword(password) &&
                  (password.length < 8 || password.length < 16)
                ? ""
                : "半角英字大文字、小文字、数字の3種類を1つ必ず使用し8文字以上16文字以内"
              : null
          }
          error={
            errorPass && (password === "" || !isValidPassword(password))
              ? errorPass
              : null
          }
          onFocus={passFocus}
          onBlur={passBlur}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
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
                    password.length >= 8 && password.length <= 16 ? (
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
                    isValidPassword(password) ? (
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
        {errorUser ? (
          <p style={{ fontSize: "14px", color: "red" }}>
            ユーザーが存在しません
          </p>
        ) : (
          <></>
        )}
        <ActiveOrangeButton
          children="ログイン"
          event={() => console.log("a")}
          type="submit"
          disabled={
            password === "" ||
            email === "" ||
            !isValidPassword(password) ||
            !email.includes("@") ||
            email.length > 40 ||
            password.length < 8 ||
            password.length > 16
          }
        />
        <Box
          sx={{
            margin: "10px",
            ":hover": { opacity: "0.8" },
            fontSize: "14px",
          }}
        >
          {currentLocation.startsWith("/login") ? (
            <Link to="/register" style={{ textDecoration: "none" }}>
              会員登録はこちら
            </Link>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
