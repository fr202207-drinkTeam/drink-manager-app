import { CheckCircle } from "@mui/icons-material";
import { List, ListItem, ListItemText } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { PrimaryInput } from "../input/Input";

type EmailProps = {
  email: string;
  errorMail: boolean;
  emailText?: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setErrorMail: React.Dispatch<React.SetStateAction<boolean>>;
  isValidEmail?: (email: string) => boolean;
  error: boolean | null;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  required?: any;
};

const EmailInput = (props: EmailProps) => {
  const {
    email,
    errorMail,
    emailText,
    setEmail,
    isValidEmail,
    error,
    onBlur,
    onFocus,
  } = props;
  // コンポーネント内のisValidEmailの呼び出し部分
  const isValid = isValidEmail?.(email) ?? true;
  const location = useLocation();
  const currentLocation = location.pathname;
  const plaholderEmail = "example@" + process.env.REACT_APP_EMAIL + ".co.jp";
  return (
    <>
      <PrimaryInput
        required
        name="email"
        type="email"
        label="メールアドレス"
        placeholder={plaholderEmail}
        helperText={(() => {
          if (errorMail && email === "") {
            return "メールアドレスを入力してください";
          }
          if (
            currentLocation.startsWith("/login") &&
            ((errorMail && !email.includes("@")) || email.length > 40)
          ) {
            return "＠を含んだ40文字以内で入力してください";
          }
          if (
            currentLocation.startsWith("/register") &&
            ((errorMail && !isValid) || email.length > 40)
          ) {
            return "40文字以内かつ指定のドメインで入力してください";
          }
        })()}
        error={error}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      {(() => {
        // /registerのときのみ表示
        if (emailText && currentLocation.startsWith("/register")) {
          return (
            <List>
              <ListItem>
                <ListItemText
                  primary={(() => {
                    if (isValid) {
                      return (
                        <>
                          <CheckCircle
                            style={{
                              color: "green",
                              verticalAlign: "middle",
                              marginRight: "5px",
                            }}
                          />
                          @{process.env.REACT_APP_EMAIL}.co.jpの固定ドメイン
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
                          @{process.env.REACT_APP_EMAIL}.co.jpの固定ドメイン
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
    </>
  );
};

export default EmailInput;
