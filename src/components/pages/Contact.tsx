import {
  Paper,
  Typography,
  Input,
  Stack,
  Box,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { FC, memo, useState } from 'react';
import { PrimaryButton } from '../atoms/button/Button';
import ModalWindow from '../organisms/ModalWindow';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Contact: FC<Props> = memo((props) => {
  const [inquiryType, setInquiryType] = useState('');
  const navigate = useNavigate();

  const handleInquiryTypeChange = (event: any) => {
    setInquiryType(event.target.value as string);
  };

  const onClickSubmit = () => {
    navigate('/home');
  };

  return (
    <Paper
      sx={{
        padding: '50px 100px',
      }}
    >
      <Box id="top" />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <Typography
          sx={{
            fontFamily: 'Georgia',
            fontSize: '50px',
            mt: '20px',
          }}
        >
          お問い合わせ
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={10}
        >
          <Typography sx={{ minWidth: '160px' }}>お問い合わせ種別：</Typography>
          <Select
            value={inquiryType}
            onChange={handleInquiryTypeChange}
            sx={{ minWidth: '200px' }}
          >
            <MenuItem value="system">システムについてのお問い合わせ</MenuItem>
            <MenuItem value="service">サービスについてのお問い合わせ</MenuItem>
            <MenuItem value="coffee">
              コーヒーサーバについてのお問い合わせ
            </MenuItem>
            <MenuItem value="other">その他</MenuItem>
          </Select>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={10}
        >
          <Typography sx={{ minWidth: '160px' }}>お問い合わせ内容：</Typography>
          <Box>
            <TextField
              sx={{ width: 500 }}
              name="fbmessage"
              id="fbmessage"
              multiline
              minRows={6}
              variant="filled"
              margin="dense"
              size="small"
            />
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <ModalWindow
            title="送信します、よろしいですか？"
            content={''}
            openButtonColor="blue"
            buttonName="送信"
            completeButtonColor={'blue'}
            completeButtonName={`はい`}
            completeAction={onClickSubmit}
            cancelButtonColor={'red'}
            openButtonSxStyle={{
              px: 9,
              py: 3,
              borderRadius: '32px',
              marginTop: '32px',
              textAlign: 'center',
              width: '100%',
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
});

export default Contact;
