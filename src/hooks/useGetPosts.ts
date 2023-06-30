import { useState, useEffect} from "react";
import { Post } from "../types/type";

// 投稿データ取得hooks
const useGetPosts = (
  params: string
) => {
  const [fetchPostData, setfetchPostData] = useState<Post[] | null>(null);
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [postError, setPostError] = useState<boolean>(false);

  useEffect(() => {
    setPostLoading(true);
    // データ取得
    fetch(`http://localhost:50000/posts${params}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        // データがある場合は通常通りデータをセット
        setfetchPostData(data);
        setPostLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setPostError(true);
        setPostLoading(false);
      });
  }, [params]);

  return { fetchPostData, postLoading, postError };
};

export default useGetPosts;
