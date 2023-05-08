import { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//mui
import { Paper, Box } from "@mui/material";

//com
import DottedMemo from "../atoms/memo/DottedMemo";
import ItemCard from "../card/ItemCard";

// types
import { Items, Polls, Questionnaire } from "../../types/type";

const PollResult = memo(() => {
  const { id } = useParams();
  const [polls, setPolls] = useState<Polls[]>([]);
  const [pollCount, setPollCounts] = useState<Items[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
  const [items, setItems] = useState<Items[]>([]);

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
  console.log(Object.keys(pollCounts).length>=1,"pollcounts")

  //票の大きい商品順で並び替え
  const sortedPolls = Object.entries(pollCounts).sort(
    (a: any, b: any) => b[1] - a[1]
  );
  console.log(sortedPolls, "sorr");
  const result = sortedPolls.map((subArr) => {
    return subArr[0];
  });
  const pollResult = result.map(Number);
  console.log(pollResult, "pollresult");

  //value票の数を多い順に並び替え
  const values = Object.values(pollCounts).map(Number);
  values.sort((a, b) => b - a);

  //poll取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8880/polls?questionnaireId=${id}`
        );
        const data = await response.json();
        setPolls(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  //questionner取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8880/questionnaire/${id}`
        );
        const data = await response.json();
        setQuestionnaire(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  //Items取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/items`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

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
      console.log(polllCountItems, "polllCountItems");
    }
  }, [id, questionnaire]);

  return (
    <>
      <Paper>
        <Box
          sx={{
            background: "#fff9f5",
            p: 5,
            backgroundImage: "url(/iwai.png)",
            backgroundSize: "200px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left ",
            mt: 5,
            mb: 5,
          }}
        >
          <Box
            sx={{
              fontSize: "40px",
              textAlign: "center",
              mt: 10,
              fontWeight: "bold",
            }}
          >
            {questionnaire?.name}&nbsp;投票結果
          </Box>
          <Box
            sx={{
              fontSize: "20px",
              textAlign: "center",
              fontWeight: "bold",
              mt: 5,
            }}
          >
            開催期間: {questionnaire?.startDate.toLocaleString()}&nbsp;〜&nbsp;
            {questionnaire?.endDate.toLocaleString()}
          </Box>
        </Box>
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
          }}
        >
          {values.slice(0, 3).map(
            (data, index) =>
              // インデックスが3未満の場合にのみBox要素を描画（３位まで）
              index < 3 && (
                <Box key={index}>
                  <Box
                    sx={{
                      mt: 10,
                      p: 10,
                      backgroundImage: `url(/crown${index + 1}.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "70px",
                      backgroundPosition: "center",
                    }}
                  ></Box>
                  <Box sx={{ fontSize: "30px", textAlign: "center" }}>
                    {values[index]}票
                  </Box>
                </Box>
              )
          )}
        </Box>

        {pollCount.length > 0 && <ItemCard data={pollCount.slice(0, 3)} />}
        {values.length >= 4 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent:"space-around",
            }}
          >
            {values.map((data, index) => {
              if (index >= 3 && index <= 5) {
                return (
                  <Box key={index} sx={{ width: "30%", mt: 5, }}>
                    <Box sx={{ fontSize: "22px", py: 3, textAlign: "center",fontWeight:"bold" }}>
                      {index + 1}位
                    </Box>
                    <Box sx={{ fontSize: "18px", textAlign: "center" }}>
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
            <ItemCard data={pollCount.slice(3)} sxStyle={{ maxWidth: 250, minWidth:250,mx:5, mb:10 }} />
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
