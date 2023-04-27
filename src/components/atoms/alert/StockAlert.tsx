import React, { useState } from 'react';

import { Box, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const StockAlert = (props: Props) => {
  const { open, handleClose } = props;

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{
            width: '100%',
            fontSize: '1.2rem',
            marginTop: '60px',
            padding: '10px',
          }}
        >
          消費在庫数は999以下の数値で入力してください。
        </Alert>
      </Snackbar>
    </>
  );
};
