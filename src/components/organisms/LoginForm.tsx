import React, { FC } from "react";
import { Box, Container } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ActiveOrangeButton } from "../atoms/button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/loginUserState";
import EmailInput from "../atoms/login/EmailInput";
import PasswordInput from "../atoms/login/PasswordInput";

type Props = {
  loginTitle: string;
};

const LoginForm: FC<Props> = (props) => {
  const { loginTitle } = props;

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
  //Recoil
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

  const loginSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //firebaseでのログイン処理
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loginedUser = userCredential.user;

      // JSONサーバーからデータ取得
      const response = await fetch(
        `http://localhost:8880/users?email=${loginedUser.email}`
      );
      const user = await response.json();
      // Recoil
      setLoginUser(user[0]);
      //管理者判定しcookieセット、画面遷移
      if (
        currentLocation.startsWith("/adminlogin") &&
        loginedUser.uid === user[0].authId &&
        user[0].isAdmin === true
      ) {
        document.cookie = `authId=${loginedUser.uid}; max-age=3600`;
        document.cookie = `isAdmin=true; max-age=3600`;
        navigate("/adminhome");
      } else if (
        currentLocation.startsWith("/login") &&
        loginedUser.uid === user[0].authId &&
        user[0].isAdmin === false
      ) {
        document.cookie = `authId=${loginedUser.uid}; max-age=3600`;
        navigate("/home");
      } else {
        setErrorUser(true);
      }
    } catch (error) {
      setErrorUser(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ alignItems: "center", mt: "80px" }}>
      <Box sx={{ textAlign: "center" }}>
        <h1>{loginTitle}</h1>
        <p style={{ fontSize: "13px" }}>*は必須入力項目です</p>
      </Box>
      <Box component="form" onSubmit={loginSubmit} sx={{ textAlign: "center" }}>
        <EmailInput
          email={email}
          errorMail={errorMail}
          setEmail={setEmail}
          setErrorMail={setErrorMail}
          error={
            errorMail &&
            (email === "" || !email.includes("@") || email.length > 40)
              ? errorMail
              : null
          }
          onBlur={() => setErrorMail(true)}
        />
        <PasswordInput
          showPassword={showPassword}
          password={password}
          errorPass={errorPass}
          passText={passText}
          isValidPassword={isValidPassword}
          setPassText={setPassText}
          setErrorPass={setErrorPass}
          setPassword={setPassword}
          setShowPassword={setShowPassword}
        />
        {(() => {
          if (errorUser) {
            return (
              <p style={{ fontSize: "14px", color: "red" }}>
                ユーザーが存在しません
              </p>
            );
          } else {
            <></>;
          }
        })()}
        <ActiveOrangeButton
          children="ログイン"
          event={() => loginSubmit}
          type="submit"
          sxStyle={{ mt: "10px" }}
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
