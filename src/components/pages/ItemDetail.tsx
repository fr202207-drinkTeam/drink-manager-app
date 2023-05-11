import { FC, memo } from "react";
import { useState } from "react";
import useGetAnItem from "../../hooks/useGetAnItem";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { ActiveDarkBlueButton } from "../atoms/button/Button";
import Slider from "../atoms/slider/Slider";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import type { Posts } from "../../types/type";
import ModalWindow from "../organisms/ModalWindow";
import TimelineCorner from "../organisms/TimelineCorner";

const ItemDetail: FC = memo(() => {
  const [postData, setPostData] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [displayPostId, setDisplayPostId] = useState<number>(0);
  const [displayPostData, setDisplayPostData] = useState<any>(null);

  // 受け手
  // const location = useLocation();
  // const { itemId } = location.state as State;

  const paramsData = useParams();
  const itemId = Number(paramsData.id);
  const itemData = useGetAnItem({ itemId: itemId });
  const navigate: NavigateFunction = useNavigate();

  // 投稿削除処理(削除ボタン)
  const onClickDeleteItem = async () => {
    fetch(`http://localhost:8880/items/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log("delete success", res);
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
          {itemData && (
            <>
              <Box
                sx={{ display: "flex", mb: 5, alignItems: "center", ml: 10 }}
              >
                <FreeBreakfastIcon fontSize="large" />
                <Typography variant="h3" component="p" sx={{ ml: 2 }}>
                  {itemData.name}
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
                    images={itemData.image}
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
                    {itemData.description}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    component="div"
                    textAlign="center"
                    sx={{ p: 1, fontWeight: 600 }}
                  >
                    \ 商品に関連するタイムラインはこちら /
                  </Typography>

                  <TimelineCorner itemId={itemId} completeFetch={setLoading}></TimelineCorner>
                </Box>
              </Box>
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
            </>
          )}
          {!loading && itemData && (
            <div>該当する商品がありません</div>
          )}
        </>
      )}
    </>
  );
});

export default ItemDetail;
