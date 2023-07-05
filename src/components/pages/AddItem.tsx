import { FC, memo, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { InactiveButton, ActiveBorderButton } from "../atoms/button/Button";
import AdmTitleText from "../atoms/text/AdmTitleText";
import ImgPathConversion from ".././../utils/ImgPathConversion";
import CheckForDuplicates from "../../utils/CheckForDuplicates";
import PostItemData from "../../utils/PostItemData";
import ModalWindow from "../organisms/ModalWindow";
import ItemForm from "../organisms/ItemForm";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { CircularProgress } from "@mui/material";
import { Users } from "../../types/type";

type Props = {
  pollFlag?: boolean;
  handleClose?: any;
  trigger?: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddItem: FC<Props> = memo(
  ({ pollFlag, handleClose, trigger, setTrigger }) => {
    const navigate: NavigateFunction = useNavigate();
    const [itemName, setItemName] = useState<string>("");
    const [itemDescription, setItemDescription] = useState<string>("");
    const [itemCategory, setItemCategory] = useState<number>(0);
    const [itemImages, setItemImages] = useState<File[]>([]);
    const [presenceOrAbsence, setPresenceOrAbsence] = useState<boolean>(false);
    const [adding, setAdding] = useState<boolean>(false);
    const [isDuplicateData, setIsDuplicateData] = useState<boolean>(false);

    // Cookieからログインユーザー情報を取得
    const authId: string = Cookies.get("authId")!;
    const isAdmin = Cookies.get("isAdmin")!;
    const loginUser: Users = useLoginUserFetch({ authId: authId });

    // データ追加処理(確定ボタン)
    const onClickAddItemData: () => Promise<void> = async () => {
      setAdding(true);

      const itemNameIsPassed = await CheckForDuplicates({ itemName: itemName });
      if (!itemNameIsPassed) {
        setIsDuplicateData(true);
        setAdding(false);
        return;
      }
      const imagePath: string | unknown[] = await ImgPathConversion({
        imgFiles: itemImages,
      });
      const imagePaths = imagePath.map((image) => {
        return { imagePath: image };
      });

      const data = {
        itemName: itemName,
        description: itemDescription,
        itemCategory: itemCategory,
        inTheOffice: presenceOrAbsence,
        approval: isAdmin ? true : false,
        author: loginUser.id,
        pollItem: pollFlag ? true : false,
        isDiscontinued: false,
        images: imagePaths,
      };

      const postItemResult = await PostItemData(data);
      console.log(postItemResult)

      if (postItemResult) {
        if (pollFlag) {
          setTrigger(!trigger);
          handleClose();
          return;
        }
        // navigate("/adminhome");
      }
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
        <Paper
          sx={{
            p: 5,
            width: { xs: "100%", sm: "100%", md: "100%", lg: "80%" },
            m: "auto",
          }}
        >
          <AdmTitleText>商品追加</AdmTitleText>
          <Box id="top" />
          {adding ? (
            <>
              <Typography
                variant="body1"
                component="div"
                textAlign="center"
                sx={{ margin: { xs: 0, lg: "200px" } }}
              >
                <p>登録中</p>
                <CircularProgress />
              </Typography>
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
              {isDuplicateData && (
                <>
                  <Typography
                    id="duplication-error"
                    variant="body1"
                    component="div"
                    textAlign="center"
                    sx={{
                      mb: 1,
                      mt: 3,
                      color: "red",
                      fontSize: {
                        xs: "13px",
                      },
                    }}
                  >
                    商品名が重複しています
                  </Typography>
                </>
              )}
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
                    sx={{
                      mb: 1,
                      mt: 3,
                      color: "red",
                      fontSize: {
                        xs: "13px",
                        sm: "13px",
                        md: "16px",
                        lg: "16px",
                      },
                    }}
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
                    px: { xs: "3px", sm: "3px", md: "5px", lg: "5px" },
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
                      mr: { xs: 0, sm: 3, md: 3, lg: 3 },
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
                        mr: { xs: 0, sm: 3, md: 3, lg: 3 },
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
  }
);

export default AddItem;
