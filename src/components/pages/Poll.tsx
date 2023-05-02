import { memo, useCallback, useEffect, useRef, useState } from "react";
//mui
import { Box, Link, List, ListItem, ListItemText, Paper } from "@mui/material";
import { ActiveBeigeButton } from "../atoms/button/Button";
//type
import { Items, Questionnaire } from "../../types/type";
//com
import PollTitle from "../pollParts/PollTitle";
import PollCard from "../card/PollCard";
import DottedMemo from "../atoms/memo/DottedMemo";
import { PrimaryDateInput } from "../atoms/input/dateInput";
//hooks
import useGetPollCategoryItem from "../../hooks/useGetPollCategoryItem";
// icon
import CheckIcon from "@mui/icons-material/Check";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";

const Poll = memo(() => {
  const [popularPollTitle, setPopularPollTitle] = useState<Questionnaire[]>([]);
  const [othersPollTitle, setOthersPollTitle] = useState<Questionnaire[]>([]);
  const [pollTitle, setPollTitle] = useState<Questionnaire[]>([]);
  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");

  //カスタムフック(投票中の人気投票とその他投票の商品データ)
  const PopularitemData: Items[] = useGetPollCategoryItem(1);
  const OtheritemData: Items[] = useGetPollCategoryItem(2);

  //ref
  const refContents = useRef<HTMLDivElement>(null);

  //過去の投票結果までスクロールさせる処理
  const scrollToContents = useCallback(() => {
    if (refContents && refContents.current) {
      refContents.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [refContents]);

  const now = new Date();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartPeriodDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndPeriodDate(e.target.value);
  };

  useEffect(() => {
    //startdateが超えていたら
    (async () => {
      const response = await fetch(`http://localhost:8880/questionnaire`);
      const data = await response.json();
      const period = data.map((question: Questionnaire) => {
        const endDate = new Date(question.endDate);
        const startDate = new Date(question.startDate);
        const isValidPeriod = endDate < now;
        return {
          ...question,
          isValidPeriod: isValidPeriod,
          endDate: endDate,
          startDate: startDate,
        };
      });
      const validPeriodData = period.filter((question: any) => {
        return question.isValidPeriod;
      });
      if (startPeriodDate !== "" && endPeriodDate !== "") {
        const periodData = validPeriodData.filter((date: Questionnaire) => {
          return (
            date.startDate >= new Date(startPeriodDate) &&
            date.endDate <= new Date(endPeriodDate)
          );
        });
        setPollTitle(periodData);
      }
    })();
  }, [startPeriodDate, endPeriodDate, now]);

  //人気投票タイトル（後でカスタムフック化）
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/questionnaire`);
        const data = await response.json();
        const filteredData = data.filter(
          (poll: Questionnaire) => poll.category === 1
        );
        const dateFilteredData = filteredData.map((poll: Questionnaire) => {
          return {
            ...poll,
            startDate: new Date(poll.startDate),
            endDate: new Date(poll.endDate),
          };
        });
        const sortedData = dateFilteredData.sort(
          (after: { endDate: number }, before: { endDate: number }) =>
            before.endDate - after.endDate
        );
        setPopularPollTitle(sortedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //最新のその他の投票タイトル
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/questionnaire`);
        const data = await response.json();
        const filteredData = data.filter(
          (poll: Questionnaire) => poll.category !== 1
        );
        const dateFilteredData = filteredData.map((poll: Questionnaire) => {
          return {
            ...poll,
            startDate: new Date(poll.startDate),
            endDate: new Date(poll.endDate),
          };
        });
        const sortedData = dateFilteredData.sort(
          (a: { endDate: number }, b: { endDate: number }) =>
            b.endDate - a.endDate
        );
        setOthersPollTitle(sortedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <Paper sx={{ mb: 5, width: "100%", minWidth: 500, maxWidth: 1200 ,pb:13}}>
        <div id="top"></div>
        <Box sx={{ textAlign: "right", p: 2 }}>
          <ActiveBeigeButton
            event={scrollToContents}
            style={{ padding: 15, width: 200 }}
          >
            過去の投票結果を見る
          </ActiveBeigeButton>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage: "url(/coffeebeens.jpeg)",
            backgroundSize: "200px",
            backgroundRepeat: "no-repeat",
            backgroundPosition:  "-50px top",
          }}
        >
          <Box sx={{ textAlign: "left", fontSize: "27px", mx: 5, mt: 10 }}>
            ＼現在開催中の投票はこちら／
          </Box>
          <List sx={{ textAlign: "center", mb: 17 }}>
            {!(popularPollTitle[0]?.endDate <= now) ? (
              <Box sx={{ textAlign: "center" }}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    borderBottom: 2,
                    width: 500,
                    mb:3,
                    mt:3,
                    ml:5
                  }}
                  button
                  component="a"
                  href={`#popular`}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      textAlign: "left",
                      fontSize: "23px",
                      fontWeight: "bold",
                      lineHeight: 1.2,
                    }}
                  >
                    <LooksOneIcon sx={{ fontSize: "35px", color: "gray" }} />
                    &nbsp;&nbsp;&nbsp;{popularPollTitle[0]?.name}
                  </ListItemText>
                </ListItem>
              </Box>
            ) : (
              <Box></Box>
            )}

            {!(othersPollTitle[0]?.endDate <= now) ? (
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  borderBottom: 2,
                  width: 500,
                  ml:5
                }}
                button
                component="a"
                href={`#others`}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "23px",
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    textAlign: "left",
                  }}
                >
                  <LooksTwoIcon sx={{ fontSize: "35px", color: "gray" }} />
                  &nbsp;&nbsp;&nbsp;{othersPollTitle[0]?.name}
                </ListItemText>
              </ListItem>
            ) : (
              <Box></Box>
            )}
          </List>
        </Box>
        {!(popularPollTitle[0]?.endDate <= now) ? (
          <>
            <div id="popular"></div>
            <PollTitle poll={popularPollTitle} />
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
              pollNum={popularPollTitle[0]?.id}
              pollCategory={popularPollTitle[0]?.category}
            />
          </>
        ) : (
          <></>
        )}
        {!(othersPollTitle[0]?.endDate <= now) ? (
          <>
            <div id="others"></div>
            <PollTitle poll={othersPollTitle} />
            <Link href="#top" sx={{ ml: 2 }}>
              ページTOPへ
            </Link>
            <DottedMemo
              text={
                " みんなの投票で会社に設置してある ドリンクの種類がかわるよ！"
              }
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
              pollNum={othersPollTitle[0]?.id}
              pollCategory={othersPollTitle[0]?.category}
            />
          </>
        ) : (
          <Box sx={{textAlign:"center",fontSize:"25px",mb:30,border:1}}>現在開催中の投票はありません。</Box>
        )}
        <Box
          sx={{
            background: "#fff9f5",
            p: 5,
            backgroundImage: "url(/coffee.png)",
            mt: 5,
            mb: 5,
          }}
          ref={refContents}
        >
          <Box
            sx={{
              fontFamily: "cursive",
              fontSize: "40px",
              textAlign: "center",
              mt: 10,
              mb:3,
              backgroundColor: "white",
              background:
                "-webkit-repeating-linear-gradient(-45deg, #9acd32, #d4acad 2px, #fff 2px, #fff 4px)",
            }}
          >
            過去の投票結果
          </Box>
        </Box>
        <Link href="#top" sx={{ ml: 2 }}>
          ページTOPへ
        </Link>
        <Box sx={{ ml: 60 ,}}>
          <Box sx={{ p: 2, mb: 3, fontSize: "25px"}}>
            <CheckIcon sx={{ fontSize: "30px", mr: 2 }} />
            投票期間を選択してください
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <PrimaryDateInput
                name="startdate"
                value={startPeriodDate}
                onChange={handleStartDateChange}
              />
              <span
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                〜
              </span>
            </Box>
            <Box>
              <PrimaryDateInput
                name="enddate"
                value={endPeriodDate}
                onChange={handleEndDateChange}
              />
            </Box>
          </Box>
        </Box>
        {pollTitle &&
          pollTitle.map((data, index) => (
            <Box
              sx={{ textAlign: "center" }}
              key={index}
              mb={2}
              bgcolor="#f5f5f5"
            >
              <List sx={{ fontSize: "25px", p: 0}}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                  button
                  component="a"
                  href={`/home/poll/${data.id}`}
                >
                  <AdsClickIcon sx={{ mr: 2, fontSize: "20px" }} />
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      lineHeight: 1.2,
                    }}
                    primary={data.name}
                  />
                </ListItem>
              </List>
            </Box>
          ))}
      </Paper>
    </>
  );
});

export default Poll;
