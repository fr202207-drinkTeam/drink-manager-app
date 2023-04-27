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

type Props = {};

const Register: FC<Props> = memo((props) => {
  const navigate = useNavigate();

  const [passText, setPassText] = useState<boolean>(false);
  const [errorId, setErrorId] = useState<boolean>(false);
  const [errorFirstName, setErrorFirstName] = useState<boolean>(false);
  const [errorLastName, setErrorLastName] = useState<boolean>(false);
  const [errorMail, setErrorMail] = useState<boolean>(false);
  const [errorPass, setErrorPass] = useState<boolean>(false);
  const [errorConfirmPass, setErrorConfirmPass] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfimPassword] = useState<boolean>(false);

  //入力フォーム
  const [userId, setUserId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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

  const onBlur = (e: ChangeEvent<HTMLFormElement>) => {
    const name = e.target.name;

    if (name === "userId") {
      setErrorId(true);
    } else if (name === "firstName") {
      setErrorFirstName(true);
    } else if (name === "lastName") {
      setErrorLastName(true);
    } else if (name === "email") {
      setErrorMail(true);
    } else if (name === "password") {
      setErrorPass(true);
    } else if (name === "confirmPassword") {
      setErrorConfirmPass(true);
    }
  };

  //会員登録処理
  const handleRegister = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //firebaseでの登録
      const authId = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => userCredential.user.uid);
      const data = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        authId: authId,
        isAdmin: false,
        polledPopular: false,
        polledOther: false,
      };
      //JSONServerに登録
      const response = await fetch(
        `http://localhost:8880/users?email=${email}`
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
        await fetch("http://localhost:8880/users", request).then((res) =>
          res.json()
        );
        document.cookie = `authId=${authId}; max-age=86400`;
        navigate("/home");
      } else {
        alert("すでにユーザーが存在しています");
      }
    } catch (error) {
      alert("失敗しました");
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
        <SecondaryInput
          name="userId"
          type="text"
          label="社員ID*"
          placeholder="例）0000"
          helperText={(() => {
            if (errorId) {
              if (userId === "") {
                return "社員IDを入力してください";
              } else {
                return "";
              }
            } else {
              return null;
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
              placeholder="例）*"
              helperText={(() => {
                if (errorFirstName) {
                  if (firstName === "") {
                    return "姓を入力してください";
                  } else {
                    return "";
                  }
                } else {
                  return null;
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
                if (errorLastName) {
                  if (lastName === "") {
                    return "名を入力してください";
                  } else {
                    return "";
                  }
                } else {
                  return null;
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
            if (errorMail) {
              if (email === "") {
                return "メールアドレスを入力してください";
              } else if (
                errorMail &&
                (!email.includes("@") || email.length > 40)
              ) {
                return "＠を含んだ40文字以内で入力してください";
              } else {
                return "";
              }
            } else {
              return null;
            }
          })()}
          error={
            errorMail &&
            (email === "" || !email.includes("@") || email.length > 40)
              ? errorMail
              : null
          }
          onBlur={onBlur}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
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
            if (errorPass) {
              if (password === "") {
                return "パスワードを入力してください";
              } else if (
                errorPass &&
                isValidPassword(password) &&
                (password.length < 8 || password.length < 16)
              ) {
                return "";
              } else {
                return "半角英字大文字、小文字、数字の3種類を1つ必ず使用し8文字以上16文字以内";
              }
            } else {
              return null;
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
        {passText ? (
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
        ) : (
          ""
        )}
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
            if (errorConfirmPass) {
              if (confirmPassword === "") {
                return "確認用パスワードを入力してください";
              } else if (password !== confirmPassword) {
                return "パスワードと確認用パスワードが一致しません";
              } else {
                return "";
              }
            } else {
              return null;
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
              !email.includes("@") ||
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
