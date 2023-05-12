import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Box } from '@mui/material';
import { Items, StockHistory } from '../../types/type';
import { StockInput } from '../atoms/input/StockInput';

type Props = {
  itemData: Array<Items>;
  inTheOfficeItemArr: Array<StockHistory>;
  inputValueArr: Array<number>;
  setInputValueArr: Dispatch<SetStateAction<number[]>>;
};

const StockCard: FC<Props> = (props) => {
  const { itemData, inTheOfficeItemArr, inputValueArr, setInputValueArr } =
    props;
  // console.log(inTheOfficeItemArr);
  // console.log(itemData);
  const intheOfficeItemAmount = itemData.length;
  const [inputStatusArr, setInputStatusArr] = useState<boolean[]>([]);

  const testFunc = (drinkId: number) => {
    for (let i = 0; i < inTheOfficeItemArr.length; i++) {
      if (inTheOfficeItemArr[i].itemId === drinkId) {
        // console.log(inTheOfficeItemArr[i].stockAmount);
        return inTheOfficeItemArr[i].stockAmount;
      }
    }
  };

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
              <CardMedia
                component="img"
                alt="商品画像"
                height="140"
                width="140"
                image={drink.image}
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
                  {`${drink.name}`}
                </Typography>
              </CardContent>
              <Typography sx={{ marginLeft: '36px' }}>
                現在の在庫数は
                <span style={{ fontWeight: 'bold' }}>{testFunc(drink.id)}</span>
                個です
              </Typography>
              <StockInput
                index={index}
                inputStatusArr={inputStatusArr}
                setInputStatusArr={setInputStatusArr}
                inputValueArr={inputValueArr}
                setInputValueArr={setInputValueArr}
              />
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default StockCard;
