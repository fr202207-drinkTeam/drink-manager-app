import { FC, memo, useEffect, useState } from "react";
import {
  Comment as CommentType,
  Like,
  Post,
  PostImage,
  Users,
} from "../../types/type";
import {
  Paper,
  Typography,
  ImageList,
  ImageListItem,
  Box,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Comment from "./Comment";
import Likes from "../molecules/Likes";
import { EditNote } from "@mui/icons-material";
import MenuButtons from "../molecules/MenuButtons";
import { Link } from "react-router-dom";
import axios from "axios";

// 投稿データ、コメント表示有無、ログインユーザー情報、投稿編集のset関数
type Props = {
  postData: Post;
  isComment: boolean;
  loginUser: Users;
  setEditPostData: React.Dispatch<React.SetStateAction<Post | null>> | null;
  reloadPost?: boolean;
  setReloadPost?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostData: FC<Props> = memo((props) => {
  const {
    postData,
    isComment,
    loginUser,
    setEditPostData,
    reloadPost,
    setReloadPost,
  } = props;

  // コメントデータの格納
  const [commentData, setCommentData] = useState<CommentType[]>([]);

  // ログインユーザーの投稿だった場合、メニューの表示
  const [menu, setMenu] = useState<boolean>(false);

  // コメントリロードトリガー
  const [reloadComment, setReloadComment] = useState<boolean>(false);

  useEffect(() => {
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
  }, [postData, reloadComment]);

  // 投稿編集処理
  const editPost = () => {
    setMenu(false);
    setEditPostData!(postData);
    return;
  };
  
  // 投稿削除処理
  const deletePost = () => {
    // 投稿削除
    axios
      .delete(`http://localhost:50000/posts/${postData.id}`)
      .then((res) => {
        setMenu(false);
        // 投稿に関連するコメントの削除
        fetch(`http://localhost:8880/comments?postId=${postData.id}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((comments) => {
            comments.forEach((comment: CommentType) => {
              fetch(`http://localhost:8880/comments/${comment.id}`, {
                method: "DELETE",
              });
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });

        // 投稿に関連するいいねの削除
        fetch(`http://localhost:8880/likes?postId=${postData.id}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((likes) => {
            likes.forEach((like: Like) => {
              fetch(`http://localhost:8880/likes/${like.id}`, {
                method: "DELETE",
              });
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      })
      .then(() => {
        setReloadPost!(!reloadPost);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    return;
  };

  // 投稿種類のタグ
  const PostTag = (isAdmin: boolean) => {
    return (
      <Typography
        variant="body2"
        sx={{
          color: "white",
          background: isAdmin ? "#ea6f00" : "#C89F81",
          mr: "10px",
          px: "3px",
          borderRadius: "2px",
          display: "inline-block",
        }}
      >
        {isAdmin ? "お知らせ" : "投稿"}
      </Typography>
    );
  };

  // レスポンシブ対応画面
  const theme = useTheme();
  const imageRowsLg = useMediaQuery(theme.breakpoints.down("lg"));
  const imageRowsSm = useMediaQuery(theme.breakpoints.down("sm"));

  const imageRows = () => {
    if (imageRowsSm) {
      return 1;
    } else if (imageRowsLg) {
      return 2;
    } else {
      return 3;
    }
  };

  const imageListHeight = () => {
    switch (postData.postImages.length) {
      case 1:
        return "230px";
      case 2:
        return "460px";
      case 3:
        return "690px";
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ mt: 2, height: "auto", py: "3px", wordWrap: "break-word" }}
    >
      <Box sx={{ mx: "5px", pb: "5px" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: { xs: "block", sm: "flex" } }}>
              <Box sx={{ mt: "2px" }}>
                {/* ユーザーが管理者かどうかでそれぞれの投稿にタグ付け */}
                {postData.user.isAdmin && PostTag(true)}
                {!postData.user.isAdmin && PostTag(false)}
              </Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bolder", color: "blue" }}
              >
                {/* ユーザー情報取得次第、名前を表示 */}
                {`${postData.user.firstName} ${postData.user.lastName}`}
              </Typography>
              <Box sx={{ alignItems: "flex-end", mx: { xs: 0, sm: 2 } }}>
                <Typography variant="caption">
                  {new Date(postData.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* ログインユーザーの投稿の場合、メニュー画面を表示 */}
          {loginUser.id === postData.userId && !menu && (
            <Grid>
              <IconButton
                aria-label={`menuIcon${postData.id}`}
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
            </Grid>
          )}
          {menu && (
            <MenuButtons editHandler={editPost} deleteHandler={deletePost} />
          )}
        </Box>

        <Box>
          <Typography variant="body1">{postData.content}</Typography>
          {postData && (
            <Link to={`/home/search/${postData.itemId}`}>
              <Typography variant="body1" sx={{ color: "blue" }}>
                # {postData.item.itemName}
              </Typography>
            </Link>
          )}
        </Box>
        {postData.postImages.length > 0 && (
          <ImageList
            sx={{
              width: "auto",
              height: {
                xs: `${imageListHeight}`,
                sm: `${postData.postImages.length < 3 ? "170px" : "340px"}`,
                lg: "170px",
              },
              my: 0,
              mx: "auto",
            }}
            cols={imageRows()}
            rowHeight={164}
          >
            {/* TODO any型をなおす */}
            {postData.postImages.map((image: PostImage) => {
              return (
                <ImageListItem key={image.id} sx={{ alignItems: "center" }}>
                  <img
                    src={image.path}
                    alt={image.path}
                    loading="lazy"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "contain",
                    }}
                  />
                </ImageListItem>
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
          reloadComment={reloadComment}
          setReloadComment={setReloadComment}
        />
      )}
    </Paper>
  );
});

export default PostData;
