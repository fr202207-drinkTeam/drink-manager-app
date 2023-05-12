import { FC, memo, useEffect, useState } from "react";
import { Comment as CommentType, Post, Users } from "../../types/type";
import {
  Paper,
  Typography,
  ImageList,
  ImageListItem,
  Box,
  Button,
  Grid,
} from "@mui/material";
import Comment from "./Comment";
import parse from "html-react-parser";
import Likes from "../molecules/Likes";
import { EditNote } from "@mui/icons-material";
import { ActiveDarkBlueButton, ActiveRedButton } from "../atoms/button/Button";

// 投稿データ、コメント表示有無、ログインユーザー情報、投稿編集のset関数
type Props = {
  postData: Post;
  isComment: boolean;
  loginUser: Users;
  setEditPostData: React.Dispatch<React.SetStateAction<Post | null>> | null;
};

const PostData: FC<Props> = memo((props) => {
  const { postData, isComment, loginUser, setEditPostData } = props;

  // それぞれの投稿のユーザー情報格納
  const [userData, setUserData] = useState<Users | null>(null);
  // コメントデータの格納
  const [commentData, setCommentData] = useState<CommentType[]>([]);
  // ログインユーザーの投稿だった場合、メニューの表示
  const [menu, setMenu] = useState<boolean>(false);

  useEffect(() => {
    // 投稿のユーザー情報取得
    fetch(`http://localhost:8880/users/${postData.userId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    // 投稿のコメント取得
    fetch(`http://localhost:8880/comments?postId=${postData.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCommentData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [postData]);

  // 投稿内容の装飾
  let content = postData.content
    .replace("/nameS/", "<span style='display:none;'>")
    .replace("/nameE/", "</span>");
  if (postData.itemId) {
    content = postData.content
      .replace("\n", "<br />")
      .replace("/nameS/", "<span style='display:none;'>")
      .replace("/nameE/", "</span>");
  }

  // 投稿編集処理
  const editPost = () => {
    setMenu(false);
    setEditPostData!(postData);
    return;
  };
  // 投稿削除処理
  const deletePost = () => {
    fetch(`http://localhost:8880/posts/${postData.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        setMenu(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    return;
  };

  return (
    <Paper elevation={3} sx={{ mt: 2, height: "auto", py: "3px" }}>
      <Box sx={{ borderBottom: "1px solid", mx: "5px", pb: "5px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bolder", color: "blue" }}
          >
            {/* ユーザー情報取得次第、名前を表示 */}
            {userData && `${userData.firstName} ${userData.lastName}`}
          </Typography>
          {/* ログインユーザーの投稿の場合、メニュー画面を表示 */}
          {userData && loginUser.id === userData.id && !menu && (
            <Grid item xs={2}>
              <Button
                size="small"
                sx={{ color: "gray" }}
                onClick={() => {
                  setMenu(true);
                }}
              >
                <EditNote />
              </Button>
            </Grid>
          )}
          {menu && (
            <Grid item xs={2}>
              <ActiveDarkBlueButton event={editPost}>編集</ActiveDarkBlueButton>
              <ActiveRedButton event={deletePost}>削除</ActiveRedButton>
            </Grid>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="caption">
              {new Date(postData.createdAt).toLocaleString()}
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
          <Typography variant="body1">{parse(content)}</Typography>
        </Box>
        {postData.postImage.length > 0 && (
          <ImageList
            sx={{ width: "auto", height: 164 }}
            cols={3}
            rowHeight={164}
          >
            {postData.postImage.map((imageUrl: string) => {
              return (
                <Box
                  key={imageUrl}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <ImageListItem>
                    <img
                      src={imageUrl}
                      alt={imageUrl}
                      loading="lazy"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "contain",
                      }}
                    />
                  </ImageListItem>
                </Box>
              );
            })}
          </ImageList>
        )}
      </Box>
      <Likes postData={postData} />
      {/* 親コンポーネントからisCommentが渡ってきた場合のみコメントコンポーネントの表示 */}
      {isComment && (
        <Comment
          commentData={commentData}
          postData={postData}
          loginUser={loginUser}
        />
      )}
    </Paper>
  );
});

export default PostData;
