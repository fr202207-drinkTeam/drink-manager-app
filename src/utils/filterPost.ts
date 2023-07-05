import { SelectChangeEvent } from "@mui/material";
import { Post } from "../types/type";

// 投稿の絞込み
export const filterPostCategory = (
  event: SelectChangeEvent<string>,
  setPostData: React.Dispatch<React.SetStateAction<Post[]>>,
  setPostParams: React.Dispatch<React.SetStateAction<string>>,
  postSearch: string,
  setPostUserAdmin: React.Dispatch<React.SetStateAction<string>>
) => {
  setPostData([]);
  const selectedRange = event.target.value;
  switch (selectedRange) {
    case "すべて":
      setPostUserAdmin("category=all");
      setPostParams(`?category=all${postSearch}&quantity=${3}`);
      break;
    case "投稿":
      setPostUserAdmin("category=user");
      setPostParams(`?category=user${postSearch}&quantity=${3}`);
      break;
    case "お知らせ":
      setPostUserAdmin("category=admin");
      setPostParams(`?category=admin${postSearch}&quantity=${3}`);
      break;
  }
};

// 投稿の検索
export const searchPost = (
  event: React.FormEvent<HTMLFormElement>,
  setSearchError: React.Dispatch<React.SetStateAction<boolean>>,
  setPostData: React.Dispatch<React.SetStateAction<Post[]>>,
  setPostParams: React.Dispatch<React.SetStateAction<string>>,
  setReloadPost: React.Dispatch<React.SetStateAction<boolean>>,
  postUserAdmin: string,
  reloadPost: boolean,
  setPostSeach: React.Dispatch<React.SetStateAction<string>>,
  postSeach: string
) => {
  event.preventDefault();
  setSearchError(false);
  if (
    !(event.target instanceof HTMLFormElement) ||
    !(event.target[0] instanceof HTMLInputElement)
  ) {
    return;
  }
  if (event.target[0].value.length > 20) {
    setSearchError(true);
    return;
  }
  if (postSeach === `&search=${event.target[0].value}`) {
    return;
  }
  setPostSeach(`&search=${event.target[0].value}`);
  setPostData([]);
  setPostParams(
    `?${postUserAdmin}&search=${event.target[0].value}&quantity=${3}`
  );
};
