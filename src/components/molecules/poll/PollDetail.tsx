import { Box,useTheme } from '@mui/material'
import React, { FC } from 'react'
import DottedMemo from '../../atoms/memo/DottedMemo'
import AdsClickIcon from "@mui/icons-material/AdsClick";

type PollDetailProps={
  PopularitemData?:any
  OtheritemData?:any
  titleText:string
}

const PollDetail:FC<PollDetailProps> = ({PopularitemData,OtheritemData,titleText}) => {
  const theme = useTheme();
  return (
   <>
   <DottedMemo
              text={titleText}
              information={"※各投票、お一人につき一回まで投票が可能です"}
              fontSize={"20px"}
              maxWidth={600}
              minWidth={500}
              margin={4}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                my: 4,
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  fontSize: {
                    xs: "20px",
                    sm: "25px",
                    md: "30px",
                    lg:"30px",
                    xl:"35px",
                  },
                  my: 5,
                  background: "linear-gradient(transparent 70%, #fffacd 70%)",
                  maxWidth: "700px",
                  ml: 2,
                }}
              >
                {" "}
                <AdsClickIcon sx={{ mr: 2, fontSize: {
            xs: "20px",
            sm:"25px",
            md: "40px",
          }, }} />
                気になる商品をクリックして投票しよう!
              </Box>
              <Box sx={{           fontSize: {
            xs: "14px",
            sm: "16px",
            md: "25px",
          }, }}>
                投票可能商品数
                <span style={{ fontSize: "28px" ,fontWeight:"bold"}}>
                  {PopularitemData?.length||OtheritemData?.length}
                </span>
                種類 !!
              </Box>
            </Box>
   </>
  )
}

export default PollDetail