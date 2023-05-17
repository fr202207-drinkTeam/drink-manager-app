import { Button, Grid } from "@mui/material";
import ModalWindow from "../organisms/ModalWindow";
import { FC, memo } from "react";

type Props = {
  editHandler: any;
  deleteHandler: any;
};

const MenuButtons: FC<Props> = memo((props) => {
  const { editHandler, deleteHandler } = props;
  return (
    <Grid sx={{ display: "flex" }}>
      <Button
        onClick={editHandler}
        sx={[
          {
            p: "0px",
            color: "white",
            backgroundColor: "#024098",
            my: "3px",
            fontWeight: "bold",
            mr: "2px",
            height: "24.5px"
          },
          {
            "&:hover": {
              color: "black",
            },
          },
        ]}
      >
        編集
      </Button>
      <ModalWindow
        title=""
        content="内容は破棄されますがよろしいですか？"
        openButtonColor="nomal"
        openButtonSxStyle={[
          {
            p: "0px",
            color: "white",
            backgroundColor: "#E83929",
            my: "3px",
            fontWeight: "bold",
            mr: "2px",
          },
          {
            "&:hover": {
              color: "black",
            },
          },
        ]}
        completeButtonColor="red"
        completeButtonName="確定"
        buttonName="削除"
        completeAction={deleteHandler}
        cancelButtonColor="gray"
      />
    </Grid>
  );
});

export default MenuButtons;
