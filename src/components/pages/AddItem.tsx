import { FC, memo, useEffect, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  InactiveButton,
  ActiveBlueButton,
  ActiveOrangeButton,
  ActiveDarkBlueButton,
  ActiveRedButton,
} from "../atoms/button/Button";
import AdmTitleText from "../atoms/text/AdmTitleText";
import ImgPathConversion from "../../utils/ImgPathConversion2";
import ModalWindow from "../organisms/ModalWindow";
import ItemForm from "../organisms/ItemForm";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";

const AddItem: FC = memo(() => {
  const navigate: NavigateFunction = useNavigate();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const [itemImages, setItemImages] = useState<File[]>([]);
  const isFirstRender = useRef(true);

  // recoilからログインユーザー情報を取得
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  
  // ログイン状態でなければログイン画面へ遷移
  useEffect(() => {
    if(!authId && !loginUser.isAdmin) {
      navigate("/login")
    }
    console.log("ユーザー情報", loginUser)
    console.log("authId", typeof !authId)
    console.log("isAdmin", loginUser.isAdmin)
  },[authId, loginUser])

  // データ追加処理(確定ボタン)
  const onClickAddItemData: () => Promise<void> = async () => {
    const imagePath = await ImgPathConversion({
      imgFiles: itemImages
    });

    console.log(imagePath);

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    fetch("http://localhost:8880/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: itemName,
        description: itemDescription,
        image: imagePath,
        itemCategory: itemCategory,
        createdAt: new Date(),
        inTheOffice: false,
        author: loginUser.id,
        otherItem: false,
      }),
    }).then(() => {
      navigate("/adminhome");
      console.log("success");
    });
  };

  return (
    <>
      <Paper sx={{ p: 5, width: "80%", m: "auto" }}>
        <AdmTitleText>商品追加</AdmTitleText>
        <ItemForm
          setItemName={setItemName}
          setItemDescription={setItemDescription}
          setItemCategory={setItemCategory}
          setItemImages={setItemImages}
        />

        {itemName &&
        itemDescription &&
        itemCategory !== 0 &&
        itemImages.length > 0 ? (
          <></>
        ) : (
          <>
            <Typography
              variant="body1"
              component="div"
              textAlign="center"
              sx={{ mb: 1, mt: 3, color: "red" }}
            >
              全ての項目を入力、または選択して下さい
            </Typography>
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ModalWindow
            title="削除"
            content="内容は破棄されますがよろしいですか？"
            openButtonColor="red"
            completeButtonColor="beige"
            completeButtonName="削除"
            completeAction={() => {
              navigate(-1);
            }}
            cancelButtonColor="pink"
            openButtonSxStyle={{
              my: 2,
              mr: 3,
              py: "5px",
              fontSize: "16px",
            }}
          />
          {itemName &&
          itemDescription &&
          itemCategory !== 0 &&
          itemImages.length > 0 ? (
            <ActiveBlueButton
              event={onClickAddItemData}
              sxStyle={{
                my: 2,
                mr: 3,
                py: "5px",
                fontSize: "16px",
              }}
            >
              確定
            </ActiveBlueButton>
          ) : (
            <>
              <InactiveButton
                sxStyle={{
                  my: 2,
                  mr: 3,
                  py: "5px",
                  fontSize: "16px",
                }}
              >
                確定
              </InactiveButton>
            </>
          )}
        </Box>
      </Paper>
    </>
  );
});

export default AddItem;
