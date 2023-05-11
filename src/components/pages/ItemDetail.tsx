import { FC, memo, useEffect } from "react";
import { useState } from "react";
import useGetAnItem from "../../hooks/useGetAnItem";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ActiveDarkBlueButton } from "../atoms/button/Button";
import Slider from "../atoms/slider/Slider";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import type { Post } from "../../types/type";
import { Link } from "react-router-dom";
import ModalWindow from "../organisms/ModalWindow";

const ItemDetail: FC = memo(() => {
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [itemId, setItemId] = useState()

  // 受け手
  // const location = useLocation();
  // const { itemId } = location.state as State;

  const paramsData = useParams();
  const itemId = Number(paramsData.id);
  const itemData = useGetAnItem({ itemId: itemId });
  const navigate: NavigateFunction = useNavigate();

  // 投稿取得
  useEffect(() => {
    // 関連する投稿を取得
    fetch(`http://localhost:8880/posts?itemId=${itemId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPostData(data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    postData.map((post) => {
      // 投稿のいいねを取得
      fetch(`http://localhost:8880/likes?postId=${post.id}?`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPostData(data);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }, [itemId]);

  // 投稿削除処理(削除ボタン)
  const onClickdeleteItem = async () => {
    try {
      const response = await fetch(`http://localhost:8880/items/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log("Delete error!");
        throw new Error("HTTP error " + response.status);
      }

      console.log("Delete success!");
      // navigate(-1);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  console.log(postData);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {itemData ? (
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
                <Box>
                  <Box
                    sx={{
                      mr: 10,
                      p: 1,
                      display: "flex",
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

                  <Card
                    sx={{
                      p: 1,
                      backgroundColor: "#f3bf88",
                      border: "2px dashed #fff ",
                      boxShadow: " 0 0 0 8px #f3bf88",
                      maxWidth: 500,
                      minWidth: 100,
                      display: "flex",
                    }}
                  >
                    {postData.length > 0 ? (
                      <>
                        <Box sx={{ display: "flex" }}>
                          <CardContent
                            sx={{
                              flex: "1 0 auto",
                              width: "0.7",
                              overflowY: "scroll",
                              height: 200,
                            }}
                          >
                            <Typography variant="body2" component="p">
                              {postData[0].content}
                            </Typography>
                          </CardContent>
                        </Box>
                        {postData[0].postImage.length > 0 && (
                          <CardMedia
                            component="img"
                            sx={{
                              p: 1,
                              m: "auto",
                              maxWidth: 300,
                              minWidth: 80,
                            }}
                            image={postData[0].postImage[0]}
                            alt="スナック名"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          textAlign="center"
                          sx={{ p: 1, mt: 3, mb: 3, mx: "auto" }}
                        >
                          該当するタイムラインがありません
                        </Typography>
                      </>
                    )}
                  </Card>

                  {postData.length > 0 ? (
                    <Button
                      style={{
                        marginTop: "10px",
                        display: "block",
                        marginLeft: "auto",
                        background: "none",
                        width: "150px",

                        fontFamily: "'M PLUS 1p', sans-serif",
                      }}
                    >
                      <Link
                        to="/home/timeline"
                        state={{ itemId: itemId }}
                        style={{ color: "#1976D2" }}
                      >
                        タイムラインへ移動
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => navigate("/home/timeline")}
                      style={{
                        marginTop: "10px",
                        display: "block",
                        marginLeft: "auto",
                        background: "none",
                        width: "150px",
                        fontFamily: "'M PLUS 1p', sans-serif",
                      }}
                    >
                      タイムラインへ移動
                    </Button>
                  )}
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

                {/* <ActiveRedButton
            event={() => console.log("kari")}
            variant="contained"
            sxStyle={{
              my: 2,
              ml: 3,
            }}
          >
            商品を削除
          </ActiveRedButton> */}
                <ModalWindow
                  title=""
                  content="商品データを本当に削除しますか？"
                  openButtonColor="red"
                  completeButtonColor="red"
                  completeButtonName="削除"
                  completeAction={onClickdeleteItem}
                  cancelButtonColor="gray"
                  openButtonSxStyle={{
                    my: 2,
                  }}
                />
              </Box>
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
