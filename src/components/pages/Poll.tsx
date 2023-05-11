import { memo } from "react";
import { Box, Link, List, ListItem, ListItemText, Paper } from "@mui/material";
import { ActiveBeigeButton } from "../atoms/button/Button";
import { Items, Questionnaire } from "../../types/type";
import PollTitle from "../molecules/poll/PollTitle";
import PollCard from "../card/PollCard";
import DottedMemo from "../atoms/memo/DottedMemo";
import useGetPollCategoryItem from "../../hooks/useGetPollCategoryItem";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import useGetPollLatestTitle from "../../hooks/useGetPollLatestTitle";
import { useNavigate } from "react-router-dom";

const Poll = memo(() => {
  //当月（開催中）のアンケートだけ表示。それ以外は非表示
  const PopularitemData: Items[] = useGetPollCategoryItem(1);
  const OtheritemData: Items[] = useGetPollCategoryItem(2);
  const PopularPollTitle: Questionnaire[] = useGetPollLatestTitle(1);
  const OtherPollTitle: Questionnaire[] = useGetPollLatestTitle(2);
  const navigate = useNavigate();
  const title=[PopularPollTitle[0]].concat(OtherPollTitle[0])
  console.log(title)
  const now = new Date();
  return (
    <>
      <Paper
        sx={{ mb: 5, width: "100%", minWidth: 500, maxWidth: 1200, pb: 13 }}
      >
        <div id="top"></div>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage: "url(/coffeebeens.jpeg)",
            backgroundSize: "200px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-50px top",
            pt: 10,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              fontSize: "30px",
              mt: 5,
              maxWidth: 600,
              minWidth: 600,
            }}
          >
            ＼現在開催中の{" "}
            <span
              style={{ fontSize: "40px", fontWeight: "bold", color: "#F3BF87" }}
            >
              投票
            </span>{" "}
            はこちら／
          </Box>
          <Box>
            <List sx={{ textAlign: "center" }}>
              {!(PopularPollTitle[0]?.endDate <= now) ? (
                <Box sx={{ textAlign: "center" }}>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1,
                      maxWidth: 700,
                      minWidth: 700,
                      // mb: 3,
                      mt: 1,
                    }}
                    button
                    component="a"
                    href={`#popular`}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        textAlign: "center",
                        fontSize: "40px",
                        border: "double #C89F81",
                        p: 1,
                      }}
                    >
                      <LooksOneIcon
                        sx={{ fontSize: "35px", color: "#6B3906" }}
                      />
                      &nbsp;&nbsp;&nbsp;{PopularPollTitle[0]?.name}
                      <span
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          fontSize: "20px",
                          paddingBottom: 1,
                        }}
                      >
                        投票期間：
                        {PopularPollTitle[0]?.startDate.toLocaleDateString()}~
                        {PopularPollTitle[0]?.endDate.toLocaleDateString()}
                      </span>
                    </ListItemText>
                  </ListItem>
                </Box>
              ) : (
                <Box></Box>
              )}

              {!(OtherPollTitle[0]?.endDate <= now) ? (
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    maxWidth: 700,
                    minWidth: 700,
                  }}
                  button
                  component="a"
                  href={`#others`}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      textAlign: "center",
                      fontSize: "40px",
                      border: "double #C89F81",
                      p: 1,
                    }}
                  >
                    <LooksTwoIcon sx={{ fontSize: "35px", color: "#81671C" }} />
                    &nbsp;&nbsp;&nbsp;{OtherPollTitle[0]?.name}
                    <span
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        fontSize: "20px",
                        paddingBottom: 1,
                      }}
                    >
                      投票期間：
                      {OtherPollTitle[0]?.startDate.toLocaleDateString()}~
                      {OtherPollTitle[0]?.endDate.toLocaleDateString()}
                    </span>
                  </ListItemText>
                </ListItem>
              ) : (
                <Box></Box>
              )}
            </List>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", my: 5, mb: 10 }}>
          <ActiveBeigeButton
            event={() => navigate("/home/poll/pollresult")}
            style={{ padding: 15, width: 300, height: 80, fontSize: "23px" }}
          >
            過去の投票結果を見る!
          </ActiveBeigeButton>
        </Box>
        {!(PopularPollTitle[0]?.endDate <= now) ? (
          <>
            <div id="popular"></div>
            <PollTitle poll={PopularPollTitle} />
            <Link href="#top" sx={{ ml: 2 }}>
              ページTOPへ
            </Link>
            <DottedMemo
              text={" 一番気になる、好きなドリンクに投票しよう！"}
              information={"※各投票、お一人につき一回まで投票が可能です"}
              fontSize={"20px"}
              maxWidth={700}
              minWidth={500}
              margin={4}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  fontSize: "30px",
                  my: 5,
                  background: "linear-gradient(transparent 70%, #fffacd 70%)",
                  width: "700px",
                  ml: 2,
                }}
              >
                {" "}
                <AdsClickIcon sx={{ mr: 2, fontSize: "40px" }} />
                気になる商品をクリックして投票しよう!
              </Box>
              <Box sx={{ fontSize: "23px" }}>
                投票商品数
                <span style={{ fontSize: "30px" }}>
                  {PopularitemData.length}
                </span>
                種類
              </Box>
            </Box>
            <PollCard
              data={PopularitemData}
              pollNum={PopularPollTitle[0]?.id}
              pollCategory={PopularPollTitle[0]?.category}
              sxStyle={{mb:3 }}
            />
          </>
        ) : (
          <></>
        )}
        {!(OtherPollTitle[0]?.endDate <= now) ? (
          <>
            <div id="others"></div>
            <PollTitle poll={OtherPollTitle} />
            <Link href="#top" sx={{ ml: 2 }}>
              ページTOPへ
            </Link>
            <DottedMemo
              text={OtherPollTitle[0]?.description}
              information={"※各投票、お一人につき一回まで投票が可能です"}
              fontSize={"20px"}
              maxWidth={700}
              minWidth={500}
              margin={4}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  fontSize: "30px",
                  my: 5,
                  background: "linear-gradient(transparent 70%, #fffacd 70%)",
                  width: "700px",
                  ml: 2,
                }}
              >
                {" "}
                <AdsClickIcon sx={{ mr: 2, fontSize: "40px" }} />
                気になる商品をクリックして投票しよう!
              </Box>
              <Box sx={{ fontSize: "23px" }}>
                投票商品数
                <span style={{ fontSize: "30px" }}>{OtheritemData.length}</span>
                種類
              </Box>
            </Box>
            <PollCard
              data={OtheritemData}
              pollNum={OtherPollTitle[0]?.id}
              pollCategory={OtherPollTitle[0]?.category}
              sxStyle={{mb:3 }}
            />
          </>
        ) : (
          <Box
            sx={{ textAlign: "center", fontSize: "25px", mb: 10, border: 1 }}
          >
            現在開催中の投票はありません。
          </Box>
        )}
      </Paper>
    </>
  );
});

export default Poll;
