import { AddPhotoAlternate, Coffee } from "@mui/icons-material";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, memo, useState } from "react";
import PreviewImage from "../molecules/PreviewImage";

type Props = {};

const PostForm: FC<Props> = memo((props) => {
  const [inputImages, setInputImages] = useState<any>([]);
  const previewImage = (event: any) => {
    event.preventDefault();
    setInputImages((inputImages: any) => [
      ...inputImages,
      event.target.files[0],
    ]);
  };

  return (
    <Paper component="form" elevation={3} sx={{ mt: 2, mb: 5 }}>
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
          {inputImages.length > 0 && <PreviewImage inputImages={inputImages} />}
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
