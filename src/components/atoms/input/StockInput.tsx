import { TextField } from '@mui/material';
import { FC, useState } from 'react';

type Props = {
  index: number;
};

export const StockInput: FC<Props> = (props) => {
  const { index } = props;
  const firstInputStatusArr = [...Array(5)].map(() => false);

  const [inputStatusArr, setInputStatusArr] =
    useState<boolean[]>(firstInputStatusArr);

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
    };

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

// import { InputAdornment, TextField } from '@mui/material';
// import { FC } from 'react';

// type Props = {
//   inputLabel: string;
//   inputError: boolean;
//   setInputLabel: React.Dispatch<React.SetStateAction<string>>;
//   setInputError: React.Dispatch<React.SetStateAction<boolean>>;
//   itemId: Number;
//   isFocused: boolean;
//   setFocusItemId: React.Dispatch<React.SetStateAction<Number | null>>;
// };

// export const StockInput: FC<Props> = (props) => {
//   const {
//     inputLabel,
//     inputError,
//     setInputLabel,
//     setInputError,
//     itemId,
//     isFocused,
//     setFocusItemId,
//   } = props;

//   const onChaneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = parseInt(e.target.value, 10);
//     if (inputValue > 999) {
//       setInputLabel('999以下の整数で入力してください');
//       setInputError(true);
//       e.target.value = '0';
//     } else {
//       setInputLabel('消費在庫を入力してください');
//       setInputError(false);
//     }
//   };

//   const onFocusInput = () => {
//     setFocusItemId(itemId);
//   };

//   const onBlurInput = () => {
//     setFocusItemId(null);
//   };

//   return (
//     <TextField
//       onChange={isFocused ? onChaneInput : undefined}
//       onFocus={onFocusInput}
//       sx={{ width: '250px', margin: '10px' }}
//       id="outlined-basic"
//       label={inputLabel}
//       variant="outlined"
//       type="number"
//       error={inputError}
//       InputLabelProps={{
//         shrink: true,
//       }}
//       InputProps={{
//         inputProps: {
//           min: 0,
//           max: 999,
//           inputMode: 'numeric',
//           pattern: '[0-9]*',
//           startAdornment: <InputAdornment position="end">個</InputAdornment>,
//         },
//         onBlur: onBlurInput,

//         onKeyPress: (e) => {
//           if (e.key === '-' || e.key === '+') {
//             e.preventDefault();
//           }
//         },
//       }}
//     />
//   );
// };
