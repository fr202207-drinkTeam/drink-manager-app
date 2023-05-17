import React, { ChangeEvent } from "react";
import { SecondaryInput } from "../input/Input";

type UserIdProps = {
  userId: string;
  errorId: boolean;
  isValidUserId: (userId: string) => boolean;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const UserIdInput = (props: UserIdProps) => {
  const { userId, errorId, isValidUserId, setUserId, onBlur } = props;

  return (
    <SecondaryInput
      name="userId"
      type="text"
      label="社員ID*"
      placeholder="例）0000"
      helperText={(() => {
        if (errorId && userId === "") {
          return "社員IDを入力してください";
        }
        if (errorId && !isValidUserId(userId)) {
          return "数値で入力してください";
        }
      })()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
      error={errorId && (userId === "" || !isValidUserId(userId))}
      onBlur={onBlur}
    />
  );
};

export default UserIdInput;
