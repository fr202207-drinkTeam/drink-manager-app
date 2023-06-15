import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FC, memo, useState } from "react";
import Slider from "../atoms/slider/Slider";
import InfoIcon from "@mui/icons-material/Info";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Autorenew } from "@mui/icons-material";
import ModalWindow from "../organisms/ModalWindow";
import AdmTitleText from "../atoms/text/AdmTitleText";

type Props = {};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const BannerEdit: FC<Props> = memo(() => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ImgChangeButton = () => {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <InputLabel variant="standard" htmlFor="changeImage">
          <IconButton
            sx={{
              color: "black",
              borderRadius: "none",
            }}
            onClick={() => {
              console.log("hello");
            }}
          >
            <Autorenew />
            <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>変更</Typography>
          </IconButton>
        </InputLabel>
        <TextField
          id="changeImage"
          type="file"
          inputProps={{ accept: "image/*" }}
          sx={{ p: "0", display: "none" }}
          size="small"
          onChange={() => {
            console.log("hello");
          }}
        />
      </Box>
    );
  };

  return (
    <Paper
      sx={{
        mb: 5,
        width: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: "10px", sm: "10px", md: "10px", lg: "30px" },
      }}
    >
      <AdmTitleText>バナー編集</AdmTitleText>
      <ImageList
        sx={{
          width: "auto",
          height: 220,
          alignItems: "center",
          my: 0,
          maxWidth: "100%",
        }}
        cols={3}
        rowHeight={96}
        gap={5}
      >
        {itemData.map((item: string, index: number) => (
          <ImageListItem key={item} sx={{ width: "320px", mx: "auto" }}>
            <img
              src={item}
              srcSet={`${item} 2x`}
              alt={item}
              loading="lazy"
              style={{
                width: "320px",
                height: "96px",
                objectFit: "fill",
              }}
              onClick={handleOpen}
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={`スライダー${index + 1}枚目`}
              position="top"
              actionPosition="left"
              onClick={handleOpen}
            />
            <ImgChangeButton />
          </ImageListItem>
        ))}
      </ImageList>

      <ImageList
        sx={{
          width: "auto",
          height: 210,
          alignItems: "center",
          my: 0,
          maxWidth: "100%",
        }}
        cols={2}
        rowHeight={82.85}
        gap={20}
      >
        {bannerData.map((item: string, index: number) => (
          <ImageListItem key={item} sx={{ width: "232px", mx: "auto" }}>
            <img
              src={item}
              srcSet={`${item} 2x`}
              alt={item}
              loading="lazy"
              style={{
                width: "232px",
                height: "82.85px",
                objectFit: "fill",
              }}
              onClick={handleOpen}
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={`バナー${index === 0 ? "上部" : "下部"}`}
              position="top"
              actionPosition="left"
              onClick={handleOpen}
            />
            <ImgChangeButton />
          </ImageListItem>
        ))}
      </ImageList>

      <ModalWindow
        title="画像を変更します、よろしいですか？"
        content={""}
        openButtonColor="blue"
        buttonName="確定"
        completeButtonColor={"blue"}
        completeButtonName={`はい`}
        completeAction={() => {
          console.log("hello");
        }}
        cancelButtonColor={"red"}
        openButtonSxStyle={{
          my: "50px",
          mx: "auto",
          py: "10px",
          px: "30px",
          display: "block",
          fontSize: { xs: "14px", sm: "16px", md: "20px", lg: "20px" },
          borderRadius: 3,
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Slider
            images={itemData}
            slidesPerView={1}
            loop={false}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={false}
          />
        </Box>
      </Modal>
    </Paper>
  );
});

const itemData = [
  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
];

const bannerData = [
  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
];

export default BannerEdit;
