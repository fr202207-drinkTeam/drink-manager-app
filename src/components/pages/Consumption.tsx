import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';

import { FC, memo } from 'react';
import StockCard from '../card/StockCard';
import useGetOfficeItems from '../../hooks/useGetOfficeItems';
import { useState, useEffect } from 'react';
import { useGetOfficeItems1 } from '../../hooks/useGetOfficeItems1';
import AdmTitleText from '../atoms/text/AdmTitleText';
import { ActiveDarkBlueButton } from '../atoms/button/Button';

type Props = {};

const Consumption: FC<Props> = memo((props) => {
  // const itemData = useGetOfficeItems({ intheOffice: true });
  const { itemData, loading, error } = useGetOfficeItems1();
  console.log(itemData);

  const onClickExport = () => {
    alert('送信しました。');
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
      {/* <Typography
        sx={{
          textAlign: 'center',
          fontFamily: 'Georgia',
          fontSize: '50px',
          color: '#024098',
          mt: '20px',
        }}
      >
        -消費在庫入力-
      </Typography> */}
      <Box sx={{ width: '60%' }}>
        <AdmTitleText>消費在庫入力</AdmTitleText>
      </Box>
      {error ? (
        <Alert severity="error" sx={{ marginTop: '30px', fontSize: '20px' }}>
          <AlertTitle>Error</AlertTitle>
          データが見つかりませんでした。
        </Alert>
      ) : loading ? (
        <CircularProgress sx={{ marginTop: '30px' }} />
      ) : (
        <StockCard itemData={itemData} />
      )}
      <div style={{ display: 'inline-flex' }}>
        {/* <Button
          sx={{
            background: '#024098',
            color: '#FFF',
            fontWeight: 'bold',
            px: 10,
            py: 4,
            my: 5,
            borderRadius: 20,
            fontSize: 20,
            direction: 'rtl',
            width: '300px',
          }}
        >
          送信
        </Button> */}
        <ActiveDarkBlueButton
          sxStyle={{ px: 10, py: 4, borderRadius: '32px', marginTop: '32px' }}
          event={() => onClickExport()}
        >
          送信
        </ActiveDarkBlueButton>
      </div>
    </Paper>
  );
});

export default Consumption;
