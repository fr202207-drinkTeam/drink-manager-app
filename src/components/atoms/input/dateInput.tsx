import React from "react";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";

// type PrimaryDateInputPorps={
//   onChange:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
//   props:any
// }

const PrimaryDateInput = ({onChange, ...props }:any) => {
  return (
    <>
      <TextField
        variant="standard"
        sx={{ width:{
          xs:"80px",
          sm:"100px",
          md:"100px",
          lg:"200px",
          xl:"200px"
        } , mb: 5 }}
        type="date"
        {...props}
        onChange={onChange}
      />
    </>
  );
};

export { PrimaryDateInput };


//「〜」

{/* <span
style={{
  fontSize: "1.5rem",
  marginLeft: "10px",
  marginRight: "10px",
}}
>
〜
</span> */}


