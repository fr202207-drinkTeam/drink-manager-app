import { Box } from '@mui/material'
import React, { FC } from 'react'
import DottedMemo from '../../atoms/memo/DottedMemo'
import AdsClickIcon from "@mui/icons-material/AdsClick";

type PollDetailProps={
  PopularitemData?:any
  OtheritemData?:any
}

const PollDetail:FC<PollDetailProps> = ({PopularitemData,OtheritemData}) => {
  return (
   <>
   <DottedMemo
              text={" 一番気になる、好きなドリンクに投票しよう！"}
              information={"※各投票、お一人につき一回まで投票が可能です"}
              fontSize={"20px"}
              maxWidth={700}
              minWidth={500}
              margin={4}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  fontSize: "30px",
                  my: 5,
                  background: "linear-gradient(transparent 70%, #fffacd 70%)",
                  width: "700px",
                  ml: 2,
                }}
              >
                {" "}
                <AdsClickIcon sx={{ mr: 2, fontSize: "40px" }} />
                気になる商品をクリックして投票しよう!
              </Box>
              <Box sx={{ fontSize: "23px" }}>
                投票商品数
                <span style={{ fontSize: "30px" }}>
                  {PopularitemData?.length||OtheritemData?.length}
                </span>
                種類
              </Box>
            </Box>
   </>
  )
}

export default PollDetail