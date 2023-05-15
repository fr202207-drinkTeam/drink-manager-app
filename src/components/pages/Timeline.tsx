import { FC, memo, useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  SelectChangeEvent,
} from "@mui/material";
import { CachedOutlined } from "@mui/icons-material";
import PostForm from "../organisms/PostForm";
import PostData from "../organisms/PostData ";
import { Post } from "../../types/type";
import useGetPosts from "../../hooks/useGetPosts";
import TimelineHeader from "../organisms/TimelineHeader";
import useGetItems from "../../hooks/useGetItems";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { useLocation, useNavigate } from "react-router";

type Props = {};

const Timeline: FC<Props> = memo((props) => {
  // ログイン情報取得
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  // 商品情報取得
  const { itemData, itemError } = useGetItems();

  // 投稿データ取得時のクエリパラメータ要素
  // 投稿数
  const [postParamsNum, setpostParamsNum] = useState<number>(0);
  // 投稿かお知らせかの判別
  const [postUserAdmin, setPostUserAdmin] = useState<string>("");
  // 検索内容
  const [postSearch, setPostSearch] = useState<string>("");
  // 投稿データ取得時のクエリパラメータ
  const [postParams, setPostParams] = useState<string>(
    `?${postUserAdmin}${postSearch}_sort=createdAt&_order=desc&_start=${postParamsNum}&_end=${postParamsNum +
      3}`
  );

  // 投稿データ格納
  const [postData, setPostData] = useState<Post[]>([]);

  // 投稿データ取得時にそれ以上データがあるか判別
  const [noMoreData, setNoMoreData] = useState<boolean>(false);

  // 投稿を編集する際にその投稿を格納
  const [editPostData, setEditPostData] = useState<Post | null>(null);

  // 投稿が更新された際の投稿取得トリガー用
  const [reloadPost, setReloadPost] = useState<boolean>(false);

  // 取得した投稿データ、パラメータが更新されるたびに投稿データ取得
  const { fetchPostData, postLoading } = useGetPosts(postParams);

  // 商品詳細画面から遷移した場合、その商品のいいね数の一番多い投稿を表示
  const itemId = useRef<number>(0);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const itemInfo = location.state;
      if (itemInfo) {
        // 商品の投稿を全権取得
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

  // 各クエリパラメータ要素のstateが変わるたびに新しいパラメータをセット
  useEffect(() => {
    console.log("before", itemId.current, location.state)
    if (location.state && location.state.itemId !== 0) {
      return;
    }
    setPostParams(
      `?${postUserAdmin}${postSearch}_sort=createdAt&_order=desc&_start=${postParamsNum}&_end=${postParamsNum +
        3}&${reloadPost}`
    );
  }, [location.state, postParamsNum, postSearch, postUserAdmin, reloadPost]);

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

  // データ取得ボタン
  const FetchPostsButton = ({
    isHeaderButton = false,
  }: {
    isHeaderButton?: boolean;
  }) => {
    // データ取得処理
    const fetchPost = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      // ヘッダーのボタンの場合は投稿3件取得
      if (isHeaderButton) {
        setReloadPost(!reloadPost);
      } else {
        if (noMoreData || itemId.current !== 0) {
          setReloadPost(!reloadPost);
          navigate(location.state, {});
          itemId.current = 0;
          return;
        }
        // 画面下のボタンの場合は現在の表示に追加で3件取得
        setpostParamsNum(postParamsNum + 3);
      }
    };
    return (
      <Box display="flex" justifyContent="center">
        <IconButton
          onClick={fetchPost}
          sx={{
            background: "#89c3eb",
            color: "white",
            borderRadius: "none",
          }}
        >
          <CachedOutlined />
        </IconButton>
      </Box>
    );
  };

  // 投稿の絞込み
  const filterPosts = (event: SelectChangeEvent<string>) => {
    setPostData([]);
    const selectedRange = event.target.value;

    switch (selectedRange) {
      case "すべて":
        setpostParamsNum(0);
        setPostUserAdmin("");
        break;
      case "投稿":
        setpostParamsNum(0);
        setPostUserAdmin("userId_ne=1&");
        break;
      case "お知らせ":
        setpostParamsNum(0);
        setPostUserAdmin("userId=1&");
        break;
    }
  };

  // 投稿の検索
  const searchPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPostData([]);
    setpostParamsNum(0);
    if (
      !(event.target instanceof HTMLFormElement) ||
      !(event.target[0] instanceof HTMLInputElement)
    ) {
      return;
    }

    setPostSearch(`q=${event.target[0].value}&`);
  };

  return (
    <Paper sx={{ p: "20px", background: "#eae5e3" }}>
      <TimelineHeader
        searchPost={searchPost}
        filterPosts={filterPosts}
        fetchPostsButton={<FetchPostsButton isHeaderButton={true} />}
      />

      <Box sx={{ overflowY: "scroll", height: "1000px", px: "20px" }}>
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
            <FetchPostsButton />
          </Box>
        )}
      </Box>
    </Paper>
  );
});

export default Timeline;
