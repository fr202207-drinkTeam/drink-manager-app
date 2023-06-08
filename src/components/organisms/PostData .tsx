import { FC, memo, useEffect, useState } from "react";
import {
  Comment as CommentType,
  Items,
  Like,
  Post,
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
} from "@mui/material";
import Comment from "./Comment";
import parse from "html-react-parser";
import Likes from "../molecules/Likes";
import { EditNote } from "@mui/icons-material";
import MenuButtons from "../molecules/MenuButtons";
import { Link } from "react-router-dom";

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

  // それぞれの投稿のユーザー情報格納
  const [userData, setUserData] = useState<Users | null>(null);

  // 商品名の格納
  const [itemData, setItemData] = useState<Items | null>(null);

  // コメントデータの格納
  const [commentData, setCommentData] = useState<CommentType[]>([]);

  // ログインユーザーの投稿だった場合、メニューの表示
  const [menu, setMenu] = useState<boolean>(false);

  // コメントリロードトリガー
  const [reloadComment, setReloadComment] = useState<boolean>(false);

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
    // 投稿の商品名取得
    if (+postData.itemId !== 0) {
      fetch(`http://localhost:8880/items/${postData.itemId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setItemData(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else {
      setItemData(null);
    }

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

  // 投稿内容の装飾
  let content = postData.content
    .replace("/nameS/", "<span style='display:none;'>")
    .replace("/nameE/", "</span>");
  if (postData.itemId) {
    content = postData.content
      .replace("/itemS/", "<span style='display:none;'>")
      .replace("/itemE/", "</span>")
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
    // 投稿削除
    fetch(`http://localhost:8880/posts/${postData.id}`, {
      method: "DELETE",
    })
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

  return (
    <Paper
      elevation={3}
      sx={{ mt: 2, height: "auto", py: "3px" }}
      onClick={() => {
        if (menu) {
          setMenu(false);
        }
      }}
    >
      <Box sx={{ borderBottom: "1px solid", mx: "5px", pb: "5px" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ mt: "2px" }}>
                {/* ユーザーが管理者かどうかでそれぞれの投稿にタグ付け */}
                {userData && userData.isAdmin && (
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
                )}
                {userData && !userData.isAdmin && (
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
              <Typography
                variant="body1"
                sx={{ fontWeight: "bolder", color: "blue" }}
              >
                {/* ユーザー情報取得次第、名前を表示 */}
                {userData && `${userData.firstName} ${userData.lastName}`}
              </Typography>
              <Box sx={{ alignItems: "flex-end", mx: 2 }}>
                <Typography variant="caption">
                  {new Date(postData.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* ログインユーザーの投稿の場合、メニュー画面を表示 */}
          {userData && loginUser.id === userData.id && !menu && isComment && (
            <Grid>
              <IconButton
                aria-label="menuIcon"
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
            </Grid>
          )}
          {menu && (
            <MenuButtons editHandler={editPost} deleteHandler={deletePost} />
          )}
        </Box>

        <Box>
          <Typography variant="body1">{parse(content)}</Typography>
          {itemData && (
            <Link to={`/home/search/${itemData.id}`}>
              <Typography variant="body1" sx={{ color: "blue" }}>
                # {itemData.name}
              </Typography>
            </Link>
          )}
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
          reloadComment={reloadComment}
          setReloadComment={setReloadComment}
        />
      )}
    </Paper>
  );
});

export default PostData;
