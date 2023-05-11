import { FC, memo, useEffect, useState } from "react";
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

type Props = {};

const Timeline: FC<Props> = memo((props) => {
  // TODO 受け手
  // const location = useLocation();
  // const itemId = location.state;
  // console.log("itemId", itemId);

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
    `?${postUserAdmin}${postSearch}_sort=createdAt&_order=desc&_start=${postParamsNum}&_end=${
      postParamsNum + 3
    }`
  );

  // 投稿データ格納
  const [postData, setPostData] = useState<Post[]>([]);

  // 投稿データ取得時にそれ以上データがあるか判別
  const [noMoreData, setNoMoreData] = useState<boolean>(false);

  // 投稿を編集する際にその投稿を格納
  const [editPostData, setEditPostData] = useState<Post | null>(null);

  // 取得した投稿データ、パラメータが更新されるたびに投稿データ取得
  const { fetchPostData, postLoading } = useGetPosts(postParams);

  // 各クエリパラメータ要素のstateが変わるたびに新しいパラメータをセット
  useEffect(() => {
    setPostParams(
      `?${postUserAdmin}${postSearch}_sort=createdAt&_order=desc&_start=${postParamsNum}&_end=${
        postParamsNum + 3
      }`
    );
  }, [postParamsNum, postSearch, postUserAdmin]);

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
          return post.id === fetchPostData[0].id;
        });
        // 新規、既存のデータが同じだった場合、既存データを返す
        if (preventDuplication) {
          return postData;
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
        window.location.reload();
      } else {
        if (noMoreData) {
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
        setPostUserAdmin("userId_ne=2&");
        break;
      case "お知らせ":
        setpostParamsNum(0);
        setPostUserAdmin("userId=2&");
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
