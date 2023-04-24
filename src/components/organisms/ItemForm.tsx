import { FC, memo, useState, Dispatch, SetStateAction } from "react";
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";
import {
  Button,
  CardMedia,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
  setItemName: Dispatch<SetStateAction<string>>;
  setItemDescription: Dispatch<SetStateAction<string>>;
  setItemCategory: Dispatch<SetStateAction<number>>;
  setItemImages: Dispatch<SetStateAction<{ id: number; value: string }[]>>;
};

const ItemForm: FC<Props> = memo((props) => {
  // 状態管理
  const [formItemName, setItemName] = useState<string>("");
  const [formItemDescription, setItemDescription] = useState<string>("");
  const [formItemCategory, setItemCategory] = useState<number>(0);
  const [formItemImages, setItemImages] = useState<
    { id: number; value: string }[]
  >([]);

  // propsの受け渡しの処理
  props.setItemName(formItemName);
  props.setItemDescription(formItemDescription);
  props.setItemCategory(formItemCategory);
  props.setItemImages(formItemImages);

  // 画像の削除機能
  const onClickDeleteItemImage: (imageId: number) => void = (imageId: number) => {
    const updatedItemImages = [...formItemImages];
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
      const newImage = {
        id: formItemImages.length + 1,
        value: reader.result as string,
      };
      setItemImages([...formItemImages, newImage]);
    };
  };

  return (
    <>
      <SecondaryInput
        id="itemName"
        label="商品名"
        defaultValue={formItemName}
        required
        onChange={(e: any) => setItemName(e.target.value)}
        sx={{ width: 400, mb: 5 }}
        inputProps={{ maxLength: 20 }}
      />

      <Typography variant="body1" component="p" sx={{ mb: 1 }}>
        商品画像 * 最大3枚まで
      </Typography>

      <Box sx={{ display: "flex", mb: 5, width: 800, alignItems: "center" }}>
        {formItemImages.map((item, index) => {
          return (
            <>
              <Box sx={{ width: 300 }} key={index}>
                <CardMedia
                  component="img"
                  image={item.value}
                  alt="商品画像"
                  sx={{ m: "auto", width: 200 }}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <label htmlFor={item.id.toString()}>
                    <Button
                      style={{
                        background: "none",
                        border: "none",
                        margin: "15px 1px",
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#000",
                        fontFamily: "'M PLUS 1p', sans-serif",
                      }}
                    >
                      変更
                    </Button>
                  </label>
                  <Button
                    key={item.id.toString()}
                    onClick={() => onClickDeleteItemImage(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      margin: "15px 1px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#ff0000",
                      fontFamily: "'M PLUS 1p', sans-serif",
                    }}
                  >
                    削除
                  </Button>
                </div>
              </Box>
            </>
          );
        })}
        {formItemImages.length < 3 && (
          <Box sx={{ width: 300, textAlign: "center" }}>
            <button style={{ background: "none", border: "none" }}>
              <label htmlFor="itemImageFeild">
                <Typography variant="body2" component="p" sx={{ mb: 1, mt: 5 }}>
                  追加
                </Typography>
                <AddCircleOutlineIcon sx={{ fontSize: 30, mb: 5 }} />
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="itemImageFeild"
                onChange={addItemImage}
              />
            </button>
          </Box>
        )}
      </Box>

      <PrimaryInput
        multiline
        aria-label="itemDescription"
        label="商品説明"
        sx={{ width: 800, mb: 5 }}
        inputProps={{ maxLength: 200 }}
        defaultValue={formItemDescription}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setItemDescription(e.target.value)
        }
        rows={5}
      />

      <InputLabel id="itemCategoryField" required>
        商品カテゴリー
      </InputLabel>
      <Select
        labelId="itemCategoryField"
        id="itemCategoryField"
        value={formItemCategory}
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
    </>
  );
});

export default ItemForm;
