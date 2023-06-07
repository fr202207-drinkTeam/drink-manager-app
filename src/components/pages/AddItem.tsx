import { FC, memo, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { InactiveButton, ActiveBorderButton } from "../atoms/button/Button";
import AdmTitleText from "../atoms/text/AdmTitleText";
import ImgPathConversion from ".././../utils/ImgPathConversion";
import ModalWindow from "../organisms/ModalWindow";
import ItemForm from "../organisms/ItemForm";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { CircularProgress } from "@mui/material";
import { Users } from "../../types/type";

type Props = {
  //投票から商品追加したかどうか
  pollFlag?: boolean;
  handleClose?: any;
  trigger?:boolean;
  setTrigger:React.Dispatch<React.SetStateAction<boolean>>;
};

const AddItem: FC<Props> = memo(({ pollFlag, handleClose,trigger,setTrigger }) => {
  const navigate: NavigateFunction = useNavigate();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const [itemImages, setItemImages] = useState<File[]>([]);
  const [presenceOrAbsence, setPresenceOrAbsence] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const [isDuplicateData, setIsDuplicateData] = useState<boolean>(false)

  // recoilからログインユーザー情報を取得
  const authId: string = Cookies.get("authId")!;
  const loginUser: Users = useLoginUserFetch({ authId: authId });

  // データ追加処理(確定ボタン)
  const onClickAddItemData: () => Promise<void> = async () => {
    setAdding(true)
    const res = await fetch(`http://localhost:8880/items?name=${itemName}`,
    {
      method: "GET",
    })
    const data = await res.json();
    if(data.length > 0){
      setIsDuplicateData(true)
      setAdding(false)
      return;
    }
    const imagePath = await ImgPathConversion({
      imgFiles: itemImages,
    });
    await fetch("http://localhost:8880/items", {
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
        intheOffice: presenceOrAbsence,
        author: loginUser.id,
        otherItem: pollFlag?true:false,
        isDiscontinued: false
      }),
    }).then(() => {
      if(pollFlag){
        setTrigger(!trigger)
        handleClose()
      }else{
        navigate("/adminhome");
      }
    });
  };

  //投票から削除押した場合
  const handleDelete: () => void = () => {
    if (pollFlag) {
      handleClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Paper sx={{ p: 5,  width: {xs: "100%", sm: "100%", md: "100%", lg:"80%"}, m: "auto" }}>
      
        <AdmTitleText>商品追加</AdmTitleText>
        <Box id="top"/>
        {adding ? (
          <>
            <div style={{ margin: "200px", textAlign: "center" }}>
              <p>登録中</p>
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <ItemForm
              itemName={itemName}
              setItemName={setItemName}
              itemDescription={itemDescription}
              setItemDescription={setItemDescription}
              itemCategory={itemCategory}
              setItemCategory={setItemCategory}
              itemImages={itemImages}
              setItemImages={setItemImages}
              presenceOrAbsence={presenceOrAbsence}
              setPresenceOrAbsence={setPresenceOrAbsence}
            />
            {isDuplicateData && 
            <>
            <Typography
              variant="body1"
              component="div"
              textAlign="center"
              sx={{ mb: 1, mt: 3, color: "red", fontSize: {
                xs: "13px"
              } }}
            >
            商品名が重複しています
            </Typography>
          </>
          }
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
                  sx={{ mb: 1, mt: 3, color: "red", fontSize: {
                    xs: "13px"
                  } }}
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
                completeButtonName="OK"
                buttonName="入力内容を破棄"
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
                    }}
                  >
                    確定
                  </InactiveButton>
                </>
              )}
            </Box>
          </>
        )}
      </Paper>
    </>
  );
});

export default AddItem;
