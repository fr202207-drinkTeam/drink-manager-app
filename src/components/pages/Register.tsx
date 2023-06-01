import { ChangeEvent, FC, memo, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import { ActiveOrangeButton } from "../atoms/button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/loginUserState";
import PasswordInput from "../atoms/login/PasswordInput";
import UserIdInput from "../atoms/login/UserIdInput";
import FirstNameInput from "../atoms/login/FirstNameInput";
import LastNameInput from "../atoms/login/LastNameInput";
import ConfirmPasswordInput from "../atoms/login/ConfirmPasswordInput";
import EmailInput from "../atoms/login/EmailInput";

type Props = {};

const Register: FC<Props> = memo((props) => {
  const navigate = useNavigate();

  const [passText, setPassText] = useState<boolean>(false);
  const [emailText, setEmailText] = useState<boolean>(false);
  const [errorId, setErrorId] = useState<boolean>(false);
  const [errorFirstName, setErrorFirstName] = useState<boolean>(false);
  const [errorLastName, setErrorLastName] = useState<boolean>(false);
  const [errorMail, setErrorMail] = useState<boolean>(false);
  const [errorPass, setErrorPass] = useState<boolean>(false);
  const [errorConfirmPass, setErrorConfirmPass] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfimPassword] = useState<boolean>(false);
  const [errorFraudEmail, setErrorFraudEmail] = useState<string>("");

  //入力フォーム
  const [userId, setUserId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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

  //社員IDの入力形式チェック
  const isValidUserId = (userId: string) => {
    return inputCheckNumber.test(userId);
  };

  //メールアドレスの入力チェック
  const emailRegex = new RegExp(
    `^[^\\s@]+@${process.env.REACT_APP_EMAIL}\\.co\\.jp$`
  );
  const isValidEmail = (email: string) => {
    return emailRegex.test(email);
  };

  //フォーカスを外した時のイベント
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;

    if (name === "userId") {
      setErrorId(true);
    }
    if (name === "firstName") {
      setErrorFirstName(true);
    }
    if (name === "lastName") {
      setErrorLastName(true);
    }
    if (name === "email") {
      setErrorMail(true);
    }
    if (name === "password") {
      setErrorPass(true);
    }
    if (name === "confirmPassword") {
      setErrorConfirmPass(true);
    }
  };

  //会員登録処理
  const handleRegister = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // firebaseでの登録
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const authId = userCredential.user.uid;
      const data = {
        userId: Number(userId),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        authId: authId,
        isAdmin: false,
      };
      //JSONServerに登録
      const response = await fetch(
        `http://localhost:8880/users?authId=${authId}`
      );
      const registeredUser = await response.json();
      //db.jsonに重複がない場合登録する
      if (registeredUser.length < 1) {
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const user = await fetch(
          "http://localhost:8880/users",
          request
        ).then((res) => res.json());
        setLoginUser(user); //Recoil
        document.cookie = `authId=${authId}; max-age=3600`;
        navigate("/home");
      } else {
        setErrorFraudEmail("メールアドレスが既に存在しています");
      }
    } catch (error) {
      setErrorFraudEmail("メールアドレスが既に存在しています");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ alignItems: "center" }}>
      <Box sx={{ textAlign: "center" }}>
        <h1>会員登録</h1>
        <p style={{ fontSize: "13px" }}>*は必須入力項目です</p>
      </Box>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{ alignItems: "center" }}
      >
        <UserIdInput
          userId={userId}
          errorId={errorId}
          isValidUserId={isValidUserId}
          setUserId={setUserId}
          onBlur={onBlur}
        />
        <Stack direction="row" sx={{ alignItems: "flex-end" }} spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <FirstNameInput
              firstName={firstName}
              errorFirstName={errorFirstName}
              setFirstName={setFirstName}
              lastName={lastName}
              errorLastName={errorLastName}
              onBlur={onBlur}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <LastNameInput
              lastName={lastName}
              errorLastName={errorLastName}
              setLastName={setLastName}
              firstName={firstName}
              errorFirstName={errorFirstName}
              onBlur={onBlur}
            />
          </Box>
        </Stack>
        <EmailInput
          email={email}
          errorMail={errorMail}
          emailText={emailText}
          setEmail={setEmail}
          setErrorMail={setErrorMail}
          isValidEmail={isValidEmail}
          error={
            errorMail &&
            (email === "" || !isValidEmail(email) || email.length > 40)
              ? errorMail
              : null
          }
          onFocus={() => setEmailText(true)}
          onBlur={onBlur}
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
        <ConfirmPasswordInput
          confirmPassword={confirmPassword}
          errorConfirmPass={errorConfirmPass}
          showConfirmPassword={showConfirmPassword}
          setConfirmPassword={setConfirmPassword}
          setShowConfimPassword={setShowConfimPassword}
          password={password}
          onBlur={onBlur}
        />
        <p style={{ fontSize: "14px", color: "red", textAlign: "center" }}>
          {errorFraudEmail}
        </p>
        <Box sx={{ textAlign: "center", m: "10px" }}>
          <ActiveOrangeButton
            children="登録"
            event={() => handleRegister}
            type="submit"
            disabled={
              userId === "" ||
              firstName === "" ||
              lastName === "" ||
              email === "" ||
              !isValidPassword(password) ||
              !isValidEmail(email) ||
              email.length > 40 ||
              password.length < 8 ||
              password.length > 16 ||
              password !== confirmPassword
            }
          />
        </Box>
      </Box>
    </Container>
  );
});

export default Register;
