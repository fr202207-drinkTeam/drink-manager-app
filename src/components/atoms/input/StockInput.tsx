import { TextField } from '@mui/material';
import { Dispatch, FC, SetStateAction, useState } from 'react';

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

  const [inputLabel, setInputLabel] =
    useState<string>('消費在庫数を入力してください ');

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      const regex = /0{2,}/g; // 0が2つ以上連続する形を表す正規表現
      if (regex.test(value)) {
        value = value.replace(regex, ''); // 0が2つ以上連続する形が含まれている場合は空文字列に変換する
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
        const newState = [...inputValueArr]
        newState[index] = Number(value)
        return newState
      })
    };
  // console.log(inputStatusArr);

  return (
    <>
      <TextField
        key={index}
        sx={{ width: '250px', margin: '10px' }}
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
        helperText={inputStatusArr[index]! && '999以下の数値を入力してください'}
        InputProps={{
          inputProps: {
            min: 0,
            max: 999,
            inputMode: 'numeric',
            pattern: '[0-9]*',
          },
          onKeyPress: (e) => {
            if (e.key === '-' || e.key === '+') {
              e.preventDefault();
            }
          },
        }}
      />
    </>
  );
};
