import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  IconButton,
  ImageListItemBar,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Autorenew, DeleteForever } from "@mui/icons-material";
import { Box } from "@mui/system";
import { FC, memo, useRef } from "react";
import previewImages from "../../utils/previewImages";

// 入力した画像ファイル、画像ファイルのset関数、画像ファイルの数、画像の横幅、縦幅
type Props = {
  inputImages: File[];
  setInputImages: React.Dispatch<React.SetStateAction<File[]>>;
  inputLength: number;
  width: string;
  height: string;
};

// 投稿、商品追加時の画像プレビューコンポーネント
const PreviewImage: FC<Props> = memo((props) => {
  let { inputImages, setInputImages, inputLength, width, height } =
    props;

  // 画像削除ボタンコンポーネント
  const ImgDeleteButton = ({ imageIndex }: { imageIndex: number }) => {
    // 画像削除処理
    const deleteImage = () => {
      setInputImages((inputImages: File[]) => {
        inputImages.splice(imageIndex, 1);
        return [...inputImages];
      });
    };

    return (
      <Box sx={{ textAlign: "center" }}>
        <IconButton
          onClick={deleteImage}
          sx={{
            color: "black",
            borderRadius: "none",
          }}
        >
          <DeleteForever />
          <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>削除</Typography>
        </IconButton>
      </Box>
    );
  };


  // 画像編集ボタンコンポーネント
  const ImgChangeButton = ({ imageIndex }: { imageIndex: number }) => {
    const imageInput = useRef<any>(null);
    // 画像編集処理
    const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      previewImages(event, inputImages, setInputImages, imageIndex)
    };
    return (
      <Box sx={{ textAlign: "center" }}>
        <InputLabel variant="standard" htmlFor="changeImage">
          <IconButton
            sx={{
              color: "black",
              borderRadius: "none",
            }}
            // IconButtonの影響か、inputLabalでinputが動作しなかったため、クリックによりinputができるように処理を追加
            onClick={() => {
              imageInput.current.childNodes[0].childNodes[0].click();
            }}
          >
            <Autorenew />
            <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>変更</Typography>
          </IconButton>
        </InputLabel>
        <TextField
          id="changeImage"
          type="file"
          sx={{ p: "0", display: "none" }}
          size="small"
          onChange={changeImage}
          ref={imageInput}
        />
      </Box>
    );
  };

  return (
    <>
      <Typography variant="body2">{`画像数：(${inputLength}/3)`}</Typography>
      <ImageList sx={{ width: "auto", height: 230 }} cols={3} rowHeight={164}>
        {inputImages.map((item: File, index: number) => {
          let itemUrl;
          // firebaseのurlから作成したFile型のitemの場合、sizeが0になるため、item.name(firebaseのurl)を使用
          if (item.size === 0) {
            itemUrl = item.name;
          } 
          // inputからのfileの場合、Urlに変換
          else {
            itemUrl = URL.createObjectURL(item);
          }
          return (
            <Box
              key={itemUrl}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <ImageListItem>
                <img
                  src={itemUrl}
                  alt={item.name}
                  loading="lazy"
                  style={{
                    width: width,
                    height: height,
                    objectFit: "contain",
                  }}
                />
              </ImageListItem>
              <ImageListItemBar
                title={
                  <Box sx={{ display: "flex" }}>
                    <ImgChangeButton imageIndex={index} />
                    <ImgDeleteButton imageIndex={index} />
                  </Box>
                }
                position="below"
              />
            </Box>
          );
        })}
      </ImageList>
    </>
  );
});

export default PreviewImage;
