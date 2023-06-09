import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Comment as CommentType, Users } from "../../types/type";
import { EditNote } from "@mui/icons-material";
import MenuButtons from "../molecules/MenuButtons";

// コメントデータ、ログイン情報、編集コメントのset関数
type Props = {
  commentData: CommentType;
  loginUser: Users;
  setEditCommentData: React.Dispatch<React.SetStateAction<CommentType | null>>;
  reloadComment: boolean;
  setReloadComment: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentData: FC<Props> = memo((props) => {
  const {
    commentData,
    loginUser,
    setEditCommentData,
    reloadComment,
    setReloadComment,
  } = props;
  // コメントのユーザー情報格納
  const [userData, setUserData] = useState<Users | null>(null);
  // ログインユーザーのコメントだった場合、メニューボタン表示
  const [menu, setMenu] = useState<boolean>(false);

  // コメントのユーザー情報取得
  useEffect(() => {
    fetch(`http://localhost:8880/users/${commentData.userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [commentData]);

  // コメント編集処理
  const editComment = () => {
    setMenu(false);
    setEditCommentData(commentData);
    return;
  };
  // コメント削除処理
  const deleteComment = () => {
    fetch(`http://localhost:8880/comments/${commentData.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMenu(false);
        setReloadComment(!reloadComment);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    return;
  };

  return (
    <Box sx={{ m: "10px" }}>
      <Grid container sx={{ display: { xs: "inline-block", sm: "flex" } }}>
        <Grid item xs={12} sm={3}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bolder", color: "blue" }}
          >
            {/* ユーザーデータ取得次第、名前を表示 */}
            {userData && `${userData.firstName} ${userData.lastName}`}
          </Typography>
          <Typography variant="body2">
            {" "}
            {new Date(commentData.createdAt).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ pr: "10px" }}>
          <Typography variant="body1">{commentData.content}</Typography>
        </Grid>
        {/* ログインユーザーの投稿だった場合、メニューボタンを表示 */}
        {userData && loginUser.id === userData.id && !menu && (
          <Grid item xs={3}>
            <Stack
              direction="row"
              sx={{
                mx: 1,
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
              }}
            >
              <IconButton
                component="label"
                sx={{
                  color: "white",
                  background: "#ea6f00",
                  borderRadius: "3px",
                  mr: 1,
                }}
                onClick={() => {
                  setMenu(true);
                }}
                size="small"
              >
                <EditNote fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
        )}
        {menu && (
          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
              }}
            >
              <MenuButtons
                editHandler={editComment}
                deleteHandler={deleteComment}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
});

export default CommentData;
