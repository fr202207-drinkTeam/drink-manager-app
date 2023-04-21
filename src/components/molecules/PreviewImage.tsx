import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { FC, memo } from "react";

type Props = {
  inputImages: any
};

const PreviewImage: FC<Props> = memo((props) => {
  const {inputImages} = props;
  console.log("preview", inputImages)

  return (
    <>
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {inputImages.map((imageData: any) => {
        const imageUrl = window.URL.createObjectURL(imageData)
        return(
        <ImageListItem key={imageUrl}>
          <img
            src={imageUrl}
            srcSet={imageUrl}
            alt={imageData.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={imageData.name}
            subtitle={<span>by: {imageData.name}</span>}
            position="below"
          />
        </ImageListItem>
      )})}
    </ImageList>
    </>
  );
});

export default PreviewImage;
