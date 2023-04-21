import React from "react";
import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";

const Paginate = ({ ...props }: any) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Pagination sx={{ textAlign: "center", mt: 8 }} {...props} />
    </Box>
  );
};

export default Paginate;
