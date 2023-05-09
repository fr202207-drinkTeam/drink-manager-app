import { FC, memo, useEffect, useState } from "react";
import { Post, Users } from "../../types/type";
import { InputBase, Paper, Typography, Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { PlaylistAdd } from "@mui/icons-material";
import Comments from "../molecules/Comments";

// 投稿データ、コメント表示有無
type Props = {
  postData: Post;
  isComment: boolean;
};

const PostData: FC<Props> = memo((props) => {
  const { postData, isComment } = props;
  // それぞれの投稿のユーザー情報格納
  const [userData, setUserData] = useState<Users | null>(null);

  // ユーザー情報取得
  useEffect(() => {
    if (postData.userId === 0) {
      return;
    }
    fetch(`http://localhost:8880/users/${postData.userId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [postData]);

  return (
    <>
      {
        // データがそれ以上無いことを知らせるダミーデータの場合
        postData.id === 0 ? (
          <Box sx={{ mt: "20px" }}>
            <Typography variant="body1">
              これ以上投稿が見つかりません
            </Typography>
          </Box>
        ) : (
          // データがある場合
          <Paper elevation={3} sx={{ mt: 2, height: "auto", py: "3px" }}>
            <Box sx={{ borderBottom: "1px solid", mx: "5px" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bolder", color: "blue" }}
              >
                {userData && userData.firstName}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="body2">
                    {/* {postData.createdAt.toString()} */}
                  </Typography>
                </Box>
                {/* ユーザーが管理者かどうかでそれぞれの投稿にタグ付け */}
                {userData?.isAdmin ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white",
                      background: "#ea6f00",
                      mr: "10px",
                      px: "3px",
                      borderRadius: "2px",
                    }}
                  >
                    お知らせ
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "white",
                      background: "#C89F81",
                      mr: "10px",
                      px: "3px",
                      borderRadius: "2px",
                    }}
                  >
                    投稿
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography variant="body1">{postData.content}</Typography>
              </Box>
            </Box>

            <Box>
              <Paper
                component="form"
                elevation={0}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  m: "5px",
                  height: "35px",
                }}
              >
                <Grid container alignItems="center" spacing={5}>
                  <Grid item xs={7}>
                    <InputBase
                      sx={{ flex: 1, border: "1px solid" }}
                      placeholder="コメント"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <Button
                      size="small"
                      type="submit"
                      sx={{ color: "white", background: "#89c3eb", m: "10px" }}
                    >
                      コメント
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      size="small"
                      type="submit"
                      sx={{ color: "gray", m: "10px" }}
                    >
                      <PlaylistAdd />
                      コメント表示
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              {isComment && <Comments />}
            </Box>
          </Paper>
        )
      }
    </>
  );
});

export default PostData;
