/* eslint-disable array-callback-return */
import {  memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import DottedMemo from "../atoms/memo/DottedMemo";
import ItemCard from "../card/ItemCard";
import { Items, Polls, Questionnaire } from "../../types/type";
import PollTitleResult from "../molecules/poll/PollTitleResult";
import useGetAnQuestionnaire from "../../hooks/useGetAnQuestionnaire";
import useGetAllItems from "../../hooks/useGetAllItems";
import useGetAnPoll from "../../hooks/useGetAnPoll";

const PollResult = memo(() => {
  const { id } = useParams();
  const [pollCount, setPollCounts] = useState<Items[]>([]);
  const questionnaire: Questionnaire|undefined = useGetAnQuestionnaire(Number(id));
  const items: Items[]= useGetAllItems();
  const polls: Polls[]= useGetAnPoll(Number(id));

  //投票結果集計
  const pollCounts: any = {};
  polls.forEach((item) => {
    if (item.questionnaireId === Number(id)) {
      if (pollCounts[item.result]) {
        pollCounts[item.result]++;
      } else {
        pollCounts[item.result] = 1;
      }
    }
  });

  //票の大きい商品順で並び替え
  const sortedPolls = Object.entries(pollCounts).sort(
    (a: any, b: any) => b[1] - a[1]
  );
  const result = sortedPolls.map((subArr) => {
    return subArr[0];
  });
  const pollResult = result.map(Number);

  //value票の数を多い順に並び替え
  const values = Object.values(pollCounts).map(Number);
  values.sort((a, b) => b - a);

  //questionnerに登録されているpolledItemsのidを取得
  useEffect(() => {
    if (polls.length > 0 && questionnaire && items.length > 0) {
      //商品ID投票されている商品ID
      const polllCountItems = items.filter((item: Items) => {
        return pollResult.includes(item.id);
      });
      polllCountItems.sort((a: Items, b: Items) => {
        const aCount = pollCounts[a.id];
        const bCount = pollCounts[b.id];
        return bCount - aCount;
      });
      setPollCounts(polllCountItems);
    }
  }, [id, questionnaire]);

  return (
    <>
      <Paper>
        <PollTitleResult poll={questionnaire}/>
        {Object.keys(pollCounts).length >=1 ?
         <>
        <DottedMemo
          text={"たくさんのご投票ありがとうございました!!"}
          information={""}
          fontSize={"25px"}
          maxWidth={700}
          minWidth={500}
          margin={1}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            mt:5
          }}
        >
          {values.slice(0, 3).map(
            (data, index) =>
              // インデックスが3未満の場合にのみBox要素を描画（３位まで）
              index < 3 && (
                <Box key={index} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <Box
                    sx={{
                      p: 5,
                      backgroundImage: `url(/crown${index + 1}.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "70px",
                      backgroundPosition: "center",
                    }}
                  ></Box>
                  <Box sx={{ fontSize: "25px", textAlign: "center" ,ml:5,mt:2,background: "linear-gradient(transparent 70%, #fffacd 70%)",
                  width: "100px",}}>
                    {values[index]}票
                  </Box>
                </Box>
              )
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
        {pollCount.length > 0 && <ItemCard data={pollCount.slice(0, 3)} sxStyle={{ maxWidth: 310, minWidth:310, mb:1 }} />}
        </Box>
        {values.length >= 4 && (
          <Box
            sx={{
              display: "flex",flexWrap: "wrap",justifyContent:"space-around",
            }}
          >
            {values.map((data, index)=> {
              if (index >= 3 && index <= 5) {
                return (
                  <Box key={index} sx={{ width: "30%", mt: 5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Box sx={{ fontSize: "24px", py: 3, textAlign: "center",fontWeight:"bold" }}>
                      {index + 1}位
                    </Box>
                    <Box sx={{ fontSize: "20px", textAlign: "center",ml:5,background: "linear-gradient(transparent 70%, #fffacd 70%)",
                  width: "100px", }}>
                      {values[index]}票
                    </Box>
                  </Box>
                );
              }
            })}
          </Box>
        )}
        {pollCount.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ItemCard data={pollCount.slice(3)} sxStyle={{ maxWidth: 310, minWidth:310, mb:10 }} />
          </Box>
        )}
        </>
        :
        <Box sx={{textAlign:"center",fontSize:"30px", py:10}}>今回の投票結果はありませんでした。</Box>
        }
      </Paper>
    </>
  );
});

export default PollResult;
