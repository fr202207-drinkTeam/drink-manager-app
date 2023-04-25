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

type Props = {};

const PostForm: FC<Props> = memo((props) => {
  // 入力した画像ファイル格納
  const [inputImages, setInputImages] = useState<File[]>([]);

  // 入力した画像ファイルのstate管理
  const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 入力した画像に重複がないか判別
    const preventSameImage = inputImages.some(
      (image: File) => image.name === event.target.files![0].name
    );
    // 重複があった場合は処理を終了
    if (preventSameImage) {
      return;
    }

    // 画像ファイルが3つ以上の場合、古い画像を削除して新しい3つを追加
    if (inputImages.length >= 3) {
      setInputImages((inputImages: File[]) => {
        const limitedImages = [...inputImages, event.target.files![0]];
        limitedImages.shift();
        return limitedImages;
      });
    }
    // 画像ファイルが３つ未満の場合、通常の画像追加
    else {
      setInputImages((inputImages: File[]) => [
        ...inputImages,
        event.target.files![0],
      ]);
    }
  };

  // TODO 投稿送信処理
  const postData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Paper
      component="form"
      onSubmit={postData}
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
            onChange={previewImage}
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
