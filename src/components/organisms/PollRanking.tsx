import { Paper, Box } from '@mui/material';
import  {  useEffect, useState } from 'react'
import ItemCard from '../card/ItemCard';
import { Items, Polls, Questionnaire } from '../../types/type';
import { useParams } from 'react-router-dom';

const PollRanking = () => {
  const { id } = useParams();
  const [polls, setPolls] = useState<Polls[]>([]);
  const [pollCount, setPollCounts] = useState<Items[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
  const [items, setItems] = useState<Items[]>([]);

  //id(3ヶ所にテストデータ「2」)を入れれば画面表示できる

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
    }
  }, [id, questionnaire]);

  return (
     <>
      <Paper>
        {Object.keys(pollCounts).length >=1 ?
         <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            mt:5
          }}
        >
          {values.slice(0, 3).map(
            (data, index:number) =>
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
        {pollCount.length > 0 && <ItemCard data={pollCount.slice(0, 3)} sxStyle={{ maxWidth: 260, minWidth:260,mx:5, mb:1 }} />}
        </Box>
        </>
        :
        <Box sx={{textAlign:"center",fontSize:"30px", py:10}}>今回の投票結果はありませんでした。</Box>
        }
      </Paper>
    </>
  )
}

export default PollRanking