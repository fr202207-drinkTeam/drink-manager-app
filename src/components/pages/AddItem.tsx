import { FC, memo, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  InactiveButton,
  ActiveBorderButton,
} from "../atoms/button/Button";
import AdmTitleText from "../atoms/text/AdmTitleText";
import ImgPathConversion from "../../utils/ImgPathConversion2";
import ModalWindow from "../organisms/ModalWindow";
import ItemForm from "../organisms/ItemForm";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";

type Props = {
  //投票から商品追加したかどうか
  pollFlag?:boolean;
  setPollFlag?:React.Dispatch<React.SetStateAction<boolean>>;
  handleClose?:any;
};

const AddItem: FC<Props> = memo(({pollFlag,setPollFlag,handleClose}) => {
  const navigate: NavigateFunction = useNavigate();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const [itemImages, setItemImages] = useState<File[]>([]);
  const [addItem, setAddItem] = useState<any>(1);
  const [imagesPathsArr, setImagesPathsArr] = useState<string[]>([]);


  const isFirstRender = useRef(true);

  // recoilからログインユーザー情報を取得
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

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

  //投票から削除押した場合
  const handleDelete = () => {
    if(pollFlag){
      handleClose()
    }else{
      navigate(-1);
    }
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
            title=""
            content="内容は破棄されますがよろしいですか？"
            openButtonColor="red"
            completeButtonColor="red"
            completeButtonName="削除"
            completeAction={handleDelete}
            cancelButtonColor="gray"
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
            <ActiveBorderButton
              event={onClickAddItemData}
              sxStyle={{
                my: 2,
                mr: 3,
                py: "5px",
                fontSize: "16px",
              }}
            >
              確定
            </ActiveBorderButton>
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
