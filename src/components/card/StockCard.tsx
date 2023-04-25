import React, { FC, useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Box, TextField } from '@mui/material';
import { Items } from '../../types/type';

type Props = {
  itemData: Array<Items>;
};

const StockCard: FC<Props> = (props) => {
  const { itemData } = props;
  // console.log(itemData);

  const [errorMessage, setErrorMessage] =
    useState('消費在庫数を入力してください。');

  const [confirmd, setConfirmd] = useState('false');

  const onClickConfirm = useCallback(() => {
    setConfirmd(confirmd!);
    console.log(confirmd);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {itemData?.map((drink, index) => {
          return (
            <Card
              key={index}
              sx={{
                width: 270,
                m: 2,
                boxShadow: 'none',
                border: 'solid 1px ',
                borderColor: '#bfbec5',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="商品画像"
                  height="140"
                  width="140"
                  image={drink.image[0]}
                  title="商品名"
                  sx={{
                    display: 'block',
                    width: 200,
                    height: 200,
                    objectFit: 'cover',
                    m: 'auto',
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{
                      textAlign: 'center',
                      fontSize: '16px',
                      borderBottom: 'double',
                      fontFamily: 'Georgia',
                    }}
                  >
                    {drink.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Typography sx={{ marginLeft: '36px' }}>
                現在の在庫数は<span style={{ fontWeight: 'bold' }}>？？</span>
                個です
              </Typography>
              <TextField
                sx={{ width: '250px', margin: '10px' }}
                disabled={false}
                id="outlined-number"
                label={errorMessage}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { min: 0, max: 999 },
                  onBlur: (e) => {
                    const inputValue = parseInt(e.target.value, 10); // 第二引数に基数を指定する
                    if (inputValue > 999) {
                      alert('999以下にしてください');
                      e.target.value = '0';
                    }
                  },
                }}
              />
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default StockCard;
