import { AddPhotoAlternate, Coffee } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FC, memo, useState } from "react";
import PreviewImage from "../molecules/PreviewImage";
import getImagePaths from "../../utils/getImagePaths";
import previewImages from "../../utils/previewImages";

const PostForm: FC = memo(() => {
  // 入力した画像ファイル格納
  const [inputImages, setInputImages] = useState<File[]>([]);

  // TODO 投稿送信処理
  const fetchPostData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imagePaths = await getImagePaths(inputImages);
    console.log(imagePaths);

    fetch("http://localhost:8880/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 3,
        content: "テスト投稿だよ",
        itemId: 2,
        postImag: imagePaths,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={fetchPostData}
      elevation={3}
      sx={{ mt: 2, mb: 5 }}
    >
      <TextField
        fullWidth
        rows={3}
        multiline
        label="投稿"
        variant="standard"
        sx={{ p: "0" }}
      />
      <Select
        variant="standard"
        fullWidth
        defaultValue="商品を選択"
        sx={[
          {
            "&:hover": {
              border: "0px",
            },
          },
          { height: "40px", pl: "5px" },
        ]}
      >
        <MenuItem key="1" value="商品を選択" disabled>
          <Box sx={{ display: "flex" }}>
            <Coffee />
            <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>
              商品を選択
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem key="2" value="ライト">
          ライト
        </MenuItem>
        <MenuItem key="3" value="ダーク">
          ダーク
        </MenuItem>
        <MenuItem key="4" value="ココア">
          ココア
        </MenuItem>
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
          <Button
            size="small"
            type="submit"
            sx={{ color: "white", background: "#89c3eb", m: "5px" }}
          >
            投稿
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default PostForm;
