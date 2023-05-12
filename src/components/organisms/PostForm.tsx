import { AddPhotoAlternate, Coffee } from "@mui/icons-material";
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, memo, useEffect, useRef, useState } from "react";
import PreviewImage from "../molecules/PreviewImage";
import previewImages from "../../utils/previewImages";
import ImgPathConversion from "../../utils/ImgPathConversion";
import { Items, Post, Users } from "../../types/type";
import ModalWindow from "./ModalWindow";

// 全商品データ、商品情報取得時エラー、ログインユーザー情報、投稿編集データ、投稿編集のset関数
type Props = {
  itemData: Items[];
  itemError: boolean;
  loginUser: Users;
  editPostData: Post | null;
  setEditPostData: React.Dispatch<React.SetStateAction<Post | null>>;
};

const PostForm: FC<Props> = memo((props) => {
  const { itemData, itemError, loginUser, editPostData, setEditPostData } =
    props;

  // 入力した画像ファイル格納
  const [inputImages, setInputImages] = useState<File[]>([]);
  // 投稿内容のバリデーションチェック
  const [postError, setPostError] = useState<boolean>(false);
  // 投稿フォームのref
  const postForm = useRef<any>(null);
  // selectで選択した商品のitemId
  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  // 投稿編集の場合、投稿の装飾を削除、画像のfirebaseUrlをFile型に変換
  useEffect(() => {
    if (!editPostData) {
      return;
    }
    postForm.current![0].value = editPostData.content.replace(
      /\n<a href=.*/,
      ""
    );
    setSelectedItemId(editPostData.itemId);

    setInputImages(editPostData.postImage.map((image) => new File([], image)));

    postForm.current![0].focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPostData]);

  // TODO 投稿送信処理
  const postPostData = async () => {
    // 投稿のバリデーションチェック
    if (
      postForm.current![0].value.length < 20 ||
      postForm.current![0].value.length > 256
    ) {
      setPostError(true);
      return;
    }

    // 選択した商品のid
    const itemId = postForm.current![2].value;

    // 投稿のアイテム情報取得
    const item = itemData.find((item: Items) => item.id === parseInt(itemId));
    // 投稿内容の装飾
    let hashtagItem = "";
    if (item) {
      hashtagItem = `\n<a href="/home/search/${item.id}" style="color:blue;">#${item.name}</a>`;
    }
    const userName = `/nameS/${loginUser.firstName} ${loginUser.lastName}/nameE/`;

    // 入力した投稿内容
    const content = postForm.current![0].value + hashtagItem + userName;
    // 画像ファイルをfirebaseUrlに変換
    const imagePaths = await ImgPathConversion({ imgFiles: inputImages });

    // 投稿編集の場合
    if (editPostData) {
      const editedComment = {
        content: content,
        itemId: itemId,
        postImage: imagePaths,
        updatedAt: new Date(),
      };

      fetch(`http://localhost:8880/posts/${editPostData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedComment),
      }).then(() => {
        console.log("edit success");
        setPostError(false);
        setEditPostData(null);
        window.location.reload();
      });

      return;
    }
    // 新規投稿の場合
    const newPost = {
      userId: loginUser.id,
      content: content,
      itemId: itemId,
      postImage: imagePaths,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    fetch("http://localhost:8880/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    }).then(() => {
      console.log("success");
      setPostError(false);
      window.location.reload();
    });
  };

  return (
    <>
      {/* 投稿内容のバリデーション */}
      {postError && (
        <Typography
          variant="body1"
          sx={{ backgroundColor: "pink", mt: "10px", borderRadius: "3px" }}
        >
          投稿内容は20文字以上255文字以内で入力してください
        </Typography>
      )}
      <Paper
        component="form"
        elevation={3}
        sx={{ mt: 2, mb: 5 }}
        ref={postForm}
      >
        <Box sx={{ position: "relative" }}>
          <TextField
            fullWidth
            rows={3}
            multiline
            label="投稿"
            variant="standard"
            sx={{ p: "0" }}
          />
        </Box>
        <Select
          variant="standard"
          fullWidth
          value={selectedItemId}
          onChange={(event: SelectChangeEvent<number>) => {
            if (typeof event.target.value === "string") {
              return;
            }
            setSelectedItemId(event.target.value);
          }}
          sx={[
            {
              "&:hover": {
                outline: "none",
              },
            },
            { height: "40px", pl: "5px" },
          ]}
        >
          <MenuItem value="0" disabled>
            {/* 商品情報の取得ができたかどうか */}
            {itemError ? (
              <Box sx={{ display: "flex" }}>
                <Coffee />
                <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>
                  商品情報の取得に失敗しました、再読み込みしてください
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Coffee />
                <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>
                  商品を選択
                </Typography>
              </Box>
            )}
          </MenuItem>
          {itemData.map((item: Items) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
        {/* 入力した画像ファイルがある場合、プレビューを表示 */}
        {inputImages.length > 0 && (
          <PreviewImage
            inputImages={inputImages}
            setInputImages={setInputImages}
            inputLength={inputImages.length}
            width={"164px"}
            height={"164px"}
          />
        )}
        <Grid container alignItems="center" spacing={5}>
          <Grid item xs={10}>
            <InputLabel
              variant="standard"
              htmlFor="addImage"
              sx={[
                { "&:hover": { cursor: "pointer" } },
                { display: "flex", pl: "5px" },
              ]}
            >
              <AddPhotoAlternate />
              <Typography variant="body1">画像を追加</Typography>
            </InputLabel>
            <TextField
              id="addImage"
              type="file"
              sx={{ p: "0", display: "none" }}
              size="small"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                previewImages(event, inputImages, setInputImages);
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <ModalWindow
              title="投稿してもよろしいですか？"
              content=""
              openButtonColor="blue"
              openButtonSxStyle={{ my: "3px" }}
              completeButtonColor="blue"
              completeButtonName="投稿"
              completeAction={postPostData}
              cancelButtonColor="gray"
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
});

export default PostForm;
