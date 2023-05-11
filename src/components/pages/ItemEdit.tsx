import {
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { FC, memo, useEffect, useRef, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import { Box } from "@mui/system";
import ModalWindow from "../organisms/ModalWindow";
import {
  ActiveBorderButton,
  InactiveButton,
} from "../atoms/button/Button";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import useGetAnItem from "../../hooks/useGetAnItem";
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../Firebase";
import { DeleteForever } from "@mui/icons-material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";

type Image = {
  id: number;
  file: any;
  url: string;
};

const ItemEdit: FC = memo(() => {
  const navigate: NavigateFunction = useNavigate();
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<number>(0);
  const isFirstRender = useRef(true);
  const [images, setImages] = useState<Image[]>([]);
  const [updating, setUpdating] = useState<boolean>(false);

  // パラメーターのitemIdを元にデータ取得
  const paramsData = useParams();
  const itemId = Number(paramsData.id);
  const itemData = useGetAnItem({ itemId: itemId });

  // recoilからログインユーザー情報を取得
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  useEffect(() => {
    if (itemData) {
      const initImages = itemData.image.map((url: string, index: number) => {
        return { id: index, file: null, url: url };
      });
      setItemName(itemData.name);
      setItemDescription(itemData.description);
      setItemCategory(itemData.itemCategory);
      setImages(initImages);
      console.log("set complete");
      console.log("item name", itemData.name);
      console.log(itemData.image);
    }
    console.log(itemData);
  }, [itemData]);

  // データ追加処理(確定ボタン)
  const onClickEditItemData: () => Promise<void> = async () => {
    setUpdating(true);
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    const imgDataToAdd: string[] = [];
    for (const obj of images) {
      if (obj.url.substring(0, 5) === "blob:") {
        // urlがnullの場合、fileをアップロードする
        const uniqueId = uuidv4();
        const storageRef = ref(storage, `/${uniqueId}`);
        const uploadImage = uploadBytesResumable(storageRef, obj.file);
        await new Promise<void>((resolve, reject) => {
          uploadImage.on(
            "state_changed",
            (snapshot) => {},
            (err) => {
              console.log(err);
              reject(err);
            },
            async () => {
              const url = await getDownloadURL(storageRef);
              console.log(url);
              imgDataToAdd.push(url);
              resolve();
            }
          );
        });
      } else {
        // urlが存在する場合、そのまま追加する
        imgDataToAdd.push(obj.url);
        console.log(111);
      }
      console.log(imgDataToAdd)
    }
    fetch(`http://localhost:8880/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: itemName,
        description: itemDescription,
        image: imgDataToAdd,
        itemCategory: itemCategory,
        createdAt: new Date(),
        inTheOffice: false,
        author: loginUser.id,
        otherItem: false,
      }),
    }).then(() => {
      setUpdating(false);
      navigate("/adminhome");
    });
  };

  const onChangeImage = (event: any, index: number) => {
    const { files } = event.target;
    const file = files ? files[0] : null;
    const url = file ? URL.createObjectURL(file) : "";
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === index ? { ...img, file, url } : img))
    );
  };

  // 画像削除ボタン
  const DeleteButton = ({ imageIndex }: { imageIndex: number }) => {
    const deleteImage = () => {

      const filterImages = images.filter((image) => {
        return image.id !== imageIndex
      });

      const newImages = filterImages.map((image, index) => {
        image.id = index;
        return image;
      });


      setImages(() => newImages);

    };
    return (
      <Box sx={{ textAlign: "center" }}>
        <IconButton
          onClick={() => deleteImage()}
          sx={{
            color: "black",
            borderRadius: "none",
          }}
        >
          <DeleteForever />
          <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>削除</Typography>
        </IconButton>
      </Box>
    );
  };

  // 画像変更ボタン
  const ImgChangeButton = ({ imageIndex }: { imageIndex: number }) => {
    return (
      <Box sx={{ width: "100%", textAlign: "center", mr: 1 }} key={imageIndex}>
        <IconButton
          sx={{
            color: "black",
            borderRadius: "none",
          }}
        >
          <label
            htmlFor={`itemImageFeild${imageIndex}`}
            style={{ display: "flex" }}
          >
            <AutorenewIcon />
            <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>変更</Typography>
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            id={`itemImageFeild${imageIndex}`}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChangeImage(event, imageIndex);
            }}
          />
        </IconButton>
      </Box>
    );
  };

  // 画像追加ボタン
  const onChangePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: images.length,
        file,
        url: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
    console.log(images);
  };
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <>
      <Paper sx={{ p: 5, width: "80%", m: "auto" }}>
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
              {/* 画像表示 */}
              <Typography variant="body2">{`画像数：(${images.length}/3)`}</Typography>
              <ImageList
                sx={{ width: "auto", height: 230 }}
                cols={3}
                rowHeight={164}
              >
                {images.map((image) => (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <ImageListItem>
                        <img
                          key={image.id}
                          src={image.url}
                          id={`img${image.id}`}
                          alt="商品画像"
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "contain",
                          }}
                        />
                      </ImageListItem>
                      <Box sx={{ display: "flex" }}>
                        <ImageListItemBar
                          title={<ImgChangeButton imageIndex={image.id} />}
                          position="below"
                        />
                        <ImageListItemBar
                          title={<DeleteButton imageIndex={image.id} />}
                          position="below"
                        />
                      </Box>
                    </Box>
                  </>
                ))}
              </ImageList>
              {images.length < 3 && (
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
                      onChange={onChangePreview}
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
              placeholder="商品カテゴリーを選択して下さい"
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
              <MenuItem value={6}>その他</MenuItem>
            </Select>
            {itemName &&
            itemDescription &&
            itemCategory !== 0 &&
            images.length > 0 ? (
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
              images.length > 0 ? (
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
    </>
  );
});

export default ItemEdit;
