import { Card, Typography,useTheme } from '@mui/material'
import React from 'react'

//text,informationは中のテキスト、それ以外はスタイル
type DottedMemoProps={
  text:string;
  information?:string;
  fontSize?:string|number;
  maxWidth?:number;
  minWidth?:number;
  margin?:number;
}

const DottedMemo = ({text,information,fontSize,maxWidth,minWidth,margin}:DottedMemoProps) => {
  const theme = useTheme();
  return (
    <Card
    sx={{
      // p: 1,
      mb: 5,
      backgroundColor:"#fde8d0",
      border: "2px dashed #fff ",
      boxShadow: " 0 0 0 8px #fde8d0",
      width: "100%",
      maxWidth:{
        xs: "200px",
        sm: "400px",
        md: "500px",
      },
      minWidth:{
        xs: "170px",
        sm: "300px",
        md: "400px",
      },
      m: "auto",
    }}
  >
     <Typography
        gutterBottom
        component="div"
        textAlign="center"
        sx={{
          p:2,
          color: '#595857',
          fontSize: {
            xs: theme.typography.pxToRem(12),
            sm: theme.typography.pxToRem(22),
            md: theme.typography.pxToRem(23),
          },
        }}
      >
        {text}
      </Typography>
      <Typography
        gutterBottom
        component="div"
        textAlign="center"
        sx={{
          p:1,
          color: '#595857',
          fontSize: {
            xs: theme.typography.pxToRem(8),
            sm: theme.typography.pxToRem(14),
            md: theme.typography.pxToRem(18),
          },
        }}
      >
        {information}
      </Typography>
  </Card>
  )
}

export default DottedMemo