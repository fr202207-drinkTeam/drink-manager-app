import { Button, Grid, InputBase, Paper, Typography } from "@mui/material";
import { FC, memo, useEffect, useRef, useState } from "react";
import { Comment as CommentType, Post, Users } from "../../types/type";
import { PlaylistAdd } from "@mui/icons-material";
import CommentData from "./CommentData";

// コメントデータ、投稿データ、ログイン情報
type Props = {
  commentData: CommentType[];
  postData: Post;
  loginUser: Users;
  reloadComment: boolean;
  setReloadComment: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO コメントコンポーネント
const Comment: FC<Props> = memo((props) => {
  const {
    commentData,
    postData,
    loginUser,
    reloadComment,
    setReloadComment,
  } = props;

  // コメント編集の場合、そのコメントを格納
  const [editCommentData, setEditCommentData] = useState<CommentType | null>(
    null
  );
  // コメントの表示非表示の切り替え
  const [seeComment, setSeeComment] = useState<boolean>(false);
  // コメント用inputのref
  const commentInput = useRef<any>("");
  // コメント内容のバリデーションチェック
  const [commentError, setCommentError] = useState<boolean>(false);

  // コメントの表示非表示の切り替え
  const commentToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    setSeeComment(!seeComment);
  };

  // コメント処理
  const postComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // バリデーションチェック
    if (
      commentInput.current.childNodes[0].value.length < 5 ||
      commentInput.current.childNodes[0].value.length > 120
    ) {
      setCommentError(true);
      return;
    }

    if (
      !(event.target instanceof HTMLFormElement) ||
      !(event.target[0] instanceof HTMLInputElement)
    ) {
      return;
    }
    // コメント編集の場合
    if (editCommentData) {
      const editedComment = {
        content: event.target[0].value,
        updatedAt: new Date(),
      };

      fetch(`http://localhost:8880/comments/${editCommentData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedComment),
      }).then(() => {
        commentInput.current.childNodes[0].value = "";
        setCommentError(false);
        setEditCommentData(null);
        setReloadComment(!reloadComment);
      });

      return;
    }

    // 新規コメントの場合
    const newComment = {
      userId: loginUser.id,
      content: event.target[0].value,
      postId: postData.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    fetch("http://localhost:8880/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }).then(() => {
      commentInput.current.childNodes[0].value = "";
      setSeeComment(true);
      setReloadComment(!reloadComment);
      setCommentError(false);
    });
  };

  // コメント編集の場合、そのコメント内容をinputに入れる
  useEffect(() => {
    if (!editCommentData) {
      return;
    }
    commentInput.current.childNodes[0].value = editCommentData.content;
  }, [editCommentData]);

  return (
    <>
      {/* コメント入力内容に不備があった場合 */}
      {commentError && (
        <Typography
          variant="body1"
          sx={{ backgroundColor: "pink", m: "3px", borderRadius: "3px" }}
        >
          コメントは5文字以上120文字以内で入力してください
        </Typography>
      )}
      <Paper
        component="form"
        onSubmit={postComment}
        elevation={0}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          m: "5px",
          height: "35px",
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <InputBase
              name="commentInput"
              sx={{ flex: 1, border: "1px solid" }}
              placeholder="コメント"
              fullWidth
              ref={commentInput}
            />
          </Grid>

          <Grid item xs={2}>
            <Button
              size="small"
              type="submit"
              variant="contained"
              sx={{
                mx: "5px",
                background: "#8FB8D6",
                fontWeight: "bold",
                ":hover": {
                  background: "#8FB8D6",
                  opacity: 0.7,
                  cursor: "pointer",
                },
                fontFamily: "'M PLUS 1p', sans-serif",
              }}
            >
              コメント
            </Button>
          </Grid>
          {/* コメントデータが存在する場合 */}
          {commentData.length > 0 && (
            <Grid item xs={3}>
              <Button
                size="small"
                sx={{ color: "gray", m: "10px" }}
                onClick={commentToggle}
              >
                <PlaylistAdd />
                コメント表示
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
      {/* コメントデータが存在し、コメントを表示にした場合 */}
      {commentData &&
        seeComment &&
        commentData.map((comment: CommentType) => (
          <CommentData
            key={comment.id}
            commentData={comment}
            loginUser={loginUser}
            setEditCommentData={setEditCommentData}
            reloadComment={reloadComment}
            setReloadComment={setReloadComment}
          />
        ))}
    </>
  );
});

export default Comment;
