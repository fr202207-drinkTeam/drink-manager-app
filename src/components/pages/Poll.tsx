import { memo } from "react";
import { Box, ListItem, ListItemText, Paper, Toolbar } from "@mui/material";
import { ActiveBeigeButton } from "../atoms/button/Button";
import { Items, Questionnaire } from "../../types/type";
import PollTitle from "../molecules/poll/PollTitle";
import PollCard from "../card/PollCard";
import useGetPollCategoryItem from "../../hooks/useGetPollCategoryItem";
import useGetPollLatestTitle from "../../hooks/useGetPollLatestTitle";
import { useNavigate } from "react-router-dom";
import PollDetail from "../molecules/poll/PollDetail";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import ScrollPageTop from "../atoms/ScrollPageTop";
import PollRanking from "../organisms/PollRanking";

const Poll = memo((props) => {
  //当月（開催中）のアンケートだけ表示。それ以外は非表示
  const PopularitemData: Items[] = useGetPollCategoryItem(1);
  const OtheritemData: Items[] = useGetPollCategoryItem(2);
  const PopularPollTitle: Questionnaire[] = useGetPollLatestTitle(1);
  const OtherPollTitle: Questionnaire[] = useGetPollLatestTitle(2);
  const navigate = useNavigate();
  const pollTitle = [PopularPollTitle[0]].concat(OtherPollTitle[0]);
  const now = new Date();
  console.log(typeof PopularPollTitle[0]?.id,"aaa")
  return (
    <>
      <Paper
        sx={{ mb: 5, width: "100%", minWidth: 500, maxWidth: 1200, pb: 13 }}
      >
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
            ＼現在開催中の
            <span
              style={{ fontSize: "40px", fontWeight: "bold", color: "#F3BF87" }}
            >
              &nbsp;投票&nbsp;
            </span>
            はこちら／
          </Box>

          <Box>
            {pollTitle.map((title, index) => (
              <>
                {!(title?.endDate <= now) ? (
                  <Box key={title?.id} sx={{ textAlign: "center" }}>
                    <ListItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 1,
                        maxWidth: 700,
                        minWidth: 700,
                        mt: 1,
                      }}
                      button
                      component="a"
                      href={index === 0 ? `#popular` : "#others"}
                    >
                      <Box id="top" />
                      <ListItemText
                        primaryTypographyProps={{
                          textAlign: "center",
                          fontSize: "40px",
                          border: "double #C89F81",
                          p: 1,
                        }}
                      >
                        {title?.name}
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
                          {title?.startDate.toLocaleDateString()}~
                          {title?.endDate.toLocaleDateString()}
                        </span>
                      </ListItemText>
                    </ListItem>
                  </Box>
                ) : (
                  <Box></Box>
                )}
              </>
            ))}
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
            <PollDetail PopularitemData={PopularitemData} />
            <PollCard
              data={PopularitemData}
              pollNum={PopularPollTitle[0]?.id}
              pollCategory={PopularPollTitle[0]?.category}
              sxStyle={{ mb: 3 }}
            />
          </>
        ) : (
          <></>
        )}
        {!(OtherPollTitle[0]?.endDate <= now) ? (
          <>
            <div id="others"></div>
            <PollTitle poll={OtherPollTitle} />
            <PollDetail OtheritemData={OtheritemData} />
            <PollCard
              data={OtheritemData}
              pollNum={OtherPollTitle[0]?.id}
              pollCategory={OtherPollTitle[0]?.category}
              sxStyle={{ mb: 3 }}
            />
          </>
        ) : (
          <Box
            sx={{ textAlign: "center", fontSize: "25px", mb: 10, border: 1 }}
          >
            現在開催中の投票はありません。
          </Box>
        )}
        <ScrollPageTop {...props}>
          <Fab
            size="large"
            aria-label="scroll back to top"
            sx={{
              bottom: "120px",
              backgroundColor: "#9AB7CA",
              color: "#fff",
              ":hover": {
                background: "#9AB7CA",
                cursor: "pointer",
              },
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </ScrollPageTop>
      </Paper>
    </>
  );
});

export default Poll;
