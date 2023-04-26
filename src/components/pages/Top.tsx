import { FC, memo } from "react";
// import "./App.css";
import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DefaultLayout from "../layout/DefaultLayout";
import Slider from "../atoms/slider/Slider";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../store/loginUserState";
type Props = {};

const Top: FC<Props> = memo((props) => {
  const images = ["../item.png", "../item.png", "../item.png"];
  return (
    <>
      <DefaultLayout>
        {/*  内藤さん用商品詳細ページスライダー start*/}
        <Box
          sx={{
            mr: 15,
            p: 1,
            display: "flex",
            ml: 10,
            alignItems: "center",
            //  スライダーの大きさの調整のため自由に変更お願いします!
            width: 400,
          }}
        >
          <Slider
            // 画像　<Slider>コンポーネントにてmapで回している
            images={images}
            // 何枚画像を表示させるか
            slidesPerView={1}
            // 画像ループさせるか(最後の画像までいったら自動的に1枚目に戻る)
            loop={true}
            // 矢印の表示
            navigation={true}
            // 矢印を押下せずに自動的にループさせるか
            autoplay={false}
          />
        </Box>
        {/*  内藤さん用商品詳細ページスライダー  end*/}
      </DefaultLayout>
    </>
  );
});

export default Top;
