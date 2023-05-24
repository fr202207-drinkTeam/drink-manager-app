import { FC, memo, Dispatch, SetStateAction } from "react";
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";
import { InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PreviewImage from "../molecules/PreviewImage";
import previewImages from "../../utils/previewImages";

type Props = {
  setItemName: Dispatch<SetStateAction<string>>;
  setItemDescription: Dispatch<SetStateAction<string>>;
  setItemCategory: Dispatch<SetStateAction<number>>;
  setItemImages: Dispatch<SetStateAction<File[]>>;
  itemName: string;
  itemDescription: string;
  itemImages: any;
  itemCategory: number;
};

const ItemForm: FC<Props> = memo((props) => {

  return (
    <>
      <SecondaryInput
        id="itemName"
        label="商品名"
        value={props.itemName}
        required
        onChange={(e: any) => props.setItemName(e.target.value)}
        sx={{ width: 400, mb: 5 }}
        inputProps={{ maxLength: 18 }}
      />

      <Typography
        variant="body1"
        component="p"
        sx={{ mb: 1, color: "rgba(0, 0, 0, 0.6)" }}
      >
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
        {props.itemImages.length > 0 && (
          <PreviewImage
            inputImages={props.itemImages}
            setInputImages={props.setItemImages}
            inputLength={props.itemImages.length}
            width={"100%"}
            height={"150px"}
          />
        )}
        {props.itemImages.length < 3 && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <button style={{ background: "none", border: "none" }}>
              <label htmlFor="itemImageFeild">
                <Typography variant="body2" component="p">
                  追加
                </Typography>
                <AddCircleOutlineIcon sx={{ fontSize: 30, mb: 5 }} />
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="itemImageFeild"
                accept=".png, .jpg, .jpeg"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  previewImages(event, props.itemImages, props.setItemImages);
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
        value={props.itemDescription}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setItemDescription(e.target.value)
        }
        rows={4}
      />

      <InputLabel id="itemCategoryField" required>
        商品カテゴリー
      </InputLabel>
      <Select
        labelId="itemCategoryField"
        id="itemCategoryField"
        value={props.itemCategory}
        label="商品カテゴリー"
        placeholder="商品カテゴリーを選択して下さい"
        onChange={(e) => {
          props.setItemCategory(Number(e.target.value));
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
