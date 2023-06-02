import { memo } from "react";
import { Box, Paper } from "@mui/material";
import { Items, Polls, Questionnaire } from "../../types/type";
import PollTitle from "../molecules/poll/PollTitle";
import PollCard from "../organisms/card/PollCard";
import useGetPollCategoryItem from "../../hooks/useGetPollCategoryItem";
import useGetPollLatestTitle from "../../hooks/useGetPollLatestTitle";
import PollDetail from "../molecules/poll/PollDetail";
import PollAgenda from "../molecules/poll/PollAgenda";
import useGetPollCategoryData from "../../hooks/useGetPollCategoryData";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import PollComplateTitle from "../molecules/poll/PollComplateTitle";

const Poll = memo(() => {
  //当月（開催中）のアンケートだけ表示。それ以外は非表示
  const PopularitemData: Items[] = useGetPollCategoryItem(1);
  const OtheritemData: Items[] = useGetPollCategoryItem(2);
  const PopularPollTitle: Questionnaire[] = useGetPollLatestTitle(1);
  const OtherPollTitle: Questionnaire[] = useGetPollLatestTitle(2);
  //login
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  //カテゴリ別票のデータ
  const PopularPollData: Polls[] = useGetPollCategoryData(1);
  const OthersPollData: Polls[] = useGetPollCategoryData(2);
  const pollTitle = [PopularPollTitle[0]].concat(OtherPollTitle[0]);

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
  //現在表示されているその他投票アンケートに投票しているか
  const isOthersQuestionnaireData = othersData.filter((o) => {
    return o.questionnaireId === OtherPollTitle[0]?.id
  })

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return (
    <>
 <Paper
  sx={{
    mb: 5,
    width: "100%",
    minWidth: 500,
    maxWidth: 1200,
    pb: 13,
  }}
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
      pt: [5, 10],
    }}
  >
    <PollAgenda pollTitle={pollTitle} />
  </Box>
  {(PopularPollTitle[0]?.endDate >= now) ? (
    <>
      <div id="popular"></div>
      {isPopularQuestionnaireData.length === 0 ? (
        <PollTitle poll={PopularPollTitle} />
      ) : (
        <PollComplateTitle poll={PopularPollTitle} />
      )}
      {isPopularQuestionnaireData.length === 0 ? (
        <PollDetail PopularitemData={PopularitemData} titleText={PopularPollTitle[0]?.description} />
      ) : (
        <Box></Box>
      )}
      <PollCard
        data={PopularitemData}
        pollNum={PopularPollTitle[0]?.id}
        pollCategory={PopularPollTitle[0]?.category}
        sxStyle={{ mb: 3 }}
      />
    </>
  ) : (
    <Box></Box>
  )}
  {(OtherPollTitle[0]?.endDate >= now) ? (
    <>
      <div id="others"></div>
      {isOthersQuestionnaireData.length === 0 ? (
        <PollTitle poll={OtherPollTitle} />
      ) : (
        <PollComplateTitle poll={OtherPollTitle} />
      )}
      {isOthersQuestionnaireData.length === 0 ? (
        <PollDetail OtheritemData={OtheritemData} titleText={OtherPollTitle[0]?.description} />
      ) : (
        <Box></Box>
      )}
      <PollCard
        data={OtheritemData}
        pollNum={OtherPollTitle[0]?.id}
        pollCategory={OtherPollTitle[0]?.category}
        sxStyle={{ mb: 3 }}
      />
    </>
  ) : (
    <Box></Box>
  )}
</Paper>
    </>
  );
});

export default Poll;
