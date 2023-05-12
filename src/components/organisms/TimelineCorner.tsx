import { FC, memo, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Post } from "../../types/type";
import { Like } from "../../types/type";
import { Link } from "react-router-dom";

type Props = {
  itemId: number;
};

const TimelineCorner: FC<Props> = memo((props) => {
  const [postData, setPostData] = useState<Post[]>([]);
  const [displayPostId, setDisplayPostId] = useState<number>(0);
  const [displayPostData, setDisplayPostData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 該当する投稿を取得
  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      try {
        const res = await fetch(
          `http://localhost:8880/posts?itemId=${props.itemId}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (data.length > 0) {
          setPostData(data);
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [props.itemId]);

  // 関連する投稿のそれぞれのいいね数を取得
  useEffect(() => {
    const fetchLikes: () => Promise<void> = async () => {
      const allLikes: any[] = await Promise.all(
        postData.map(async (post) => {
          try {
            const res = await fetch(
              `http://localhost:8880/likes?postId=${post.id}`,
              {
                method: "GET",
              }
            );
            const data = await res.json();
            return data;
          } catch (error) {
            console.error("Error:", error);
          }
        })
      );
      const maxLikesLengthArray: Like[] = allLikes.reduce((acc, cur) => {
        return acc.length > cur.length ? acc : cur;
      }, []);

      if(maxLikesLengthArray.length === 0) {
        setDisplayPostId(postData[0].id)
        return;
      }

      const newDisplayPostId: number = maxLikesLengthArray[0].postId;
      if (newDisplayPostId !== displayPostId) {
        setDisplayPostId(newDisplayPostId);
      }
      
    };
    if (postData.length > 0) {
      fetchLikes();
    }
  }, [postData, displayPostId]);

  // 表示させる投稿データ取得
  useEffect(() => {
    const fetchDisplayPost: () => Promise<void> = async () => {
      if (displayPostId === 0) {
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:8880/posts/${displayPostId}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        setDisplayPostData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDisplayPost();
  }, [displayPostId]);

  return (
    <>
      <Card
        sx={{
          p: 1,
          backgroundColor: "#f3bf88",
          border: "2px dashed #fff ",
          boxShadow: " 0 0 0 8px #f3bf88",
          maxWidth: 500,
          minWidth: 100,
          display: "flex",
        }}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : postData.length > 0 && displayPostData ? (
          <>
            <Box sx={{ display: "flex" }}>
              <CardContent
                sx={{
                  flex: "1 0 auto",
                  width: "0.7",
                  overflowY: "scroll",
                  height: 200,
                }}
              >
                <Typography variant="body2" component="p">
                  {displayPostData.content}
                </Typography>
              </CardContent>
            </Box>
            {displayPostData.postImage && (
              <CardMedia
                component="img"
                sx={{
                  p: 1,
                  m: "auto",
                  maxWidth: 300,
                  minWidth: 80,
                }}
                image={displayPostData.postImage[0]}
                alt="画像"
              />
            )}
          </>
        ) : (
          <>
            <Typography
              variant="subtitle2"
              component="p"
              textAlign="center"
              sx={{ p: 1, mt: 3, mb: 3, mx: "auto" }}
            >
              該当するタイムラインがありません
            </Typography>
          </>
        )}
      </Card>
      <Link
        to={"/home/timeline"}
        state={{ itemId: props.itemId }}
        style={{ margin: "10px",  textDecoration: "underline", display: "block", textAlign: "end", fontSize: "14px"
        }}
      >
        タイムラインへ移動
      </Link>
    </>
  );
});

export default TimelineCorner;
