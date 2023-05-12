import { memo } from "react";
import { Box, Paper } from "@mui/material";
import { Items, Questionnaire } from "../../types/type";
import PollTitle from "../molecules/poll/PollTitle";
import PollCard from "../organisms/card/PollCard";
import useGetPollCategoryItem from "../../hooks/useGetPollCategoryItem";
import useGetPollLatestTitle from "../../hooks/useGetPollLatestTitle";
import PollDetail from "../molecules/poll/PollDetail";
import PollAgenda from "../molecules/poll/PollAgenda";

const Poll = memo(() => {
  //当月（開催中）のアンケートだけ表示。それ以外は非表示
  const PopularitemData: Items[] = useGetPollCategoryItem(1);
  const OtheritemData: Items[] = useGetPollCategoryItem(2);
  const PopularPollTitle: Questionnaire[] = useGetPollLatestTitle(1);
  const OtherPollTitle: Questionnaire[] = useGetPollLatestTitle(2);
  const pollTitle = [PopularPollTitle[0]].concat(OtherPollTitle[0]);
  const now = new Date();
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
          <PollAgenda pollTitle={pollTitle}/>
        </Box>
        {!(PopularPollTitle[0]?.endDate <= now) ? (
          <>
            <div id="popular"></div>
            <PollTitle poll={PopularPollTitle} />
            <PollDetail PopularitemData={PopularitemData} titleText={PopularPollTitle[0]?.description}/>
            <PollCard
              data={PopularitemData}
              pollNum={PopularPollTitle[0]?.id}
              pollCategory={PopularPollTitle[0]?.category}
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
        {!(OtherPollTitle[0]?.endDate <= now) ? (
          <>
            <div id="others"></div>
            <PollTitle poll={OtherPollTitle} />
            <PollDetail OtheritemData={OtheritemData} titleText={OtherPollTitle[0]?.description}/>
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
      </Paper>
    </>
  );
});

export default Poll;
