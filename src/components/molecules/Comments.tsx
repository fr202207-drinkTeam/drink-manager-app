import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, memo } from "react";

type Props = {};

// TODO コメントコンポーネント
const Comments: FC<Props> = memo((props) => {
  return (
    <Box sx={{ display: "flex", m: "10px" }}>
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bolder", color: "blue" }}
        >
          rakuco
        </Typography>
        <Typography variant="body2">2023/04/18 16:09</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1">こんにちは</Typography>
      </Grid>
    </Grid>
  </Box>
  );
});

export default Comments;
