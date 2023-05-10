import { FC, memo } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
// import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
type Props = {
  children: string;
};

const AdmTitleText: FC<Props> = memo(({ children }) => {
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          sx={{
            mb: 8,
            color: '#fff',
            background: '#696969',
            borderRadius: 10,
            py: 2,
            width: '60%',
            margin: 'auto',
          }}
        >
          - {children} -
        </Typography>
      </Box>
    </>
  );
});

export default AdmTitleText;
