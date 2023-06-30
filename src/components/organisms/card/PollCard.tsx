import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ActiveBeigeButton, InactiveButton } from "../../atoms/button/Button";
import { Box, Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginUserFetch } from "../../../hooks/useLoginUserFetch";
//cookie
import Cookies from "js-cookie";
//types
import { Items, Polls, Questionnaire } from "../../../types/type";
//icon
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import ModalWindow from "../ModalWindow";
//hooks
import useGetPollCategoryData from "../../../hooks/useGetPollCategoryData";
import useGetPollLatestTitle from "../../../hooks/useGetPollLatestTitle";
import PostPoll from "../../../utils/PostPoll";

type PollCardProps = {
  data: Items[];
  pollCategory: number;
  pollNum: number;
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
  const PopularPollTitle: Questionnaire[] = useGetPollLatestTitle(1);
  const OtherPollTitle: Questionnaire[] = useGetPollLatestTitle(2);

  //票のuserIdがログインユーザと一致しているかしていないか（ログインユーザが投票しているデータはあるか）
  const popularData = PopularPollData?.filter((pop) => {
    return pop.userId === loginUser.id;
  });

  const othersData = OthersPollData?.filter((other) => {
    return other.userId === loginUser.id;
  });
  
  //現在表示されている人気投票アンケートに投票しているか
  const isPopularQuestionnaireData = popularData.filter((p) => {
    return p.questionnaireId === PopularPollTitle[0]?.id
  })
  //ユーザが今表示されている人気投票に投票した商品
  const popularItem = isPopularQuestionnaireData.map((p) => {
    return p.result
  })

  //現在表示されているその他投票アンケートに投票しているか
  const isOthersQuestionnaireData = othersData.filter((o) => {
    return o.questionnaireId === OtherPollTitle[0]?.id
  })
  //ユーザが今表示されているその他投票に投票した商品
  const othersItem = isOthersQuestionnaireData.map((o) => {
    return o.result
  })
  
  //投票ボタン
  const submitPoll = async (drinkId: number) => {
    const data = {
      questionnaireId: pollNum,
      userId: loginUser.id,
      category: pollCategory,
      result: drinkId,
    };
    const PollData= await PostPoll(data)
    if(PollData){
      navigate("/home")
      alert(`投票を受け付けました。投票ありがとうございました！`)
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
                <Grid container spacing={2}>
        {data &&
          data.map((drink: Items, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
              <Card
                sx={{
                  m: 2,
                  boxShadow: "none",
                  border: "solid 1px ",
                  borderColor: "#bfbec5",
                  pb: 1,
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
                          pt: "3px",
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
                          image="/cocoa.png"
                          title="商品名"
                          sx={{
                            display: "block",
                            width: {
                              sm: "150px",
                              md: "200px",
                            },
                            height: {
                              sm: "150px",
                              md: "200px",
                            },
                            pt: 1,
                            m:"auto"
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            // bgcolor: "RGB(255, 255, 0,0.3)",
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
                        <CardContent >
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
                              fontSize: {
                                xs: "12px",
                                md: "14px",
                                lg:"18px",
                              },
                              borderBottom: "double",
                              fontWeight: "bold",
                              height: "200",
                              mt: 1,
                            }}
                          >
                            {drink.itemName}
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
                          image="/cocoa.png"
                          title="商品名"
                          sx={{
                            display: "block",
                            width: {
                              sm: "150px",
                              md: "200px",
                            },
                            height: {
                              sm: "150px",
                              md: "200px",
                            },
                            pt: 1,
                            margin: "auto"
                          }}
                        />
                        <CardContent sx={{
                        }}>
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
                              fontSize: {
                                xs: "12px",
                                md: "14px",
                                lg:"18px",
                                xl:"18px"
                              },
                              borderBottom: "double",
                              fontWeight: "bold",
                              height: "200",
                              mt: 1,
                            }}
                          >
                            {drink.itemName}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </CardActionArea>
                  )}
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <ActiveBeigeButton
                    onClick={() => {
                      navigate(`/home/search/${drink.id}`);
                    }}
                    sx={{
                      display: "block",
                      background: "#C89F81",
                      mb: 1,
                      width: 180,
                      boxShadow: "none",
                      fontWeight: "bold",
                      m: "auto",
                      border: "double",
                      ":hover": {
                        background: "#C89F81",
                        cursor: "pointer",
                      },
                    }}
                    event={() => {
                      navigate(`/home/search/${drink.id}`);
                    }}
                  >
                    詳細を見る
                  </ActiveBeigeButton>
                </Box>
                {(isPopularQuestionnaireData.length >= 1 &&
                  pollCategory === 1 &&
                  PopularPollData.some(
                    (data) => data.questionnaireId === pollNum
                  )) ||
                  (isOthersQuestionnaireData.length >= 1 &&
                    pollCategory === 2 &&
                    OthersPollData.some(
                      (data) => data.questionnaireId === pollNum
                    )) ||
                  (loginUser.isAdmin === true) ? (
                  (popularItem[0] === drink.id) || (othersItem[0] === drink.id) ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <InactiveButton
                        sx={{
                          background: "#e29399",
                          width: 180,
                          textAlign: "center",
                          mb: 1,
                          boxShadow: "none",
                          border: "dotted 2px",
                          fontWeight: "bold",
                          m: "auto",
                          mt:1,
                          ":hover": {
                            background: "#e29399",
                            cursor: "pointer",
                          },
                        }}
                      >
                        &nbsp;投票した商品です
                      </InactiveButton>
                    </Box>) : (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <InactiveButton
                        sx={{
                          background: "#e29399",
                          width: 180,
                          textAlign: "center",
                          mb: 2,
                          boxShadow: "none",
                          border: "double",
                          fontWeight: "bold",
                          m: "auto",
                          mt: 1,
                          ":hover": {
                            background: "#e29399",
                            cursor: "pointer",
                          },
                        }}
                      >
                        &nbsp;投票完了
                      </InactiveButton>
                    </Box>
                  )

                ) : (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    <ModalWindow
                      title={`${drink.itemName}に投票してもよろしいですか？？`}
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
                        width: 180,
                        mb: 2,
                        boxShadow: "none",
                        border: "double",
                        fontWeight: "bold",
                        m: "auto",
                        ":hover": {
                          background: "#e29399",
                          cursor: "pointer",
                        },
                      }}
                    />
                  </Box>
                )}
              </Card>
              </Grid>
            );
          })}
          </Grid>
      </Box>
    </>
  );
};

export default PollCard;
