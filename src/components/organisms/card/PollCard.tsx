import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ActiveBeigeButton, InactiveButton } from "../../atoms/button/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginUserFetch } from "../../../hooks/useLoginUserFetch";
//cookie
import Cookies from "js-cookie";
//types
import { Items, Polls } from "../../../types/type";
//icon
import SearchIcon from "@mui/icons-material/Search";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import ModalWindow from "../ModalWindow";
//hooks
import useGetPollCategoryData from "../../../hooks/useGetPollCategoryData";
import { useEffect, useState } from "react";

type PollCardProps = {
  data: Items[];
  pollCategory: number;
  pollNum?: number;
  sxStyle?: any;
};

const PollCard = ({ data, pollNum, pollCategory, sxStyle }: PollCardProps) => {
  const navigate = useNavigate();
  //login
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  //カテゴリ別票のデータ
  const PopularPollData: Polls[] = useGetPollCategoryData(1);
  const OthersPollData: Polls[] = useGetPollCategoryData(2);

  //票のuserIdがログインユーザと一致しているかしていないか（ログインユーザが投票しているデータはあるか）
  const popularData = PopularPollData?.filter((pop) => {
    return pop.userId === loginUser.id;
  });

  const othersData = OthersPollData?.filter((other) => {
    return other.userId === loginUser.id;
  });

  //現在表示されている人気投票アンケートに投票しているか
  const isPopularQuestionnaireData = popularData.filter((p) => {
    return p.questionnaireId === pollNum
  })
  //ユーザが今表示されている人気投票に投票した商品
  const popularItem = isPopularQuestionnaireData.map((p) => {
    return p.result
  })
  //現在表示されているその他投票アンケートに投票しているか
  const isOthersQuestionnaireData = othersData.filter((o) => {
    return o.questionnaireId === pollNum
  })
  //ユーザが今表示されているその他投票に投票した商品
  const othersItem = isOthersQuestionnaireData.map((o) => {
    return o.result
  })

  //投票ボタン
  const submitPoll = async (drinkId: number) => {
    try {
      const data = {
        questionnaireId: pollNum,
        userId: loginUser.id,
        category: pollCategory,
        result: drinkId,
        createdAt: new Date(),
      };
      const response = await fetch("http://localhost:8880/polls", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      navigate("/home")
      alert(`投票を受け付けました。投票ありがとうございました！`)
    } catch (err) {
      console.log(err, "エラー");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          ml: 3,
        }}
      >

        {data &&
          data.map((drink: Items, index) => {
            return (
              <Card
                sx={{
                  width: 295,
                  mx: 2,
                  boxShadow: "none",
                  border: "solid 1px ",
                  borderColor: "#bfbec5",
                  ...sxStyle,
                }}
                key={index}
              >
                {(popularItem[0] === drink.id) || (othersItem[0] === drink.id) ?
                  (
                    <CardActionArea component="a" href={`/home/search/${drink.id}`}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                          textAlign: "center",
                          fontSize: "13px",
                          backgroundColor: "#d6c6af",
                          width: 80,
                          p: "3px",
                          color: "#000",
                          borderRadius: "3px",
                        }}
                      >
                        {(() => {
                          if (
                            Number(drink.itemCategory) >= 1 &&
                            Number(drink.itemCategory) <= 4
                          ) {
                            return "コーヒー";
                          } else if (drink.itemCategory === 5) {
                            return "ティー";
                          } else if (drink.itemCategory === 6) {
                            return "ココア";
                          } else {
                            return "その他";
                          }
                        })()}
                      </Typography>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="商品画像"
                          height="140"
                          width="140"
                          image={drink.image[0]}
                          title="商品名"
                          sx={{
                            display: "block",
                            width: 200,
                            height: 200,
                            objectFit: "cover",
                            m: "auto",
                            p: 1,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "RGB(238, 232, 170,0.3)",
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#fff",
                            zIndex: 1,
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                        </Typography>
                        <CardContent sx={{ height: "150px" }}>
                          {drink.intheOffice ? (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                textAlign: "center",
                                fontSize: "13px",
                                backgroundColor: "#e0ebaf",
                                width: 80,
                                p: "3px",
                                color: "#000",
                                borderRadius: "3px",
                              }}
                            >
                              社内あり
                            </Typography>
                          ) : (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                textAlign: "center",
                                fontSize: "13px",
                                backgroundColor: "#a4c1d7",
                                width: 80,
                                p: "3px",
                                color: "#000",
                                borderRadius: "3px",
                              }}
                            >
                              社内なし
                            </Typography>
                          )}
                          <Typography
                            gutterBottom
                            sx={{
                              textAlign: "center",
                              fontSize: "14px",
                              borderBottom: "double",
                              fontFamily: "Georgia",
                              fontWeight: "bold",
                              height: "200",
                              mt: 1,
                            }}
                          >
                            {drink.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            sx={{ textAlign: "center", fontSize: "13px" }}
                          >
                            {drink.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </CardActionArea>
                  )
                  :
                  (
                    <CardActionArea component="a" href={`/home/search/${drink.id}`}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{
                          textAlign: "center",
                          fontSize: "13px",
                          backgroundColor: "#d6c6af",
                          width: 80,
                          p: "3px",
                          color: "#000",
                          borderRadius: "3px",
                        }}
                      >
                        {(() => {
                          if (
                            Number(drink.itemCategory) >= 1 &&
                            Number(drink.itemCategory) <= 4
                          ) {
                            return "コーヒー";
                          } else if (drink.itemCategory === 5) {
                            return "ティー";
                          } else if (drink.itemCategory === 6) {
                            return "ココア";
                          } else {
                            return "その他";
                          }
                        })()}
                      </Typography>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="商品画像"
                          height="140"
                          width="140"
                          image={drink.image[0]}
                          title="商品名"
                          sx={{
                            display: "block",
                            width: 200,
                            height: 200,
                            objectFit: "cover",
                            m: "auto",
                            p: 1,
                          }}
                        />
                        <CardContent sx={{ height: "150px" }}>
                          {drink.intheOffice ? (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                textAlign: "center",
                                fontSize: "13px",
                                backgroundColor: "#e0ebaf",
                                width: 80,
                                p: "3px",
                                color: "#000",
                                borderRadius: "3px",
                              }}
                            >
                              社内あり
                            </Typography>
                          ) : (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              sx={{
                                textAlign: "center",
                                fontSize: "13px",
                                backgroundColor: "#a4c1d7",
                                width: 80,
                                p: "3px",
                                color: "#000",
                                borderRadius: "3px",
                              }}
                            >
                              社内なし
                            </Typography>
                          )}
                          <Typography
                            gutterBottom
                            sx={{
                              textAlign: "center",
                              fontSize: "14px",
                              borderBottom: "double",
                              fontFamily: "Georgia",
                              fontWeight: "bold",
                              height: "200",
                              mt: 1,
                            }}
                          >
                            {drink.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            sx={{ textAlign: "center", fontSize: "13px" }}
                          >
                            {drink.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </CardActionArea>
                  )}

                <ActiveBeigeButton
                  onClick={() => {
                    navigate(`/home/search/${drink.id}`);
                  }}
                  sxStyle={{
                    background: "#C89F81",
                    mb: 1,
                    width: 200,
                    boxShadow: "none",
                    fontWeight: "bold",
                    ml: 6.5,
                    border: "double",
                  }}
                  event={() => {
                    navigate(`/home/search/${drink.id}`);
                  }}
                >
                  <SearchIcon />
                  気になる
                </ActiveBeigeButton>
                {(popularData.length >= 1 &&
                  pollCategory === 1 &&
                  PopularPollData.some(
                    (data) => data.questionnaireId === pollNum
                  )) ||
                  (othersData.length >= 1 &&
                    pollCategory === 2 &&
                    OthersPollData.some(
                      (data) => data.questionnaireId === pollNum
                    )) ||
                  (loginUser.isAdmin === true) ? (
                  (popularItem[0] === drink.id) || (othersItem[0] === drink.id) ? (<InactiveButton
                    sx={{
                      background: "#e29399",
                      width: 200,
                      textAlign: "center",
                      mb: 2,
                      boxShadow: "none",
                      border: "dotted 2px",
                      fontWeight: "bold",
                      ml: 6.5,
                      ":hover": {
                        background: "#e29399",
                        cursor: "pointer",
                      },
                    }}
                  >
                    &nbsp;投票した商品です
                  </InactiveButton>) : (<InactiveButton
                    sx={{
                      background: "#e29399",
                      width: 200,
                      textAlign: "center",
                      mb: 2,
                      boxShadow: "none",
                      border: "double",
                      fontWeight: "bold",
                      ml: 6.5,
                      ":hover": {
                        background: "#e29399",
                        cursor: "pointer",
                      },
                    }}
                  >
                    &nbsp;投票完了
                  </InactiveButton>)

                ) : (
                  <ModalWindow
                    title={`${drink.name}に投票してもよろしいですか？？`}
                    content={"⚠️一つの投票につき一回までしか投票できません"}
                    openButtonColor={"pink"}
                    openButtonIcon={
                      <>
                        <SwitchAccessShortcutAddIcon />
                        &nbsp;&nbsp;
                      </>
                    }
                    completeButtonColor={"blue"}
                    completeButtonName={`投票する`}
                    completeAction={() => submitPoll(drink.id)}
                    cancelButtonColor={"red"}
                    openButtonSxStyle={{
                      background: "#e29399",
                      width: 200,
                      mb: 2,
                      boxShadow: "none",
                      border: "double",
                      fontWeight: "bold",
                      ml: 6.5,
                      ":hover": {
                        background: "#e29399",
                        cursor: "pointer",
                      },
                    }}
                  />
                )}
              </Card>
            );
          })}
      </Box>
    </>
  );
};

export default PollCard;
