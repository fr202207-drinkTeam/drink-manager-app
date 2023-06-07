/* eslint-disable array-callback-return */
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import DottedMemo from "../atoms/memo/DottedMemo";
import ItemCard from "../organisms/card/ItemCard";
import { Items, Polls, Questionnaire } from "../../types/type";
import PollTitleResult from "../molecules/poll/PollTitleResult";
import useGetAnQuestionnaire from "../../hooks/useGetAnQuestionnaire";
import useGetAllItems from "../../hooks/useGetAllItems";
import useGetAnPoll from "../../hooks/useGetAnPoll";

const PollResult = memo(() => {
  const { id } = useParams();
  const [pollCount, setPollCounts] = useState<Items[]>([]);
  const [trigger, setTrigger] = useState(false);
  const questionnaire: Questionnaire = useGetAnQuestionnaire(Number(id));
  const items: Items[] = useGetAllItems(trigger);
  const polls: Polls[] = useGetAnPoll(Number(id));

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

  console.log(pollCount.slice(5, 6), "slice")

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
        <PollTitleResult poll={questionnaire} />
        {Object.keys(pollCounts).length >= 1 ?
          <>
            <Box id="top" />
            <DottedMemo
              text={"たくさんのご投票ありがとうございました!!"}
              information={"またのご参加お待ちしております!"}
              fontSize={"25px"}
              maxWidth={700}
              minWidth={500}
              margin={1}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                  xl: "row",
                },
                mt: 5
              }}
            >
              {values.slice(0, 3).map(
                (data, index) =>
                  // インデックスが3未満の場合にのみBox要素を描画（３位まで）
                  index < 3 && (
                    <Box>
                    <Box key={index} sx={{ display: "flex", justifyContent:{
                              xs: "center",
                              sm: "center",
                              md: "center",
                              lg: "space-around",
                              xl: "space-around",
                            }, alignItems: "center" }}>
                      <Box
                        sx={{
                          p: 5,
                          backgroundImage: `url(/crown${index + 1}.png)`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: {
                            xs: "30px",
                            sm: "30px",
                            md: "60px",
                            lg: "70px",
                            xl: "70px"
                          },
                          backgroundPosition: "center",
                        }}
                      ></Box>
                      <Box sx={{
                        fontSize: {
                          xs: "18px",
                          sm: "20px",
                          md: "20px",
                          lg: "24px",
                          xl: "25px"
                        }, textAlign: "center", ml: {
                          xs: 0,
                          sm: 1,
                          md: 3,
                          lg: 5,
                          xl: 5
                        }, mt: 2, background: "linear-gradient(transparent 70%, #fffacd 70%)",
                        width: "100px",
                      }}>
                        {values[index]}&nbsp;票
                      </Box>
                    </Box>
                    {pollCount.slice(index, index+1).map((data, index)=>(
                      <Box
                      key={index} sx={{display:"flex",justifyContent:{
                        xs: "center",
                        sm: "center",
                        md: "center",
                        lg: "",
                        xl: "",
                      }}}
                    >
                      <ItemCard data={data} sxStyle={{
                        maxWidth: {
                          xs: "200px",
                          sm: "200px",
                          md: "250px",
                          lg: "250px",
                          xl: "295px"
                        },
                        minWidth: {
                          xs: "200px",
                          sm: "200px",
                          md: "250px",
                          lg: "250px",
                          xl: "295px"
                        }, mb: 1
                      }} />
                    </Box>
                    ))}
                    </Box>
                  )
              )}
            </Box>
            {values.length >= 4 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                    xl: "row",
                  },
                }}
              >
                {values.map((data, index) => {
                  if (index >= 3 && index <= 5) {
                    return (
                      <Box key={index}>
                        <Box
                          sx={{
                            mt: 5,
                            display: "flex",
                            justifyContent:{
                              xs: "center",
                              sm: "center",
                              md: "center",
                              lg: "space-around",
                              xl: "space-around",
                            },
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              fontSize: {
                                xs: "15px",
                                sm: "18px",
                                md: "18px",
                                lg: "24px",
                                xl: "24px",
                              },
                              py: 3,
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {index + 1}&nbsp;位
                          </Box>
                          <Box
                            sx={{
                              fontSize: "20px",
                              textAlign: "center",
                              background: "linear-gradient(transparent 70%, #fffacd 70%)",
                              width: "100px",
                            }}
                          >
                            {values[index]}&nbsp;票
                            </Box>
                           </Box>
                          {pollCount.slice(index, index + 1).map((data, index) => (
                            <Box
                              key={index} sx={{display:"flex",justifyContent:{
                                xs: "center",
                                sm: "center",
                                md: "center",
                                lg: "",
                                xl: "",
                              }}}
                            >
                              <ItemCard data={data} sxStyle={{
                                maxWidth: {
                                  xs: "200px",
                                  sm: "200px",
                                  md: "250px",
                                  lg: "250px",
                                  xl: "295px"
                                },
                                minWidth: {
                                  xs: "200px",
                                  sm: "200px",
                                  md: "250px",
                                  lg: "250px",
                                  xl: "295px"
                                }, mb: 1
                              }} />
                            </Box>
                          ))}
                       
                      </Box>
                    );
                  }
                  return null;
                })}
              </Box>
            )}
          </>
          :
          <Box sx={{ textAlign: "center", fontSize: "30px", py: 10 }}>今回の投票結果はありませんでした。</Box>
        }
      </Paper>
    </>
  );
});

export default PollResult;
