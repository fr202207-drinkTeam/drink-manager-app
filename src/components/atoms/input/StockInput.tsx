import { TextField } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";

type Props = {
  index: number;
  inputStatusArr: boolean[];
  setInputStatusArr: Dispatch<SetStateAction<boolean[]>>;
  inputValueArr: Array<number>;
  setInputValueArr: Dispatch<SetStateAction<number[]>>;
};

export const StockInput: FC<Props> = (props) => {
  const {
    index,
    inputStatusArr,
    setInputStatusArr,
    inputValueArr,
    setInputValueArr,
  } = props;

  const [inputLabel, setInputLabel] = useState<string>(
    "消費在庫数を入力してください "
  );

  const handleInputChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    const regex = /0{1,}/g,
      regex2 = /^[1-9][0-9]*$/;
    const isValidValue = (value: string) => {
      return regex.test(value) && !regex2.test(value);
    };
    if (isValidValue(value)) {
      value = value.replace(regex, ""); // 先頭0のvalueの場合空文字に変換する
    }
    setInputStatusArr(() => {
      const newState = [...inputStatusArr];
      if (Number(value) > 999) {
        newState[index] = true;
      } else {
        newState[index] = false;
      }
      return newState;
    });
    event.target.value = value;
    setInputValueArr(() => {
      const newState = [...inputValueArr];
      newState[index] = Number(value);
      return newState;
    });
  };

  const handleInputBlur = (index: number) => (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    const stringRegex = /^[0-9]+$/; //半角数字を表す正規表現

    if (!stringRegex.test(value)) {
      event.target.value = ""; // 入力値が半角数字ではない場合、値を空にする
      setInputValueArr((prevInputValueArr) => {
        //入力フィールドの値更新
        const newState = [...prevInputValueArr];
        newState[index] = 0;
        return newState;
      });
    }
  };

  return (
    <>
      <TextField
        key={index}
        sx={{ width: "250px", margin: "10px 0px 10px 30px" }}
        id="outlined-basic"
        label={inputLabel}
        variant="outlined"
        type="number"
        error={inputStatusArr[index]}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: 0, max: 999 }}
        onChange={handleInputChange(index)}
        onBlur={handleInputBlur(index)}
        helperText={inputStatusArr[index]! && "999以下の数値を入力してください"}
        InputProps={{
          inputProps: {
            min: 0,
            max: 999,
            inputMode: "numeric",
            pattern: "[0-9]*",
          },
          onKeyPress: (e) => {
            if (e.key === "-" || e.key === "+") {
              e.preventDefault();
            }
          },
        }}
      />
    </>
  );
};
