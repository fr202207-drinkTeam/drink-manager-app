import {
  Box,
  CircularProgress,
  Paper,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';

import { FC, memo, useEffect, useState } from 'react';

import StockCard from '../card/StockCard';
import { useGetOfficeItems1 } from '../../hooks/useGetOfficeItems1';
import AdmTitleText from '../atoms/text/AdmTitleText';
import { ActiveDarkBlueButton } from '../atoms/button/Button';
import axios from 'axios';
import { StockHistory } from '../../types/type';
import { Key } from '@mui/icons-material';
// import { createServer } from 'json-server';

type Props = {};

const Consumption: FC<Props> = memo((props) => {
  const { itemData, loading, error } = useGetOfficeItems1();
  const [inputValueArr, setInputValueArr] = useState<number[]>([]);
  useEffect(() => {
    const firstInputValueArr: number[] = [...Array(itemData.length)].map(
      () => 0
    );
    setInputValueArr(firstInputValueArr);
  }, [itemData]);

  const onClickExport = () => {
    alert('送信しました。');
  };
  //オフィスに存在する商品のidのみが格納された配列
  const [inTheOfficeItemIdArr, setInTheOfficeItemIdArr] = useState<
    Array<number>
  >([]);

  useEffect(() => {
    setInTheOfficeItemIdArr(itemData.map((item) => item.id));
  }, [itemData]);

  //オフィスに存在する商品情報が格納された配列
  const [inTheOfficeItemArr, setInTheOfficeItemArr] = useState<
    Array<StockHistory>
  >([]);

  useEffect(() => {
    getStockAmount();
  }, [inTheOfficeItemIdArr]);

  //現在の在庫量を取得
  const getStockAmount = async () => {
    const promises = inTheOfficeItemIdArr.map((test) => {
      return axios
        .get(
          `http://localhost:8880/stockhistory?&itemId=${test}&_sort=id&_order=desc&_limit=1`
        )
        .then((res) => {
          return res.data[0];
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    });
    const newArr = await Promise.all(promises);
    setInTheOfficeItemArr(newArr);
    // console.log(inTheOfficeItemArr);
  };

  //送信ボタン押下後（退避）
  const onClickSubmit = () => {
    const now = new Date();
    const dateString = now.toISOString();
    itemData.map((item, index) => {
      axios.post('http://localhost:8880/stockhistory', {
        itemId: item.id,
        quantity: inputValueArr[index],
        day: dateString,
        incOrDec: false,
        stockAmount:
          inTheOfficeItemArr[index].stockAmount - inputValueArr[index],
      });
    });
  };

  const testArr = [{ test: 1 }, { test: 2 }];
  const onClickSubmit1 = () => {
    axios.post('http://localhost:8880/stockhistory', ...testArr);
  };

  const onClickReset = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8880/stockhistory/22`
      );
      console.log(response.data);
      console.log('ボタン押下しました');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      sx={{
        mb: 5,
        width: '100%',
        minWidth: 500,
        maxWidth: 1200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px',
      }}
    >
      <Box sx={{ width: '60%' }}>
        <AdmTitleText>消費在庫入力</AdmTitleText>
      </Box>
      {error ? (
        <Alert severity="error" sx={{ marginTop: '30px', fontSize: '20px' }}>
          <AlertTitle>Error</AlertTitle>
          データが見つかりませんでした。
        </Alert>
      ) : loading ? (
        <CircularProgress sx={{ marginTop: '30px', marginBottom: '40px' }} />
      ) : (
        <StockCard
          itemData={itemData}
          inTheOfficeItemArr={inTheOfficeItemArr}
          inputValueArr={inputValueArr}
          setInputValueArr={setInputValueArr}
        />
      )}
      <div style={{ display: 'inline-flex' }}>
        <ActiveDarkBlueButton
          sxStyle={{ px: 10, py: 4, borderRadius: '32px', marginTop: '32px' }}
          event={() => onClickExport()}
          onClick={onClickSubmit}
          // onClick={onClickSubmit1}
        >
          送信
        </ActiveDarkBlueButton>
      </div>
    </Paper>
  );
});

export default Consumption;
