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
      p: 1,
      mb: 5,
      backgroundColor:"#fde8d0",
      border: "2px dashed #fff ",
      boxShadow: " 0 0 0 8px #fde8d0",
      width: "100%",
      maxWidth:{
        xs: theme.breakpoints.values.xs,
        sm: theme.breakpoints.values.sm,
      },
      minWidth:400,
      m: "auto",
    }}
  >
     <Typography
        gutterBottom
        variant="h5"
        component="div"
        textAlign="center"
        sx={{
          margin,
          color: '#595857',
          fontSize: {
            xs: theme.typography.pxToRem(20),
            sm: theme.typography.pxToRem(25),
            md: theme.typography.pxToRem(25),
          },
        }}
      >
        {text}
      </Typography>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        textAlign="center"
        sx={{
          margin,
          color: '#595857',
          fontSize: theme.typography.pxToRem(16),
        }}
      >
        {information}
      </Typography>
  </Card>
  )
}

export default DottedMemo