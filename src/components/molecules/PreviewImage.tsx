import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IconButton, ImageListItemBar, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { Box } from "@mui/system";
import { FC, memo } from "react";

// 入力した画像ファイル、画像ファイルのset関数、画像ファイルの数、画像の横幅、縦幅
type Props = {
  inputImages: File[];
  setInputImages: React.Dispatch<React.SetStateAction<File[]>>;
  inputLength: number;
  width: string;
  height: string;
};

const PreviewImage: FC<Props> = memo((props) => {
  let { inputImages, setInputImages, inputLength, width, height } = props;

  // 画像削除ボタンコンポーネント
  const DeleteButton = ({ imageIndex }: { imageIndex: number }) => {
    // 画像削除処理
    const deleteImage = () => {
      setInputImages((inputImages: File[]) => {
        inputImages.splice(imageIndex, 1);
        return [...inputImages];
      });
    };

    return (
      <Box sx={{ display: "flex" }}>
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

  return (
    <>
      <Typography variant="body2">{`画像数：(${inputLength}/3)`}</Typography>
      <ImageList sx={{ width: "auto", height: 200 }} cols={3} rowHeight={164}>
        {inputImages.map((item: File, index: number) => {
          const itemUrl = URL.createObjectURL(item);
          return (
            <Box key={itemUrl}>
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
                actionIcon={<DeleteButton imageIndex={index} />}
                actionPosition="left"
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
