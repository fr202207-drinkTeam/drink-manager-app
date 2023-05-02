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
import { Grid } from "@mui/material";
import ItemCard from "../card/ItemCard";
import { Paper } from "@mui/material";
import Container from "@mui/material";
import {
  ActiveBeigeButton,
  ActiveBlueButton,
  ActivePinkButton,
} from "../atoms/button/Button";
import { useState, useEffect } from "react";
import PostsData from "../organisms/PostData ";
import { useNavigate } from "react-router-dom";
type Props = {};

const Top: FC<Props> = memo((props) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // 投稿取得
  useEffect(() => {
    // 関連する投稿を取得
    fetch(`http://localhost:8880/posts?_limit=3}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPostData(data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const onSearchButtonClick = () => {};
  return (
    <>
      <DefaultLayout>
        <Box sx={{ textAlign: "center" }}>
          <Card
            sx={{
              p: 1,
              backgroundColor: "#fff",
              border: "4px dotted #ffdead ",
              textAlign: "center",
              width: "60%",
              borderRadius: "20px",
              m: "auto",
            }}
          >
            <Typography
              gutterBottom
              component="div"
              sx={{ m: 4, color: "#595857", fontSize: "25px" }}
            >
              みんなの投票で会社に設置してある<br></br>
              <Typography
                gutterBottom
                component="span"
                sx={{
                  color: "#f3bf88",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                ドリンクの種類
              </Typography>
              がかわるよ！
            </Typography>
            <Typography
              gutterBottom
              component="div"
              sx={{ m: 4, color: "#595857", fontSize: "16px" }}
            >
              好きなドリンクを教えてね。<br></br>
              あなたの一票で結果が変わるかも!?
            </Typography>
          </Card>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <ActivePinkButton
            event={onSearchButtonClick}
            sxStyle={{ width: "30%", py: 2, my: 10, borderRadius: 20 }}
          >
            投票する
          </ActivePinkButton>
        </Box>
        {/* <Grid container spacing={2}>
                {items.map((item, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <ItemCard />
                  </Grid>
                ))}
              </Grid> */}

        <Box sx={{ textAlign: "center" }}>
          <Card
            sx={{
              p: 1,
              backgroundColor: "#fff",
              border: "4px dotted #ffdead ",
              textAlign: "center",
              width: "60%",
              borderRadius: "20px",
              m: "auto",
            }}
          >
            <Typography
              gutterBottom
              component="div"
              sx={{ m: 2, color: "#595857", fontSize: "25px" }}
            >
              ランキング
            </Typography>
            <Typography
              gutterBottom
              component="div"
              sx={{ m: 2, color: "#595857", fontSize: "16px" }}
            >
              ●●月の投票結果はこちら
            </Typography>
          </Card>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                mt: 10,
                pb: 10,
                backgroundImage: "url(/crown1.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100px",
                backgroundPosition: "center",
              }}
            ></Box>
            <ItemCard data={[]} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                mt: 10,
                pb: 10,
                backgroundImage: "url(/crown2.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100px",
                backgroundPosition: "center",
              }}
            ></Box>
            <ItemCard data={[]} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                mt: 10,
                pb: 10,
                backgroundImage: "url(/crown3.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100px",
                backgroundPosition: "center",
              }}
            ></Box>
            <ItemCard data={[]} />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center" }}>
          <ActivePinkButton
            event={onSearchButtonClick}
            sxStyle={{ width: "30%", py: 2, my: 10, borderRadius: 20 }}
          >
            過去の投票結果を見る
          </ActivePinkButton>
        </Box>
        <Card
          sx={{
            p: 1,
            backgroundColor: "#fff",
            border: "4px dotted #ffdead ",
            textAlign: "center",
            width: "60%",
            borderRadius: "20px",
            m: "auto",
          }}
        >
          <Typography
            gutterBottom
            component="div"
            sx={{ m: 2, color: "#595857", fontSize: "25px" }}
          >
            みんなの声
          </Typography>
          <Typography
            gutterBottom
            component="div"
            sx={{ m: 2, color: "#595857", fontSize: "16px" }}
          >
            ラクスパートナーズのみんなの投稿がとどいてるよ !
          </Typography>
        </Card>
        <Grid container spacing={2}>
          {/* {postData && postData.length > 0 && (
            <> */}
          {/* 仮置 */}
          {/* {postData.map((postData: any) => (
                <Grid item xs={12} sm={6} md={4}>
                  <PostsData
                    key={postData.id}
                    postData={postData}
                    isComment={false}
                  />
                </Grid>
              ))}
              <Box sx={{ mt: "20px" }}></Box> */}
          {/* </>
          )} */}
        </Grid>

        <Box sx={{ textAlign: "center" }}>
          <ActiveBeigeButton
            event={() => {
              navigate("/home/timeline");
            }}
            sxStyle={{ width: "30%", py: 2, mt: 10, borderRadius: 20 }}
          >
            タイムラインを見る
          </ActiveBeigeButton>
        </Box>
      </DefaultLayout>
    </>
  );
});

export default Top;
