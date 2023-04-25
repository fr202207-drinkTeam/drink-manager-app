import { FC, memo } from "react";
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
import useImgPathConversion from "../../hooks/useImgPathConversion";
import ModalWindow from "../organisms/ModalWindow";
// import useLoginUser from "../../hooks/useLoginUser";
import ItemForm from "../organisms/ItemForm";

type Props = {};

const AddItem: FC<Props> = memo((props) => {
  const navigate: NavigateFunction = useNavigate();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const [itemImages, setItemImages] = useState<string[]>([]);
  const [testImageData, setTestImageData] = useState<any>(null);
  const { imagePath, loading, isUploaded } = useImgPathConversion({
    imgFile: testImageData,
  });

  // recoilからログインユーザー情報を取得

  // テスト用
  const imageData = (e: any) => {
    setTestImageData(e.target.files[0]);
  };

  // 画像の削除機能
  const onClickDeleteItemImage = (imageId: number) => {
    const updatedItemImages = [...itemImages];
    updatedItemImages.splice(imageId - 1, 1);
    setItemImages(updatedItemImages);
  };

  // 画像プレビュー機能
  const addItemImage = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const newImage = reader.result as string;

      setItemImages([newImage]);
    };
  };

  // データ追加処理(確定ボタン)
  const onClickAddItemData: () => Promise<void> = async () => {
    await fetch("http://localhost:8880/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "test",
        name: { itemName },
        description: { itemDescription },
        image: imagePath,
        itemCategory: { itemCategory },
        createdAt: new Date(),
        inTheOffice: false,
        author: "test", // recoilから取得
        otherItem: false,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        // navigate("/adminhome");
      })
      .catch((error) => {
        console.error("Error:", error);
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
        {/* <p>テスト</p>
        <input type="file" onChange={imageData} />
        <div>
          {loading && <p>Uploading image...</p>}
          {isUploaded && <p>Image uploaded successfully!</p>}
          {imagePath && <img src={imagePath} alt="uploaded" />}
        </div> */}
      </Paper>
    </>
  );
});

export default AddItem;
