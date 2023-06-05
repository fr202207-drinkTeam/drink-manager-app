import {
  CircularProgress,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { FC, memo, useEffect, useRef, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import { Box } from "@mui/system";
import ModalWindow from "../organisms/ModalWindow";
import { ActiveBorderButton, InactiveButton } from "../atoms/button/Button";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router";
import useGetAnItem from "../../hooks/useGetAnItem";
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import PreviewImage from "../molecules/PreviewImage";
import previewImages from "../../utils/previewImages";
import ImgPathConversion from "../../utils/ImgPathConversion";
import type {Users} from "../../types/type"

const ItemEdit: FC = memo(() => {
  const navigate: NavigateFunction = useNavigate();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const isFirstRender = useRef(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputImages, setInputImages] = useState<File[]>([]);
  const [presenceOrAbsence, setPresenceOrAbsence] = useState<boolean>(false);
  const [isDuplicateData, setIsDuplicateData] = useState<boolean>(false)

  // パラメーターのitemIdを元にデータ取得
  const paramsData: Readonly<Params<string>> = useParams();
  const itemId: number = Number(paramsData.id);
  const getAnItemComplete = (isComplete: boolean) => {
    setLoading(isComplete);
  };
  const getAnItemResult = useGetAnItem({
    itemId: itemId,
    onFetchComplete: getAnItemComplete,
  });

  // recoilからログインユーザー情報を取得
  const authId: string = Cookies.get("authId")!;
  const loginUser: Users = useLoginUserFetch({ authId: authId });

  // ラジオボタンの挙動
  const onChangeInTheOffice = (e:any) => {
    if(e.target.value === "absence"){
      setPresenceOrAbsence(false)
    } else {
      setPresenceOrAbsence(true)
    }
  }

  // データ取得後、内容をstateにセット
  useEffect(() => {
    if (getAnItemResult.itemData) {
      setInputImages(
        getAnItemResult.itemData.image.map(
          (image: string) => new File([], image)
        )
      );
      setItemName(getAnItemResult.itemData.name);
      setItemDescription(getAnItemResult.itemData.description);
      setItemCategory(getAnItemResult.itemData.itemCategory);
      setPresenceOrAbsence(getAnItemResult.itemData.intheOffice)
    }
  }, [getAnItemResult.itemData]);

  // データ追加処理(確定ボタン)
  const onClickEditItemData: () => Promise<void> = async () => {
    setUpdating(true);
    if(itemName !== getAnItemResult.itemData.name) {
      const res = await fetch(`http://localhost:8880/items?name=${itemName}`,
    {
      method: "GET",
    })
    const data = await res.json();
    if(data.length > 0){
      setIsDuplicateData(true)
      setUpdating(false)
      return;
    }
    }
    

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    const imagePaths: string | unknown[] = await ImgPathConversion({ imgFiles: inputImages });
    fetch(`http://localhost:8880/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: itemName,
        description: itemDescription,
        image: imagePaths,
        itemCategory: itemCategory,
        createdAt: new Date(),
        intheOffice: presenceOrAbsence,
        author: loginUser.id,
        otherItem: false,
        isDiscontinued: false
      }),
    }).then(() => {
      setUpdating(false);
      navigate("/adminhome");
    });
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        getAnItemResult.itemData ? (
          getAnItemResult.itemData.isDiscontinued ? (
            <div>該当する商品がありません</div>
          ) : (
            <Paper sx={{ p: 5, width: "80%", m: "auto" }}>
          <Box id="top"/>
          <AdmTitleText>商品編集</AdmTitleText>
          {updating ? (
            <div style={{ margin: "200px", textAlign: "center" }}>
              <p>更新中</p>
              <CircularProgress />
            </div>
          ) : (
            <>
              <SecondaryInput
                id="itemName"
                label="商品名"
                value={itemName}
                required
                onChange={(e: any) => setItemName(e.target.value)}
                sx={{ width: 400, mb: 5 }}
                inputProps={{ maxLength: 18 }}
              />
              <Typography variant="body1" component="p" sx={{ mb: 1 }}>
                商品画像
              </Typography>

              <Box
                sx={{
                  mb: 5,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {inputImages.length > 0 && (
                  <PreviewImage
                    inputImages={inputImages}
                    setInputImages={setInputImages}
                    inputLength={inputImages.length}
                    width={"164px"}
                    height={"164px"}
                  />
                )}
                {inputImages.length < 3 && (
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <button style={{ background: "none", border: "none" }}>
                      <label htmlFor="newImage">
                        <Typography variant="body2" component="p">
                          追加
                        </Typography>
                        <AddCircleOutlineIcon sx={{ fontSize: 30, mb: 5 }} />
                      </label>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id={`newImage`}
                        accept=".png, .jpg, .jpeg"
                        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                          if (!(event.target instanceof HTMLInputElement)) {
                            return;
                          }
                          event.target.value = "";
                        }}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          previewImages(event, inputImages, setInputImages);
                        }}
                      />
                    </button>
                  </Box>
                )}
              </Box>
              <PrimaryInput
                multiline
                aria-label="itemDescription"
                label="商品説明"
                sx={{ width: "100%", mb: 5 }}
                inputProps={{ maxLength: 200 }}
                value={itemDescription}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setItemDescription(e.target.value)
                }
                rows={4}
              />
              <InputLabel id="itemCategoryField" required>
                商品カテゴリー
              </InputLabel>
              <Select
                labelId="itemCategoryField"
                id="itemCategoryField"
                value={itemCategory}
                label="商品カテゴリー"
                onChange={(e) => {
                  setItemCategory(Number(e.target.value));
                }}
                sx={{ mb: 5 }}
              >
                <MenuItem value={0}>商品カテゴリーを選択して下さい</MenuItem>
                <MenuItem value={1}>コーヒー/ダーク(深煎り)</MenuItem>
                <MenuItem value={2}>コーヒー/ダーク(中煎り)</MenuItem>
                <MenuItem value={3}>コーヒー/ライト(浅煎り)</MenuItem>
                <MenuItem value={4}>コーヒー/カフェインレス</MenuItem>
                <MenuItem value={5}>ティー</MenuItem>
                <MenuItem value={6}>ココア</MenuItem>
                <MenuItem value={7}>その他</MenuItem>
              </Select>
              <div>
                <FormLabel id="in-the-office">社内有無 *</FormLabel>
                {presenceOrAbsence ? 
                <RadioGroup
                  row
                  aria-labelledby="in-the-office"
                  name="in-the-office"
                  defaultValue="presence"
                  onChange={(e) => onChangeInTheOffice(e)}
                >
                  <FormControlLabel value="absence" control={<Radio />} label="社内なし" />
                  <FormControlLabel value="presence" control={<Radio />} label="社内あり" />
                </RadioGroup> : 
                  <RadioGroup
                  row
                  aria-labelledby="in-the-office"
                  name="in-the-office"
                  defaultValue="presence"
                  onChange={(e) => onChangeInTheOffice(e)}
                >
                  <FormControlLabel value="absence" control={<Radio />} label="社内なし" />
                  <FormControlLabel value="presence" control={<Radio />} label="社内あり" />
                </RadioGroup>
                }
              </div>
              {isDuplicateData && 
                <>
                  <Typography
                    variant="body1"
                    component="div"
                    textAlign="center"
                    sx={{ mb: 1, mt: 3, color: "red" }}
                  >
                  商品名が重複しています
                  </Typography>
                </>
              }
              {itemName &&
              itemDescription &&
              itemCategory !== 0 &&
              inputImages.length > 0 ? (
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
                  completeButtonName="OK"
                  buttonName="変更内容を破棄"
                  completeAction={() => {
                    navigate(-1);
                  }}
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
                inputImages.length > 0 ? (
                  <ActiveBorderButton
                    event={onClickEditItemData}
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
            </>
          )}
        </Paper>
          )
          
        ) :(
          <div>該当する商品がありません</div>
        )
        
      )}
    </>
  );
});

export default ItemEdit;
