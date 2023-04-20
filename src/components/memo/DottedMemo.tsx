import { Card, Typography } from '@mui/material'
import React from 'react'

type DottedMemoProps={
  text:string;
  information?:string;
  fontSize?:string;
  fontSizeInfo?:string;
  maxWidth?:number;
  minWidth?:number;
  margin?:number;
}

const DottedMemo = ({text,information,fontSize,fontSizeInfo,maxWidth,minWidth,margin}:DottedMemoProps) => {
  return (
    <Card
    sx={{
      p: 1,
      mb: 5,
      backgroundColor:"#ffdead",
      border: "2px dashed #fff ",
      boxShadow: " 0 0 0 8px #ffdead",
      width: "100%",
      maxWidth,
      minWidth,
      m: "auto",
    }}
  >
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      textAlign="center"
      sx={{ margin, color: "#595857", fontSize }}
    >
      {text}
    </Typography>
    <Typography
      gutterBottom
      variant="h5"
      component="div"
      textAlign="center"
      sx={{ margin, color: "#595857", fontSizeInfo }}
    >
      {information}
    </Typography>
  </Card>
  )
}

export default DottedMemo