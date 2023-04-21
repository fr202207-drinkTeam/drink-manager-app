import { FC, memo } from "react";
import Typography from "@mui/material/Typography";

type Props = {
    children: string
};

const AdmTitleText: FC<Props> = memo(({children}) => {
  return (
    <>
      <Typography
        variant="h3"
        component="h2"
        textAlign="center"
        sx={{ mb: 8, color: "#024098" }}
      >
        - {children} -
      </Typography>
    </>
  );
});

export default AdmTitleText;
