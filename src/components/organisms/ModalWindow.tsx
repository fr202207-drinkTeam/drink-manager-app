import { FC, Fragment, memo, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import {
  ActiveBeigeButton,
  ActiveBlueButton,
  ActiveDarkBlueButton,
  ActiveOrangeButton,
  ActivePinkButton,
  ActiveRedButton,
  InactiveButton,
  ActiveGrayButton,
  ActiveBorderButton,
} from "../atoms/button/Button";
import { Button } from "@mui/material";

// モーダルタイトル、内容、表示ボタン（色、スタイル、アイコン）、完了ボタン（色、名前、処理）、キャンセルボタン（色）
type Props = {
  title: string;
  content: string;
  openButtonColor: string;
  openButtonSxStyle?: object;
  openButtonIcon?: JSX.Element;
  completeButtonColor: string;
  completeButtonName: string;
  buttonName?: string;
  completeAction: any;
  cancelButtonColor: string;
};

// モーダルウインドウコンポーネント
const ModalWindow: FC<Props> = memo((props: Props) => {
  // モーダルの表示非表示のstate
  const [open, setOpen] = useState(false);
  // モーダル表示処理
  const handleOpen = () => setOpen(true);
  // モーダル非表示処理
  const handleClose = () => setOpen(false);

  const {
    title,
    content,
    openButtonColor,
    openButtonSxStyle,
    openButtonIcon,
    completeButtonColor,
    completeButtonName,
    buttonName,
    completeAction,
    cancelButtonColor,
  } = props;

  // 各種ボタンのセッティング処理、指定した色ごとにボタンコンポーネントを設定
  const buttonSetting = (
    // ボタンの色
    color: string,
    // ボタンの処理
    action: () => any,
    // ボタンの名前
    label: string,
    // モーダル表示ボタンのスタイル
    openButtonSxStyle?: object
  ) => {
    switch (color) {
      case "inactive":
        return (
          <InactiveButton sxStyle={openButtonSxStyle}>{label}</InactiveButton>
        );
      case "blue":
        return (
          <ActiveBlueButton event={action} sxStyle={openButtonSxStyle}>
            {label}
          </ActiveBlueButton>
        );
      case "orange":
        return (
          <ActiveOrangeButton event={action} sxStyle={openButtonSxStyle}>
            {label}
          </ActiveOrangeButton>
        );
      case "beige":
        return (
          <ActiveBeigeButton event={action} sxStyle={openButtonSxStyle}>
            {label}
          </ActiveBeigeButton>
        );
      case "pink":
        return (
          <ActivePinkButton event={action} sxStyle={openButtonSxStyle}>
            {openButtonIcon}
            {label}
          </ActivePinkButton>
        );
      case "darkblue":
        return (
          <ActiveDarkBlueButton event={action} sxStyle={openButtonSxStyle}>
            {label}
          </ActiveDarkBlueButton>
        );
      case "red":
        return (
          <ActiveRedButton event={action} sxStyle={openButtonSxStyle}>
            {label}
          </ActiveRedButton>
        );
      case "gray":
        return (
          <ActiveGrayButton event={action} sxStyle={openButtonSxStyle}>
            {label}
          </ActiveGrayButton>
        );
      case "borderRed":
        return (
          <ActiveBorderButton event={action} sxStyle={openButtonSxStyle}>
            {label}
          </ActiveBorderButton>
        );
      case "nomal":
        return (
          <Button onClick={action} sx={openButtonSxStyle}>
            {label}
          </Button>
        );
      default:
        return <Fragment />;
    }
  };

  // モーダル表示ボタン
  const OpenButton = () => {
    if (buttonName) {
      return buttonSetting(
        openButtonColor,
        handleOpen,
        buttonName,
        openButtonSxStyle
      );
    } else {
      return buttonSetting(
        openButtonColor,
        handleOpen,
        completeButtonName,
        openButtonSxStyle
      );
    }
  };

  // 完了ボタン
  const CompleteButton = () => {
    const action = () => {
      completeAction();
      handleClose();
    };
    return buttonSetting(completeButtonColor, action, completeButtonName);
  };

  // キャンセルボタン
  const CancelButton = () => {
    return buttonSetting(cancelButtonColor, handleClose, "キャンセル");
  };

  return (
    <div>
      <OpenButton />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `${window.innerWidth < 600 ? "80%" : "50%"}`,
              bgcolor: "background.paper",
              borderRadius: 5,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              {title}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              align="center"
            >
              {content}
            </Typography>
            <Grid container sx={{ mt: "30px" }}>
              <Grid
                xs
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CompleteButton />
              </Grid>
              <Grid
                xs
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CancelButton />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
});

export default ModalWindow;
