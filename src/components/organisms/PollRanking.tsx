import { Paper, Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "../card/ItemCard";
import { Items, Polls, Questionnaire } from "../../types/type";
import { useParams } from "react-router-dom";

const PollRanking = () => {
  // const { id } = useParams();
  const [polls, setPolls] = useState<Polls[]>([]);
  const [pollCount, setPollCounts] = useState<Items[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
  const [items, setItems] = useState<Items[]>([]);
  const [startDate, setStartDate] = useState<any>();
  const [pollId, setPollId] = useState<number>();

  //投票結果集計
  const pollCounts: any = {};
  polls.forEach((item) => {
    if (item.questionnaireId === Number(pollId)) {
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
          `http://localhost:8880/polls?questionnaireId=${pollId}`
        );
        const data = await response.json();
        setPolls(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [pollId]);

  //questionner取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:8880/questionnaire/${pollId}`
        );
        const data = await response.json();
        setQuestionnaire(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [pollId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8880/questionnaire/`);
        const data = await response.json();
        setStartDate(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // 先月のアンケートidを取得し。その中からランダムで表示
  useEffect(() => {
    if (startDate) {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonth = new Date(
        firstDayOfMonth.getFullYear(),
        firstDayOfMonth.getMonth() - 1,
        1
      );
      const startDates = startDate
        .filter(
          (questionnaire: Questionnaire) =>
            new Date(questionnaire.startDate) > lastMonth &&
            new Date(questionnaire.startDate) < firstDayOfMonth
        )
        .map((questionnaire: Questionnaire) => questionnaire.id);
      const randomId =
        startDates[Math.floor(Math.random() * startDates.length)];
      setPollId(randomId);
      console.log(pollId, "random");
    }
  }, [startDate, pollId]);
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
  }, [pollId]);

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
  }, [polls, questionnaire, items, pollId]);

  return (
    <>
      <Card
        sx={{
          p: 1,
          backgroundColor: "#fff",
          border: "4px dotted #ffdead ",
          textAlign: "center",
          width: "60%",
          borderRadius: "20px",
          m: "auto",
        }}
      >
        <Typography
          gutterBottom
          component="div"
          sx={{ m: 2, color: "#595857", fontSize: "25px" }}
        >
          ランキング
        </Typography>

        {questionnaire?.name ? (
          <Typography
            gutterBottom
            component="div"
            sx={{ m: 2, color: "#595857", fontSize: "16px" }}
          >
            「{questionnaire?.name}」アンケートの投票結果はこちら
          </Typography>
        ) : (
          ""
        )}
      </Card>

      {Object.keys(pollCounts).length >= 1 ? (
        <>
          <Paper>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                mt: 5,
              }}
            >
              {values.slice(0, 3).map(
                (data, index: number) =>
                  // インデックスが3未満の場合にのみBox要素を描画（３位まで）
                  index < 3 && (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          p: 5,
                          backgroundImage: `url(/crown${index + 1}.png)`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "70px",
                          backgroundPosition: "center",
                        }}
                      ></Box>
                      <Box
                        sx={{
                          fontSize: "25px",
                          textAlign: "center",
                          ml: 5,
                          mt: 2,
                          background:
                            "linear-gradient(transparent 70%, #fffacd 70%)",
                          width: "100px",
                        }}
                      >
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
              {pollCount.length > 0 && (
                <ItemCard
                  data={pollCount.slice(0, 3)}
                  sxStyle={{ maxWidth: 220, minWidth: 220, mx: 5, mb: 1 }}
                />
              )}
            </Box>
          </Paper>
        </>
      ) : (
        <Box sx={{ textAlign: "center", fontSize: "30px", py: 10 }}>
          今回の投票結果は現在集計中です！
        </Box>
      )}
    </>
  );
};

export default PollRanking;
