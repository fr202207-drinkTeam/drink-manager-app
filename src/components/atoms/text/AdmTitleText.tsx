import { FC, memo } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
type Props = {
  children: string;
};

const AdmTitleText: FC<Props> = memo(({ children }) => {
  return (
    <>
      <Box sx={{ mb: {xs: 3, sm: 5, md: 5, lg:8} }}>
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
            width: {xs: "80%", sm: "60%", md: "60%", lg:'60%'},
            margin: 'auto',
            fontSize: {
              xs: "16px",
              sm: "20px",
              md: "20px",
              lg: "26px"
            },
          }}
        >
          - {children} -
        </Typography>
      </Box>
    </>
  );
});

export default AdmTitleText;
