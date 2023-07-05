import { useState, useEffect} from "react";
import { Post } from "../types/type";
import axios from "axios";

// 投稿データ取得hooks
const useGetPosts = (
  params: string,
  reload: boolean
) => {
  const [fetchPostData, setfetchPostData] = useState<Post[] | null>(null);
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [postError, setPostError] = useState<boolean>(false);

  useEffect(() => {
  console.log("params", params)
    setPostLoading(true);
    // データ取得
    axios.get(`http://localhost:50000/posts${params}`)
      .then((res) => res.data)
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
  }, [params, reload]);

  return { fetchPostData, postLoading, postError };
};

export default useGetPosts;
