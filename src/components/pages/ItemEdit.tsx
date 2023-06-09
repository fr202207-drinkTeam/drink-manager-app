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
import { FC, memo, useEffect, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import { Box } from "@mui/system";
import ModalWindow from "../organisms/ModalWindow";
import { ActiveBorderButton, InactiveButton } from "../atoms/button/Button";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router";
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import PreviewImage from "../molecules/PreviewImage";
import previewImages from "../../utils/previewImages";
import ImgPathConversion from "../../utils/ImgPathConversion";
import type {Item, Users, ItemImage} from "../../types/type"
import CheckForDuplicates from "../../utils/CheckForDuplicates";
import PutItemData from "../../utils/PutItemData";
import GetAnItemData from "../../utils/GetAnItemData";
import ImgsDelete from "../../utils/ImgsDelete";

const ItemEdit: FC = memo(() => {
  const navigate: NavigateFunction = useNavigate();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const [updating, setUpdating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputImages, setInputImages] = useState<File[]>([]);
  const [presenceOrAbsence, setPresenceOrAbsence] = useState<boolean>(false);
  const [isDuplicateData, setIsDuplicateData] = useState<boolean>(false)
  const [getItemData, setGetItemData] = useState<any>("")

  // パラメーターのitemIdを元にデータ取得
  const paramsData: Readonly<Params<string>> = useParams();
  const itemId: number = Number(paramsData.id);
  // const getAnItemComplete = (isComplete: boolean) => {
  //   setLoading(isComplete);
  // };
  // const getAnItemResult = useGetAnItem({
  //   itemId: itemId,
  //   onFetchComplete: getAnItemComplete,
  // });

  // クッキーからログインユーザー情報を取得
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

  const TestFnc = async() => {
    const DeleteExistingItemImages = await ImgsDelete(itemId)
    console.log(DeleteExistingItemImages)
  }

  // データ取得後、内容をstateにセット
  useEffect(() => {
    const getItemFnc = async (): Promise<any> => {
      const getResultItemData = await GetAnItemData({itemId: itemId})
      console.log(getResultItemData);
    if(getResultItemData) {
      setGetItemData(getResultItemData)
      console.log(getResultItemData.images)
      setItemName(getResultItemData.itemName)
      setItemDescription(getResultItemData.description)
      setItemCategory(getResultItemData.itemCategory)
      setInputImages(
        getResultItemData.images.map((image: ItemImage) => new File([], image.imagePath))
            );
      setLoading(false)
    }
    }
    getItemFnc()
  }, [itemId]);

  // データ更新処理(確定ボタン)
  const onClickEditItemData: () => Promise<void> = async () => {
    setUpdating(true);
    const itemNameIsPassed = await CheckForDuplicates({ itemName: itemName });
      if (!itemNameIsPassed) {
        setIsDuplicateData(true);
        setUpdating(false);
        return;
      }
    
    const imagePath: string | unknown[] = await ImgPathConversion({ imgFiles: inputImages });
    const imagePaths = imagePath.map((image) => {
      return { imagePath: image };
    });

    const DeleteExistingItemImages = ImgsDelete(itemId)

    const data = {
      id: Number(itemId),
      itemName: itemName,
      description: itemDescription,
      itemCategory: itemCategory,
      inTheOffice: presenceOrAbsence,
      approval: true,
      author: loginUser.id,
      isDiscontinued: false,
      // images: {create: imagePaths},
      images: imagePaths,
    };

    const putItemResult = await PutItemData(data)

    if (putItemResult) {
      setUpdating(false);
      // navigate("/adminhome");
      console.log(data)
      } else {
        setUpdating(false);
        return
      }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        getItemData ? (
          getItemData.isDiscontinued ? (
            <div>該当する商品がありません</div>
          ) : (
            <Paper sx={{ p: 5, width: {xs: "100%", sm: "100%", md: "100%", lg:"80%"}, m: "auto" }}>
          <Box id="top"/>
          <AdmTitleText>商品編集</AdmTitleText>
          {/* <button onClick={TestFnc}>テスト</button> */}
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
                sx={{ width: "100%", mb: 5 }}
                inputProps={{ maxLength: 18, sx: {
                  fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "16px",
                    lg: "16px",
                  }} }}
              />
              <Typography variant="body1" component="p" sx={{ mb: 1, color: "rgba(0, 0, 0, 0.6)", fontSize: {
                xs: "14px",
                sm: "16px",
                md: "16px",
                lg: "16px"
              } }}>
                商品画像 *
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
                        <AddCircleOutlineIcon sx={{ fontSize: 30, mb: {xs:0, sm: 5, md: 5,lg:5} }} />
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
                inputProps={{ maxLength: 200, sx: {
                  fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "16px",
                    lg: "16px",
                  }} }}
                value={itemDescription}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setItemDescription(e.target.value)
                }
                rows={4}
              />
              <InputLabel id="itemCategoryField" required sx={{ fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "16px",
                    lg: "16px",
                  }}}>
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
                sx={{ mb: 5, fontSize: {
                  xs: "14px",
                  sm: "14px",
                  md: "16px",
                  lg: "16px",
                } }}
              >
                <MenuItem value={0}>商品カテゴリーを選択して下さい</MenuItem>
                <MenuItem value={1}>コーヒー/ダーク(深煎り)</MenuItem>
                <MenuItem value={2}>コーヒー/ダーク(中煎り)</MenuItem>
                <MenuItem value={3}>コーヒー/ライト(浅煎り)</MenuItem>
                <MenuItem value={4}>コーヒー/カフェインレス</MenuItem>
                <MenuItem value={5}>ティー</MenuItem>
                <MenuItem value={6}>ココア</MenuItem>
                <MenuItem value={7}>ウォーターサーバー</MenuItem>
                <MenuItem value={8}>お菓子</MenuItem>
                <MenuItem value={9}>その他</MenuItem>
              </Select>
              {itemCategory !== 8 && itemCategory !== 0 && (
              <div>
                  <FormLabel id="in-the-office" sx={{fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "16px",
                    lg: "16px",
                  }}}>社内有無 *</FormLabel>                
                {presenceOrAbsence  ? (
                  <RadioGroup
                    row
                    aria-labelledby="in-the-office"
                    name="in-the-office"
                    defaultValue="presence"
                    onChange={(e) => onChangeInTheOffice(e)}
                    sx={{mb: 5}}
                  >
                  <FormControlLabel value="absence" control={<Radio />} 
                  label={
                    <Typography component="p" sx={{fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "16px",
                      lg: "16px",
                    }}}>
                       社内なし
                     </Typography>
                  } />
                  <FormControlLabel value="presence" control={<Radio />} label={
                    <Typography component="p" sx={{fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "16px",
                      lg: "16px",
                    }}}>
                       社内あり
                     </Typography>
                  } />
                </RadioGroup>
                ) : (
                <RadioGroup
                row
                aria-labelledby="in-the-office"
                name="in-the-office"
                defaultValue="absence"
                onChange={(e) => onChangeInTheOffice(e)}
                sx={{mb: 5}}
                >
                  <FormControlLabel value="absence" control={<Radio />} label={
                    <Typography component="p" sx={{fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "16px",
                      lg: "16px",
                    }}}>
                       社内なし
                     </Typography>
                  }/>
                  <FormControlLabel value="presence" control={<Radio />} label={
                    <Typography component="p" sx={{fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "16px",
                      lg: "16px",
                    }}}>
                       社内あり
                     </Typography>
                  } />
                </RadioGroup>
                )}
              </div>
              )}
              {itemCategory === 8 && 
              (
                <Box>
              <SecondaryInput
                id="purchaseLocation"
                label="購入場所"
                value={""}
                onChange={(e: any) => console.log(e.target.value)}
                sx={{ width: "100%", mb: 2 }}
                inputProps={{ maxLength: 18, sx: {
                  fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "16px",
                    lg: "16px",
                  }} }}
              />
              <SecondaryInput
                id="purchaseLocation"
                label="メーカー"
                value={""}
                onChange={(e: any) => console.log(e.target.value)}
                sx={{ width: "100%", mb: 5 }}
                inputProps={{ maxLength: 18, sx: {
                  fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "16px",
                    lg: "16px",
                  }} }}
              />
              </Box>
              )
              }
              
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
              inputImages.length > 0 ? (
                <></>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    component="div"
                    textAlign="center"
                    sx={{ mb: 1, mt: 3, color: "red", fontSize: {
                      xs: "13px", sm: "13px", md: "16px", lg: "16px"
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
                  buttonName="変更内容を破棄"
                  completeAction={() => {
                    navigate(-1);
                  }}
                  cancelButtonColor="gray"
                  openButtonSxStyle={{
                    my: 2,
                    mr: 3,
                    py: "5px",
                    px: {xs:"3px", sm: "3px", md: "5px", lg: "5px"}
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
                      mr: {xs: 0, sm: 3, md: 3, lg:3},
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
                        mr: {xs: 0, sm: 3, md: 3, lg:3},
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
          )
        ) :(
          <div>該当する商品がありません</div>
        )
        
      )}
    </>
  );
});

export default ItemEdit;
