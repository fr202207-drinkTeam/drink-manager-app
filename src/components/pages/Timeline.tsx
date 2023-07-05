import { FC, memo, useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import PostForm from "../organisms/PostForm";
import PostData from "../organisms/PostData ";
import { Post } from "../../types/type";
import useGetPosts from "../../hooks/useGetPosts";
import TimelineHeader from "../organisms/TimelineHeader";
import useGetItems from "../../hooks/useGetItems";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { useLocation } from "react-router";
import FetchPostsButton from "../atoms/button/FetchPostsButton";

type Props = {};

const Timeline: FC<Props> = memo((props) => {
  // ログイン情報取得
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  // 商品情報取得
  const { itemData, itemError } = useGetItems();
  // 投稿データ取得時のクエリパラメータ要素
  // 投稿数
  const [postParamsNum, setPostParamsNum] = useState<number>(3);
  // 投稿かお知らせかの判別
  const [postUserAdmin, setPostUserAdmin] = useState<string>("");
  // 検索内容
  const [postSearch, setPostSearch] = useState<string>("");
  // 投稿データ取得時のクエリパラメータ
  const [postParams, setPostParams] = useState<string>(
    `?${postUserAdmin}&${postSearch}&quantity=${postParamsNum}`
  );

  // 投稿データ格納
  const [postData, setPostData] = useState<Post[]>([]);

  // 投稿データ取得時にそれ以上データがあるか判別
  const [noMoreData, setNoMoreData] = useState<boolean>(false);

  // 投稿を編集する際にその投稿を格納
  const [editPostData, setEditPostData] = useState<Post | null>(null);

  // 投稿が更新された際の投稿取得トリガー用
  const [reloadPost, setReloadPost] = useState<boolean>(false);

  // 投稿が更新された際の投稿取得トリガー用
  const [searchError, setSearchError] = useState<boolean>(false);

  // 取得した投稿データ、パラメータが更新されるたびに投稿データ取得
  const { fetchPostData, postLoading } = useGetPosts(postParams, reloadPost);

  // 商品詳細画面から遷移した場合、その商品のいいね数の一番多い投稿を表示
  const itemId = useRef<number>(0);

  const location = useLocation();

  useEffect(() => {
    (async () => {
      const itemInfo = location.state;
      if (itemInfo) {
        // 商品の投稿を全件取得
        const fetchItemPostData = await fetch(
          `http://localhost:8880/posts?itemId=${itemInfo.itemId}`,
          {
            method: "GET",
          }
        );
        const itemPostData = await fetchItemPostData.json();
        // 投稿を元にいいね数を取得
        const fetchLikes = async () => {
          const allLikes: any[] = await Promise.all(
            itemPostData.map(async (post: Post) => {
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
          // いいね数の比較
          const maxLikesLengthArray = allLikes.reduce((acc, cur) => {
            return acc.length > cur.length ? acc : cur;
          }, []);
          // どの投稿にもいいねがなかった場合
          if (maxLikesLengthArray.length === 0) {
            setPostData([itemPostData[0]]);
            return;
          }
          // いいねがあった場合、その投稿を表示
          const displayPost = itemPostData.find(
            (post: Post) => post.id === maxLikesLengthArray[0].postId
          );
          setPostData([displayPost]);
        };
        fetchLikes();
        // 商品idがあるかどうかの設定
        itemId.current = itemInfo.itemId;
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("postParams", postParams)
  // 新しく取得した投稿データと既に取得していたデータをまとめる
  useEffect(() => {
    if (!fetchPostData) {
      return;
    }
    setPostData(() => {
      // 新規データが存在しない場合
      if (!fetchPostData.length) {
        setNoMoreData(true);
        return [...postData];
      } else {
        setNoMoreData(false);

        // 新規、既存のデータが同じでないことを確認
        const preventDuplication = postData.some((post: Post) => {
          return (
            post.id === fetchPostData[0].id ||
            (fetchPostData[1] && post.id === fetchPostData[1].id) ||
            (fetchPostData[2] && post.id === fetchPostData[2].id)
          );
        });
        // 新規、既存のデータが同じだった場合、既存データを返す
        if (preventDuplication) {
          return [...fetchPostData];
        }
        // 新規、既存のデータが同じでない場合、まとめたものを返す
        return [...postData, ...fetchPostData];
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPostData]);

  return (
    <Paper sx={{ p: "20px", background: "#eae5e3" }}>
      <TimelineHeader
        setPostData={setPostData}
        noMoreData={noMoreData}
        itemId={itemId}
        setPostParamsNum={setPostParamsNum}
        postParamsNum={postParamsNum}
        setPostSearch={setPostSearch}
        postSearch={postSearch}
        setPostUserAdmin={setPostUserAdmin}
        postUserAdmin={postUserAdmin}
        setPostParams={setPostParams}
        postParams={postParams}
        setSearchError={setSearchError}
        searchError={searchError}
        setReloadPost={setReloadPost}
        reloadPost={reloadPost}
      />
      <Box id="top" />
      <Box
        sx={{
          overflowY: "scroll",
          height: "1000px",
          px: { xs: "0", sm: "20px" },
        }}
      >
        <PostForm
          itemData={itemData}
          itemError={itemError}
          loginUser={loginUser}
          editPostData={editPostData}
          setEditPostData={setEditPostData}
          reloadPost={reloadPost}
          setReloadPost={setReloadPost}
        />

        {/* 初期ロード時 */}
        {postData.length === 0 && postLoading && (
          <Box sx={{ textAlign: "center", mt: "20px" }}>
            <CircularProgress />
          </Box>
        )}
        {/* データが存在する場合 */}
        {postData.map((postData: Post) => (
          <PostData
            key={postData.id}
            postData={postData}
            isComment={true}
            loginUser={loginUser}
            setEditPostData={setEditPostData}
            reloadPost={reloadPost}
            setReloadPost={setReloadPost}
          />
        ))}

        {/* 新規データが存在しない場合 */}
        {fetchPostData && !postLoading && noMoreData && (
          <p>これ以上投稿が見つかりません。</p>
        )}
        {/* 追加ロードボタン */}
        {!postLoading && (
          <Box sx={{ mt: "20px" }}>
            <FetchPostsButton
              isHeader={false}
              setPostData={setPostData}
              setReloadPost={setReloadPost}
              reloadPost={reloadPost}
              setPostParamsNum={setPostParamsNum}
              postParamsNum={postParamsNum}
              noMoreData={noMoreData}
              itemId={itemId}
              setPostParams={setPostParams}
              postParams={postParams}
              postUserAdmin={postUserAdmin}
              postSearch={postSearch}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
});

export default Timeline;
