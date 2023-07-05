import { FC, memo } from "react";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import DefaultLayout from "../layout/DefaultLayout";
import { Grid } from "@mui/material";
import ItemCard from "../organisms/card/ItemCard";
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
import { Post } from "../../types/type";
import PostData from "../organisms/PostData ";
import useGetPosts from "../../hooks/useGetPosts";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import Slider from "../atoms/slider/Slider";
import { a } from "msw/lib/glossary-de6278a9";
import axios from "axios";
type Props = {};

const Top: FC<Props> = memo((props) => {
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  const navigate = useNavigate();
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editPostData, setEditPostData] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:50000/posts?quantity=3")
      .then((res) => res.data)
      .then((data) => {
        setPostData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <DefaultLayout>
        <Box id="top" />
        <Box sx={{ textAlign: "center" }}>
          <Card
            sx={{
              p: 1,
              backgroundColor: "#fff",
              border: "4px dotted #ffdead ",
              textAlign: "center",
              width: { sm: "80%", md: "70%", lg: "60%" },
              borderRadius: "20px",
              m: "auto",
            }}
          >
            <Typography
              gutterBottom
              component="div"
              sx={{ mt: 4, color: "#595857", fontSize: "25px" }}
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
              sx={{ mb: 4, color: "#595857", fontSize: "16px" }}
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
            sxStyle={{
              width: { xs: "60%", sm: "45%", md: "35%" },
              height: "auto",
              fontSize: { xs: "20px", sm: "23px" },
              my: "50px",
            }}
          >
            投票する
          </ActivePinkButton>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <PollRanking />
          <ActiveBeigeButton
            event={() => {
              navigate("/home/poll/pollresult");
            }}
            sxStyle={{
              width: { xs: "60%", sm: "45%", md: "35%" },
              height: "auto",
              fontSize: { xs: "20px", sm: "23px" },
              margin: "50px",
            }}
          >
            過去の投票結果を見る
          </ActiveBeigeButton>
        </Box>
        <Card
          sx={{
            p: 1,
            backgroundColor: "#fff",
            border: "4px dotted #ffdead ",
            textAlign: "center",
            width: { sm: "80%", md: "70%", lg: "60%" },
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
        {postData.length > 0 ? (
          <Paper sx={{ p: "20px", background: "#eae5e3", mt: "50px" }}>
            <Box sx={{ overflowY: "scroll", height: "auto", px: "20px" }}>
              <>
                {postData.map((postData: Post) => (
                  <PostData
                    key={postData.id}
                    postData={postData}
                    isComment={false}
                    loginUser={loginUser}
                    setEditPostData={null}
                  />
                ))}
              </>
            </Box>
          </Paper>
        ) : (
          <Box sx={{ textAlign: "center", mt: 6 }}>
            まだ投稿がありません。ぜひ投稿してみてね！
          </Box>
        )}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Grid container spacing={2}></Grid>
          <ActiveBlueButton
            event={() => {
              navigate("/home/timeline");
            }}
            sxStyle={{
              width: { xs: "60%", sm: "45%", md: "35%" },
              height: "auto",
              fontSize: { xs: "20px", sm: "23px" },
              margin: "50px",
            }}
          >
            タイムラインを見る
          </ActiveBlueButton>
        </Box>
      </DefaultLayout>
    </>
  );
});
export default Top;
