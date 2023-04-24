import {
  Paper,
  Button,
  Typography,
  Input,
  Stack,
  Box,
  TextField,
} from "@mui/material";
import { FC, memo } from "react";
import { PrimaryButton } from "../atoms/button/Button";

type Props = {};

const Contact: FC<Props> = memo((props) => {
  return (
    <Paper
      sx={{
        padding: "50px 100px",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <Typography
          sx={{
            fontFamily: "Georgia",
            fontSize: "50px",
            mt: "20px",
          }}
        >
          Contact
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={10}
        >
          <Typography sx={{ minWidth: "160px" }}>お問い合わせ種別：</Typography>
          <Input type="text" />
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={10}
        >
          <Typography sx={{ minWidth: "160px" }}>お問い合わせ内容：</Typography>
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
        <PrimaryButton>送信</PrimaryButton>
      </Stack>
    </Paper>
  );
});

export default Contact;
