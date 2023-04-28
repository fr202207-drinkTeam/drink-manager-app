import { useState, useEffect, useRef } from "react";
import { Post } from "../types/type";

// 投稿データ取得hooks
const useGetPosts = (params: string = "") => {
  const [postsData, setPostsData] = useState<Post[] | null>([]);
  // useEffenctの初回レンダリング回避
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // データ取得
    fetch(`http://localhost:8880/posts${params}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        // データが0件だった場合、投稿がないことを判別するために、ダミーデータをセット
        if (data.length === 0) {
          setPostsData([
            {
              userId: 0,
              content: "データなし",
              itemId: 0,
              postImage: [],
              createdAt: new Date(),
              updatedAt: new Date(),
              id: 0,
            },
          ]);
          return;
        }
        // データがある場合は通常通りデータをセット
        setPostsData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params]);

  return postsData;
};

export default useGetPosts;
