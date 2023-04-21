import { Button, Paper, Typography } from '@mui/material';
import { FC, memo } from 'react';
import StockCard from '../card/StockCard';
import useGetOfficeItems from '../../hooks/useGetOfficeItems';

type Props = {};

const Addition: FC<Props> = memo((props) => {
  const officeItemData = useGetOfficeItems({ intheOffice: true });

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
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontFamily: 'Georgia',
          fontSize: '50px',
          color: '#024098',
          mt: '20px',
        }}
      >
        -補充在庫入力-
      </Typography>
      <StockCard officeItemData={officeItemData} />
      <div style={{ display: 'inline-flex' }}>
        <Button
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
        </Button>
      </div>
    </Paper>
  );
});

export default Addition;
