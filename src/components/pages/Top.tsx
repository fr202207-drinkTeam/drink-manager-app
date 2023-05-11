import { FC, memo } from "react";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DefaultLayout from "../layout/DefaultLayout";

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

import { useNavigate } from "react-router-dom";
import PollRanking from "../organisms/PollRanking";
import PostsData from "../organisms/PostData ";
import { Post } from "../../types/type";
import PostData from "../organisms/PostData ";
type Props = {};

const Top: FC<Props> = memo((props) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(postData, "postDate");

  useEffect(() => {
    fetch(`http://localhost:8880/posts?&_limit=3&_sort=createdAt&_order=desc`, {
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
            event={() => {
              navigate("/home/poll");
            }}
            sxStyle={{ width: "20%", py: 2, my: 10 }}
          >
            投票する
          </ActivePinkButton>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <PollRanking />
          <ActivePinkButton
            event={() => {
              navigate("/home/poll");
            }}
            sxStyle={{ width: "20%", py: 2, my: 10 }}
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
        <Paper sx={{ p: "20px", background: "#eae5e3", mt: 5 }}>
          <Box sx={{ overflowY: "scroll", height: "500px", px: "20px" }}>
            {postData.map((data: any, index: any) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 1,

                  maxWidth: "80%",
                  m: "auto",
                  mt: 2,
                  minWidth: 100,
                  display: "flex",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <CardContent
                    sx={{
                      flex: "1 0 auto",
                      width: "0.7",
                      height: 200,
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="body2" component="p">
                        {data.content}
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
                {data.postImage.length > 0 && (
                  <CardMedia
                    component="img"
                    sx={{
                      p: 1,
                      m: "auto",
                      maxWidth: "20%",
                      minWidth: 80,
                    }}
                    image={data.postImage[0]}
                    alt="投稿画像"
                  />
                )}
              </Paper>
            ))}
          </Box>
        </Paper>
        {postData.map((postData: Post) => (
          <PostsData key={postData.id} postData={postData} isComment={true} />
        ))}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Grid container spacing={2}></Grid>
          <ActiveBeigeButton
            event={() => {
              navigate("/home/timeline");
            }}
            sxStyle={{ width: "20%", py: 2, mt: 10 }}
          >
            タイムラインを見る
          </ActiveBeigeButton>
        </Box>
      </DefaultLayout>
    </>
  );
});

export default Top;
