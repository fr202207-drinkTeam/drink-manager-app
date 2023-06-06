import { Box, Button, Grid, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { FC, memo, useEffect, useState } from "react";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { Post } from "../../types/type";

type Props = {
  postData: Post;
};

// いいねコンポーネント
const Likes: FC<Props> = memo((props) => {
  const { postData } = props;

  // いいねしたかどうか
  const [liked, setLiked] = useState<boolean>(false);
  // いいねしていた場合、削除時に判別するためのid格納
  const [likeId, setLikeId] = useState<number>(0);
  // 投稿に対するいいねの数
  const [likedQuantity, setLikedQuantity] = useState<number | null>(null);

  // ログイン情報取得
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  // いいね数の取得
  fetch(`http://localhost:8880/likes?postId=${postData.id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      setLikedQuantity(data.length);
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  // いいねしているかどうかの判別
  useEffect(() => {
    fetch(
      `http://localhost:8880/likes?postId=${postData.id}&userId=${loginUser.id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setLiked(false);
        } else {
          setLiked(true);
          setLikeId(data[0].id);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked]);

  // いいね処理
  const postLike = () => {
    const newLike = {
      postId: postData.id,
      userId: loginUser.id,
      time: new Date(),
    };
    // まだいいねがされていない場合、いいね処理
    if (!liked) {
      fetch("http://localhost:8880/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLike),
      })
        .then(() => {
          setLiked(true);
          if (!likedQuantity) {
            return;
          }
          setLikedQuantity(likedQuantity + 1);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
    // すでにいいねされていた場合、いいね削除
    else {
      fetch(`http://localhost:8880/likes/${likeId}`, {
        method: "DELETE",
      })
        .then(() => {
          setLiked(false);
          if (!likedQuantity) {
            return;
          }
          setLikedQuantity(likedQuantity - 1);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  return (
    <Box sx={{ borderBottom: "1px solid", mx: "5px" }}>
      <Grid container alignItems="center" spacing={2} sx={{ color: "gray" }}>
        <Grid item sm={5}>
          {likedQuantity !== null && (
            <Typography variant="body2">{`${likedQuantity}人がいいねと言っています`}</Typography>
          )}
        </Grid>
        <Grid item sm={3}>
          {liked ? (
            <Button
              sx={{
                p: "0px",
                color: "black",
                backgroundColor: "#C89F81",
                my: "3px",
                fontWeight: "bold",
              }}
              onClick={postLike}
            >
              いいね済
            </Button>
          ) : (
            <Button
              sx={[{
                p: "0px",
                color: "white",
                backgroundColor: "#ea6f00",
                my: "3px",
                fontWeight: "bold",
              }, {
                "&:hover": {
                  color: "black",
                },
              }]}
              onClick={postLike}
            >
              いいね
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
});

export default Likes;
