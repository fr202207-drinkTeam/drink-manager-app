import { FC, memo, useState } from "react";
import useGetAnItem from "../../hooks/useGetAnItem";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { ActiveDarkBlueButton } from "../atoms/button/Button";
import Slider from "../atoms/slider/Slider";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import ModalWindow from "../organisms/ModalWindow";
import TimelineCorner from "../organisms/TimelineCorner";
import Cookies from "js-cookie";

const ItemDetail: FC = memo(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const paramsData: Readonly<Params<string>> = useParams();
  const itemId: number = Number(paramsData.id);
  const navigate: NavigateFunction = useNavigate();
  const getAnItemComplete = (isComplete: boolean) => {
    setLoading(isComplete);
  };
  const getAnItemResult = useGetAnItem({
    itemId: itemId,
    onFetchComplete: getAnItemComplete,
  });
  const isAdmin: string = Cookies.get("isAdmin")!;

  // 投稿削除処理(削除ボタン)
  const onClickDeleteItem: () => Promise<void> = async () => {
    fetch(`http://localhost:8880/items/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => {
        navigate("/adminhome");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    return;
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {getAnItemResult.itemData ? (
            <>
              <Box
                sx={{ display: "flex", mb: 5, alignItems: "center", ml: 10 }}
              >
                <Box id="top" />
                <FreeBreakfastIcon fontSize="large" />
                <Typography variant="h3" component="p" sx={{ ml: 2 }}>
                  {getAnItemResult.itemData.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: "flex" },
                  mb: 10,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    mr: 10,
                    p: 1,
                    ml: 10,
                    alignItems: "center",
                    width: 400,
                  }}
                >
                  <Slider
                    images={getAnItemResult.itemData.image}
                    slidesPerView={1}
                    loop={true}
                    navigation={true}
                    autoplay={false}
                  />
                </Box>

                <Box sx={{ mr: 5, width: 500 }}>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ p: 1, mb: 2 }}
                  >
                    【商品説明】
                    <br />
                    {getAnItemResult.itemData.description.replace(/\n<a href=.*/, "")}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    component="div"
                    textAlign="center"
                    sx={{ p: 1, fontWeight: 600 }}
                  >
                    \ 商品に関連するタイムラインはこちら /
                  </Typography>

                  <TimelineCorner itemId={itemId}></TimelineCorner>
                </Box>
              </Box>
              {isAdmin ? (
                <Box sx={{ display: "flex", mr: 5 }}>
                <ActiveDarkBlueButton
                  event={() => navigate(`/adminhome/itemedit/${itemId}`)}
                  sxStyle={{
                    my: 2,
                    ml: "auto",
                    mr: 2,
                  }}
                >
                  商品を編集
                </ActiveDarkBlueButton>
                <ModalWindow
                  title=""
                  content="商品データを本当に削除しますか？"
                  openButtonColor="red"
                  completeButtonColor="red"
                  completeButtonName="削除"
                  completeAction={onClickDeleteItem}
                  cancelButtonColor="gray"
                  openButtonSxStyle={{
                    my: 2,
                  }}
                />
              </Box>
              ) : (
                <></>
              )}
              
            </>
          ) : (
            <div>該当する商品がありません</div>
          )}
        </>
      )}
    </>
  );
});

export default ItemDetail;
