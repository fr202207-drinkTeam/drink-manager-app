import { Box, Button, Grid, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Comment as CommentType, Users } from "../../types/type";
import { EditNote } from "@mui/icons-material";
import { ActiveDarkBlueButton } from "../atoms/button/Button";
import ModalWindow from "./ModalWindow";

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
        console.log("delete");
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
      <Grid container spacing={1}>
        <Grid item xs={3}>
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
        <Grid item xs={7}>
          <Typography variant="body1">{commentData.content}</Typography>
        </Grid>
        {/* ログインユーザーの投稿だった場合、メニューボタンを表示 */}
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
            <ActiveDarkBlueButton event={editComment}>
              編集
            </ActiveDarkBlueButton>
            <ModalWindow
              title=""
              content="内容は破棄されますがよろしいですか？"
              openButtonColor="red"
              completeButtonColor="red"
              completeButtonName="確定"
              buttonName="削除"
              completeAction={deleteComment}
              cancelButtonColor="gray"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
});

export default CommentData;
