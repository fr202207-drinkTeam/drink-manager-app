import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import React, { ChangeEvent } from "react";
import { PrimaryInput } from "../input/Input";

type ConfirmPasswordProps = {
  confirmPassword: string;
  errorConfirmPass: boolean;
  showConfirmPassword: boolean;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  setShowConfimPassword: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const ConfirmPasswordInput = (props: ConfirmPasswordProps) => {
  const {
    confirmPassword,
    errorConfirmPass,
    showConfirmPassword,
    setConfirmPassword,
    setShowConfimPassword,
    password,
    onBlur,
  } = props;

  return (
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
  );
};

export default ConfirmPasswordInput;
