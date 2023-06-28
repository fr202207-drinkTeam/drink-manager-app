import { FC, memo, useEffect, useState } from "react";
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
import DiscontinuedItemProcessing from "../../utils/DiscontinuedItemProcessing";

const ItemDetail: FC = memo(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const [imagePaths, setImagePaths] = useState<string[]>([])
  const paramsData: Readonly<Params<string>> = useParams();
  const itemId: number = Number(paramsData.id);
  const navigate: NavigateFunction = useNavigate();

  const getAnItemComplete: (isComplete: boolean) => void = (isComplete) => {
    setLoading(isComplete);
  };
  
  const getAnItemResult = useGetAnItem({
    itemId: itemId,
    onFetchComplete: getAnItemComplete,
  });
  const isAdmin: string = Cookies.get("isAdmin")!;

  useEffect(() => {
    if(getAnItemResult.itemData) {
      const itemImagePaths: string[] = getAnItemResult.itemData.images.map((itemImage: { createdAt: Date, id: number, imagePath: string, itemId: number }) => {
        return itemImage.imagePath;
      });
      setImagePaths(itemImagePaths)
    }
  },[getAnItemResult.itemData])
    
  // 商品廃盤処理(削除ボタン)
  const onClickDeleteItem: () => Promise<void> = async () => {
    const successDiscontinued: boolean = await DiscontinuedItemProcessing({itemId: itemId})
    if(successDiscontinued) {
      navigate("/adminhome");
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {getAnItemResult.itemData ? (
            getAnItemResult.itemData.isDiscontinued ? (
              <div>該当する商品がありません</div>
            ) : (
              <>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "18px",
                        lg: "18px",
                      },
                      color: "#E83929",
                      mb: 2,
                      textAlign: "center",
                      background: "#fff",
                    }}
                  >
                    承認待ち
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 5,
                      ml: {
                        lg: 10,
                      },
                    }}
                  >
                    <Box id="top" />
                    <FreeBreakfastIcon fontSize="large" />
                    <Typography
                      variant="h3"
                      component="p"
                      sx={{
                        ml: 2,
                        fontSize: {
                          xs: "20px",
                          sm: "20px",
                          md: "30px",
                          lg: "30px",
                        },
                      }}
                    >
                      {getAnItemResult.itemData.itemName}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: {
                        lg: "flex",
                      },
                      mb: { lg: 10 },
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        mr: {
                          xs: "auto",
                          sm: "auto",
                          md: "auto",
                          lg: 10,
                        },
                        p: 1,
                        ml: {
                          xs: "auto",
                          sm: "auto",
                          md: "auto",
                          lg: 10,
                        },
                        alignItems: "center",
                        width: {
                          xs: 220,
                          sm: 400,
                          md: 400,
                          lg: 400,
                        },
                      }}
                    >
                      <Slider
                        images={imagePaths}
                        slidesPerView={1}
                        loop={true}
                        navigation={true}
                        autoplay={false}
                      />
                    </Box>
                    <Box sx={{ mr: { lg: 5 }, width: { lg: 500 } }}>
                      <Typography
                        variant="body1"
                        component="p"
                        sx={{ p: 1, fontSize: { xs: "14px", lg: "16px" } }}
                      >
                        【商品説明】
                        <br />
                        {getAnItemResult.itemData.description.replace(
                          /\n<a href=.*/,
                          ""
                        )}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        sx={{
                          p: 1,
                          mb: 2,
                          fontSize: { xs: "14px", lg: "16px" },
                        }}
                      >
                        購入場所：セブンイレブン
                        <br />
                        メーカー：グリコ
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        textAlign="center"
                        sx={{
                          p: { lg: 1 },
                          fontWeight: 600,
                          fontSize: { xs: "12px", lg: "16px" },
                          pb: { xs: "7px" },
                        }}
                      >
                        \ 商品に関連するタイムラインはこちら /
                      </Typography>

                      <TimelineCorner itemId={itemId}></TimelineCorner>
                    </Box>
                  </Box>
                  {isAdmin ? (
                    <Box sx={{ display: "flex", mr: { lg: 5 } }}>
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
                </Box>
                {/* <Box sx={{ display: "flex", mr: { lg: 5 } }}>
                  <ActiveDarkBlueButton
                    event={() => navigate(`/adminhome/itemedit/${itemId}`)}
                    sxStyle={{
                      my: 2,
                      ml: "auto",
                      mr: 2,
                    }}
                  >
                    承認
                  </ActiveDarkBlueButton>
                  <ModalWindow
                    title=""
                    content="商品データを本当に却下しますか？"
                    openButtonColor="red"
                    completeButtonColor="red"
                    completeButtonName="却下"
                    completeAction={() => console.log("却下")}
                    cancelButtonColor="gray"
                    openButtonSxStyle={{
                      my: 2,
                    }}
                  />
                </Box> */}
              </>
            )
          ) : (
            <Typography
              variant="subtitle1"
              component="div"
              textAlign="center"
              sx={{ p: { lg: 1 }, fontWeight: 600, fontSize: { xs: "12px" } }}
            >
              該当する商品がありません
            </Typography>
          )}
        </>
      )}
    </>
  );
});

export default ItemDetail;
