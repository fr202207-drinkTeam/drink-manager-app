import { FC, memo, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { CachedOutlined } from "@mui/icons-material";
import PostForm from "../organisms/PostForm";
import PostsData from "../organisms/PostData ";
import { Post } from "../../types/type";
import useGetPosts from "../../hooks/useGetPosts";

type Props = {};

const Timeline: FC<Props> = memo((props) => {
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
  const [postsData, setPostsData] = useState<Post[]>([]);

  // 取得した投稿データ、パラメータが更新されるたびに投稿データ取得
  const fetchPostsData: Post[] | null = useGetPosts(postParams);

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
    setPostsData(() => {
      // 新規、既存両方のデータが存在する場合
      if (postsData && fetchPostsData) {
        // 新規、既存のデータが同じでないことを確認
        const preventDuplication = postsData.some((post: Post) => {
          return post.id === fetchPostsData[0].id;
        });
        // 新規、既存のデータが同じだった場合、既存データを返す
        if (preventDuplication) {
          return postsData;
        }
        // 新規、既存のデータが同じでない場合、まとめたものを返す
        return [...postsData, ...fetchPostsData];
      }
      // 既存データしかない場合、既存データを返す
      else if (postsData && !fetchPostsData) {
        return postsData;
      }
      // 新規データしかない場合、新規データを返す
      else if (!PostsData && fetchPostsData) {
        return fetchPostsData;
      }
      // 新規、既存両方のデータが存在しない場合（初期ロード時）、空の配列を返す
      else {
        return [];
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPostsData]);

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
        setPostsData([]);
        setpostParamsNum(0);
      } else {
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
    const selectedRange = event.target.value;
    switch (selectedRange) {
      case "すべて":
        setPostsData([]);
        setpostParamsNum(0);
        setPostUserAdmin("");
        break;
      case "投稿":
        setPostsData([]);
        setpostParamsNum(0);
        setPostUserAdmin("userId_ne=2&");
        break;
      case "お知らせ":
        setPostsData([]);
        setpostParamsNum(0);
        setPostUserAdmin("userId=2&");
        break;
    }
  };

  // 投稿の検索
  const searchPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !(event.target instanceof HTMLFormElement) ||
      !(event.target[0] instanceof HTMLInputElement)
    ) {
      return;
    }
    setPostsData([]);
    setpostParamsNum(0);
    setPostSearch(`q=${event.target[0].value}&`);
  };

  return (
    <Paper sx={{ p: "20px", background: "#eae5e3" }}>
      <Grid
        container
        sx={{
          flexGrow: 1,
          borderBottom: 1,
          py: "10px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Grid item xs={4}>
          <Typography variant="h4">タイムライン</Typography>
        </Grid>

        <Grid item xs={5}>
          <Paper
            component="form"
            onSubmit={searchPost}
            elevation={0}
            sx={[
              {
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                maxWidth: "215px",
                mr: "5px",
                height: "35px",
              },
              {
                "&:hover": {
                  border: "1px solid",
                  p: "1px 3px",
                },
              },
            ]}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="検索" />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Select
            size="small"
            fullWidth
            defaultValue="すべて"
            sx={{ border: "none", backgroundColor: "white" }}
            onChange={filterPosts}
          >
            <MenuItem value="すべて">すべて</MenuItem>
            <MenuItem value="投稿">投稿</MenuItem>
            <MenuItem value="お知らせ">お知らせ</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={1} sx={{ p: "none" }}>
          <FetchPostsButton isHeaderButton={true} />
        </Grid>
      </Grid>
      <Box sx={{ overflowY: "scroll", height: "1000px", px: "20px" }}>
        <PostForm />

        {/* 初期ロード時 */}
        {postsData.length === 0 && (
          <Box sx={{ textAlign: "center", mt: "20px" }}>
            <CircularProgress />
          </Box>
        )}
        {/* データが存在する場合(データ取得したが、なかった場合もダミーデータがある) */}
        {postsData && postsData.length > 0 && (
          <>
            {postsData.map((postData: Post) => (
              <PostsData
                key={postData.id}
                postData={postData}
                isComment={true}
              />
            ))}
            <Box sx={{ mt: "20px" }}>
              <FetchPostsButton />
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
});

export default Timeline;
