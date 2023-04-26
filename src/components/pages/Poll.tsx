import { memo, useCallback, useEffect, useRef, useState } from "react";
//mui
import {
  Box,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { ActiveBlueButton } from "../atoms/button/Button";
//type
import { Items, Questionnaire } from "../../types/type";
//com
import PollTitle from "../pollParts/PollTitle";
import PollCard from "../card/PollCard";
import DottedMemo from "../atoms/memo/DottedMemo";
//hooks
import useGetPollCategoryItem from "../../hooks/useGetPollCategoryItem";
import useGetPollCategoryPeriod from "../../hooks/useGetPollCategoryPeriod";
import { PrimaryDateInput } from "../atoms/input/dateInput";

//できていない→ユーザにつき一回づつの投票

//Selectコンポーネント
const Poll = memo(() => {
  const [popularPollTitle, setPopularPollTitle] = useState<Questionnaire[]>([]);
  const [othersPollTitle, setOthersPollTitle] = useState<Questionnaire[]>([]);
  const [pollTitle, setPollTitle] = useState<Questionnaire[]>([]);

  const [selectedValue, setSelectedValue] =
    useState("投票の種類を選択してください");

  //カスタムフック(投票中の人気投票とその他投票の商品データ)
  const PopularitemData: Items[] = useGetPollCategoryItem(1);
  const OtheritemData: Items[] = useGetPollCategoryItem(2);
  //カスタムフック（投票中のカテゴリ別投票データ→投票終了したデータに後で変えたい）
  const PopularPeriodData: Questionnaire[] = useGetPollCategoryPeriod(1);
  const OthersPeriodData: Questionnaire[] = useGetPollCategoryPeriod(2);

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

  //人気投票かその他の投票か////////////////////////////
  const handleSelectChange = (e: any) => {
    setSelectedValue(e.target.value);
  };
  useEffect(() => {
    if (selectedValue === "人気投票") {
      console.log("p");
      const populerPeriodData = PopularPeriodData.filter((period: any) => {
        return period.endDate < now;
      });
      setPollTitle(populerPeriodData);
    } else if (selectedValue === "その他の投票") {
      console.log("o");
      const otherPeriodData = OthersPeriodData.filter((period: any) => {
        return period.endDate < now;
      });
      setPollTitle(otherPeriodData);
    }
  }, [selectedValue]);
  ////////////////////////////////

  //投票終了している投票→下のリンクに表示
  // 人気
  const populerPeriodData = PopularPeriodData.filter((period: any) => {
    return period.endDate < now;
  });
  console.log(populerPeriodData, "per1");
  // その他
  const otherPeriodData = OthersPeriodData.filter((period: any) => {
    return period.endDate < now;
  });
  console.log(otherPeriodData, "per2");

  ///////////////////////////////////////////////

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
      <Paper sx={{ mb: 5, width: "100%", minWidth: 500, maxWidth: 1200 }}>
        <Box sx={{ textAlign: "right", p: 2 }}>
          <ActiveBlueButton
            event={scrollToContents}
            style={{ padding: 15, width: 200 }}
          >
            過去の投票結果
          </ActiveBlueButton>
        </Box>
        <PollTitle poll={popularPollTitle} />
        <DottedMemo
          text={" 一番気になる、好きなドリンクに投票しよう！"}
          information={"※各投票、お一人につき一回まで投票が可能です"}
          fontSize={"20px"}
          maxWidth={700}
          minWidth={500}
          margin={4}
        />

        <PollCard
          data={PopularitemData}
          pollNum={popularPollTitle[0]?.id}
          pollCategory={popularPollTitle[0]?.category}
        />

        <PollTitle poll={othersPollTitle} />
        <DottedMemo
          text={" みんなの投票で会社に設置してある ドリンクの種類がかわるよ！"}
          information={"※各投票、お一人につき一回まで投票が可能です"}
          fontSize={"20px"}
          maxWidth={700}
          minWidth={500}
          margin={4}
        />
        <PollCard
          data={OtheritemData}
          pollNum={othersPollTitle[0]?.id}
          pollCategory={othersPollTitle[0]?.category}
        />
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
              backgroundColor: "white",
              background:
                "-webkit-repeating-linear-gradient(-45deg, #9acd32, #d4acad 2px, #fff 2px, #fff 4px)",
            }}
          >
            過去の投票結果
          </Box>
        </Box>
        <Box sx={{ ml: 70 }}>
          <Box>
            <InputLabel id="brand-label" sx={{ mt: 2, fontWeight: "bold" }}>
              期間
            </InputLabel>
            <TextField
              type="date"
              variant="standard"
              sx={{ width: "200px", mb: 5 }}
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
            <TextField
              type="date"
              variant="standard"
              sx={{ width: "200px", mb: 5 }}
            />
          </Box>
          <Select
            sx={{ mb: 3, backgroundColor: "#fffffc" }}
            value={selectedValue}
            variant="standard"
            onChange={handleSelectChange}
          >
            <MenuItem value="投票の種類を選択してください">
              投票の種類を選択してください
            </MenuItem>
            <MenuItem value="人気投票">人気投票</MenuItem>
            <MenuItem value="その他の投票">その他の投票</MenuItem>
          </Select>
        </Box>
        {pollTitle &&
          pollTitle.map((data) => (
            <List
              sx={{ textAlign: "center", fontSize: "25px", color: "1e90ff" }}
            >
              <ListItem
                sx={{ textAlign: "center" }}
                component="a"
                href={`/home/poll/${data.id}`}
              >
                <ListItemText primaryTypographyProps={{ fontSize: "25px" }}>
                  {data.name}
                </ListItemText>
              </ListItem>
            </List>
          ))}
      </Paper>
    </>
  );
});

export default Poll;
