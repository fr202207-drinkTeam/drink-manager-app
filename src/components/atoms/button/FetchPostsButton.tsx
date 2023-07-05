import { CachedOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { FC, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "../../../types/type";

type Props = {
  isHeader: boolean;
  setPostData: React.Dispatch<React.SetStateAction<Post[]>>;
  setReloadPost: React.Dispatch<React.SetStateAction<boolean>>;
  reloadPost: boolean;
  setPostParamsNum: React.Dispatch<React.SetStateAction<number>>;
  postParamsNum: number;
  noMoreData: boolean;
  itemId: any;
  setPostParams: React.Dispatch<React.SetStateAction<string>>;
  postParams: string;
  postUserAdmin: string;
  postSearch: string;
};

// データ取得ボタン
const FetchPostsButton: FC<Props> = memo((props) => {
  const {
    isHeader,
    setPostData,
    setReloadPost,
    reloadPost,
    setPostParamsNum,
    postParamsNum,
    noMoreData,
    itemId,
    setPostParams,
    postParams,
    postUserAdmin,
    postSearch
  } = props;

  const location = useLocation();
  const navigate = useNavigate();

  // データ取得処理
  const fetchPost = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // ヘッダーのボタンの場合は投稿3件取得
    if (isHeader) {
      setPostData([]);
      setPostParamsNum(3);
      if(postParams === `?${postUserAdmin}${postSearch}&quantity=${3}`) {
        setReloadPost(!reloadPost);
        return;
      }
      setPostParams(
        `?${postUserAdmin}${postSearch}&quantity=${3}`
      );
    }
    // 画面下のボタンの場合は現在の表示に追加で3件取得
    else {
      if (noMoreData) {
        return;
      }
      if (itemId.current !== 0) {
        setReloadPost(!reloadPost);
        navigate(location.state, {});
        setPostData([]);
        itemId.current = 0;
        return;
      }
      setPostParamsNum(postParamsNum + 3);
      setPostParams(
        `?${postUserAdmin}${postSearch}&quantity=${postParamsNum + 3}`
      );
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
});

export default FetchPostsButton;
