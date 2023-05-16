import React, { ChangeEvent } from "react";
import { SecondaryInput } from "../input/Input";

type LastNameProps = {
  lastName: string;
  errorLastName: boolean;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  firstName: string;
  errorFirstName: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const LastNameInput = (props: LastNameProps) => {
  const {
    lastName,
    errorLastName,
    setLastName,
    firstName,
    errorFirstName,
    onBlur,
  } = props;
  return (
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
        if (errorLastName && lastName.length > 10) {
          return "10文字以内で入力してください";
        }
        if (
          (!errorLastName &&
            errorFirstName &&
            (firstName === "" || firstName.length > 10)) ||
          (errorLastName && firstName.length > 10) ||
          (errorLastName &&
            errorFirstName &&
            firstName === "" && lastName !== "")
        ) {
          return " ";
        }
      })()}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setLastName(e.target.value)
      }
      error={errorLastName && (lastName === "" || lastName.length > 10)}
      onBlur={onBlur}
      style={{ height: "100%" }}
    />
  );
};

export default LastNameInput;
