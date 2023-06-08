import { CheckCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { PrimaryInput } from "../input/Input";

type PasswordProps = {
  showPassword: boolean;
  password: string;
  errorPass: boolean;
  passText: boolean;
  isValidPassword: (password: string) => boolean;
  setPassText: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorPass: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordInput = (props: PasswordProps) => {
  const {
    showPassword,
    password,
    errorPass,
    passText,
    isValidPassword,
    setPassText,
    setErrorPass,
    setPassword,
    setShowPassword,
  } = props;
  return (
    <>
      <PrimaryInput
        type={(() => {
          if (showPassword) {
            return "text";
          } else {
            return "password";
          }
        })()}
        required
        label="パスワード"
        placeholder="パスワード"
        helperText={
          (() => {
          if (errorPass && password === "") {
            return "パスワードを入力してください";
          } else if (
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
        onBlur={() => setErrorPass(true)}
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
                          <Box sx={{fontSize: {
                            xs: "12px",
                            sm: "14px",
                            md: "15px",
                            lg: "16px",
                            xl: "16px"
                          },}}>
                            <CheckCircle
                              sx={{
                                color: "green",
                                verticalAlign: "middle",
                                marginRight: "5px",
                                fontSize: {
                                  xs: "16px",
                                  sm: "18px",
                                  md: "19px",
                                  lg: "20px",
                                  xl: "20px"
                                }
                              }}
                            />
                            8文字以上16文字以内
                          </Box>
                        );
                      } else {
                        return (
                          <Box sx={{fontSize: {
                            xs: "12px",
                            sm: "14px",
                            md: "15px",
                            lg: "16px",
                            xl: "16px"
                          },}}>
                            <CheckCircle
                              sx={{
                                verticalAlign: "middle",
                                marginRight: "5px",
                                fontSize: {
                                  xs: "16px",
                                  sm: "18px",
                                  md: "19px",
                                  lg: "20px",
                                  xl: "20px"
                                }
                              }}
                            />
                            8文字以上16文字以内
                          </Box>
                        );
                      }
                    })()}
                  />
                  <ListItemText
                    primary={(() => {
                      if (isValidPassword(password)) {
                        return (
                          <Box sx={{fontSize: {
                            xs: "11px",
                            sm: "14px",
                            md: "15px",
                            lg: "16px",
                            xl: "16px"
                          },}}>
                            <CheckCircle
                              sx={{
                                color: "green",
                                verticalAlign: "middle",
                                marginRight: "5px",
                                fontSize: {
                                  xs: "16px",
                                  sm: "18px",
                                  md: "19px",
                                  lg: "20px",
                                  xl: "20px"
                                }
                              }}
                            />
                            半角英字大文字、小文字、数字の3種類を1つ必ず使用
                          </Box>
                        );
                      } else {
                        return (
                          <Box sx={{fontSize: {
                            xs: "11px",
                            sm: "14px",
                            md: "15px",
                            lg: "16px",
                            xl: "16px"
                          },}}>
                            <CheckCircle
                              sx={{
                                verticalAlign: "middle",
                                marginRight: "5px",
                                fontSize: {
                                  xs: "16px",
                                  sm: "18px",
                                  md: "19px",
                                  lg: "20px",
                                  xl: "20px"
                                }
                              }}
                            />
                            半角英字大文字、小文字、数字の3種類を1つ必ず使用
                          </Box>
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
    </>
  );
};

export default PasswordInput;
