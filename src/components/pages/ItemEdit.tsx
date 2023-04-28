import { Paper, Typography } from "@mui/material";
import { FC, memo, useEffect, useRef, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import ItemForm from "../organisms/ItemForm";
import { Box } from "@mui/system";
import ModalWindow from "../organisms/ModalWindow";
import { ActiveBlueButton, InactiveButton } from "../atoms/button/Button";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import ImgPathConversion from "../../utils/ImgPathConversion2";
import useGetAnItem from "../../hooks/useGetAnItem";

type Props = {};

const ItemEdit: FC<Props> = memo((props) => {
  const navigate: NavigateFunction = useNavigate();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const [itemImages, setItemImages] = useState<File[]>([]);
  const isFirstRender = useRef(true);

  // パラメーターのitemIdを元にデータ取得
  const paramsData = useParams();
  const itemId = Number(paramsData.id);
  const itemData = useGetAnItem({ itemId: itemId });

  // recoilからログインユーザー情報を取得
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  
  
  useEffect(() => {
    // ログイン状態でなければログイン画面へ遷移
    // if(!authId && !loginUser.isAdmin) {
    //   navigate("/login")
    // }
    // console.log("ユーザー情報", loginUser)
    // console.log("authId", typeof !authId)
    // console.log("isAdmin", loginUser.isAdmin)
  },[authId, loginUser])

  useEffect(() => {
    if(itemData) {
      setItemName(itemData.name)
    setItemDescription(itemData.description)
    setItemCategory(itemData.itemCategory)
    setItemImages(itemData.image)
    console.log("set complete")
    console.log("item name", itemData.name)
    }
  }, [itemData])

  // データ追加処理(確定ボタン)
  const onClickEditItemData: () => Promise<void> = async () => {
    const imagePath = await ImgPathConversion({
      imgFiles: itemImages
    });

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
        <AdmTitleText>商品詳細</AdmTitleText>
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
              event={onClickEditItemData}
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

export default ItemEdit;
