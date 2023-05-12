import { ChangeEvent, FC, memo, useState } from "react";
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
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";
import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { ActiveOrangeButton } from "../atoms/button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/loginUserState";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";

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

  //メールアドレスの入力チェック
  const emailRegex = /^[^\s@]+@rakus-partners\.co\.jp$/;
  const isValidEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const onBlur = (e: ChangeEvent<HTMLFormElement>) => {
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
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        authId: authId,
        isAdmin: false,
      };
      //JSONServerに登録
      const response = await fetch(
        `http://localhost:8880/users?authId=${authId}`
      );
      const registeredUser = await response.json();
      if (registeredUser.length < 1) {
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        const user = await fetch("http://localhost:8880/users", request).then(
          (res) => res.json()
        );
        setLoginUser(user); //Recoil
        document.cookie = `authId=${authId}; max-age=86400`;
        navigate("/home");
      } else {
        setErrorFraudEmail("メールアドレスが既に存在しています");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorFraudEmail("メールアドレスが既に存在しています");
      } else {
        setErrorFraudEmail("未知のエラーです");
      }
    }
  };
  const authId = Cookies.get("authId")!;
  const loginUsers = useLoginUserFetch({ authId: authId });
  if (!loginUser) {
    return <div>Loading...</div>;
  }
  console.log(loginUsers, 111);

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
        <SecondaryInput
          name="userId"
          type="text"
          label="社員ID*"
          placeholder="例）0000"
          helperText={(() => {
            if (errorId && userId === "") {
              return "社員IDを入力してください";
            }
          })()}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
          error={errorId && userId === ""}
          onBlur={onBlur}
        />
        <Stack direction="row" sx={{ alignItems: "flex-end" }} spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <SecondaryInput
              name="firstName"
              type="text"
              label="姓"
              required
              placeholder="例）ラクス"
              helperText={(() => {
                if (errorFirstName && firstName === "") {
                  return "姓を入力してください";
                }
                if (
                  (!errorFirstName && errorLastName && lastName === "") ||
                  (errorFirstName &&
                    errorLastName &&
                    lastName === "" &&
                    firstName !== "")
                ) {
                  return " ";
                }
              })()}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
              error={errorFirstName && firstName === ""}
              onBlur={onBlur}
              style={{ height: "100%" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <SecondaryInput
              name="lastName"
              type="text"
              label="名"
              required
              placeholder="例）太郎"
              helperText={(() => {
                if (errorLastName && lastName === "") {
                  return "名を入力してください";
                }
                if (
                  (!errorLastName && errorFirstName && firstName === "") ||
                  (errorLastName &&
                    errorFirstName &&
                    firstName === "" &&
                    lastName !== "")
                ) {
                  return " ";
                }
              })()}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              error={errorLastName && lastName === ""}
              onBlur={onBlur}
              style={{ height: "100%" }}
            />
          </Box>
        </Stack>
        <PrimaryInput
          name="email"
          type="email"
          label="メールアドレス"
          required
          placeholder="例）example@example.com"
          helperText={(() => {
            if (errorMail && email === "") {
              return "メールアドレスを入力してください";
            }
            if (
              // (errorMail && !email.includes("@")) ||
              // email.length > 40
              (errorMail && !isValidEmail(email)) ||
              email.length > 40
            ) {
              // return "＠を含んだ40文字以内で入力してください";
              return "40文字以内かつ指定のドメインで入力してください";
            }
          })()}
          error={
            errorMail &&
            // (email === "" || !email.includes("@") || email.length > 40)
            (email === "" || !isValidEmail(email) || email.length > 40)
              ? errorMail
              : null
          }
          onBlur={onBlur}
          onFocus={() => setEmailText(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        {(() => {
          if (emailText) {
            return (
              <List>
                <ListItem>
                  <ListItemText
                    primary={(() => {
                      if (isValidEmail(email)) {
                        return (
                          <>
                            <CheckCircle
                              style={{
                                color: "green",
                                verticalAlign: "middle",
                                marginRight: "5px",
                              }}
                            />
                            @rakus-partners.co.jpの固定ドメイン
                          </>
                        );
                      } else {
                        return (
                          <>
                            <CheckCircle
                              style={{
                                verticalAlign: "middle",
                                marginRight: "5px",
                              }}
                            />
                            @rakus-partners.co.jpの固定ドメイン
                          </>
                        );
                      }
                    })()}
                  />
                </ListItem>
              </List>
            );
          } else {
            return "";
          }
        })()}
        <PrimaryInput
          name="password"
          type={(() => {
            if (showPassword) {
              return "text";
            } else {
              return "password";
            }
          })()}
          label="パスワード"
          required
          placeholder="パスワード"
          helperText={(() => {
            if (errorPass && password === "") {
              return "パスワードを入力してください";
            }
            if (
              errorPass &&
              (!isValidPassword(password) ||
                password.length < 8 ||
                password.length > 16)
            ) {
              return "半角英字大文字、小文字、数字の3種類を1つ必ず使用し8文字以上16文字以内";
            }
          })()}
          error={
            errorPass && (password === "" || !isValidPassword(password))
              ? errorPass
              : null
          }
          onFocus={() => setPassText(true)}
          onBlur={onBlur}
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
        {(() => {
          if (passText) {
            return (
              <List>
                <ListItem>
                  <Stack>
                    <ListItemText
                      primary={(() => {
                        if (password.length >= 8 && password.length <= 16) {
                          return (
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
                          );
                        } else {
                          return (
                            <>
                              <CheckCircle
                                style={{
                                  verticalAlign: "middle",
                                  marginRight: "5px",
                                }}
                              />
                              8文字以上16文字以内
                            </>
                          );
                        }
                      })()}
                    />
                    <ListItemText
                      primary={(() => {
                        if (isValidPassword(password)) {
                          return (
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
                          );
                        } else {
                          return (
                            <>
                              <CheckCircle
                                style={{
                                  verticalAlign: "middle",
                                  marginRight: "5px",
                                }}
                              />
                              半角英字大文字、小文字、数字の3種類を1つ必ず使用
                            </>
                          );
                        }
                      })()}
                    />
                  </Stack>
                </ListItem>
              </List>
            );
          } else {
            return "";
          }
        })()}
        <PrimaryInput
          name="confirmPassword"
          type={(() => {
            if (showConfirmPassword) {
              return "text";
            } else {
              return "password";
            }
          })()}
          label="確認用パスワード"
          required
          placeholder="確認用パスワード"
          helperText={(() => {
            if (errorConfirmPass && confirmPassword === "") {
              return "確認用パスワードを入力してください";
            }
            if (errorConfirmPass && password !== confirmPassword) {
              return "パスワードと確認用パスワードが一致しません";
            }
          })()}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          error={
            errorConfirmPass &&
            (confirmPassword === "" || password !== confirmPassword)
          }
          onBlur={onBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfimPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
              // !email.includes("@") ||
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
