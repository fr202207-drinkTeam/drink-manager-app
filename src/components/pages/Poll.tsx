import {
  Box,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import PollCard from "../card/PollCard";
import { Items, Questionnaire } from "../../types/type";
import PollTitle from "../pollParts/PollTitle";
import { ActiveBlueButton } from "../atoms/button/Button";
import DottedMemo from "../atoms/memo/DottedMemo";
import useGetPollCategory from "../../hooks/useGetPollCategory";

const Poll = memo(() => {
  const [popularPollTitle, setPopularPollTitle] = useState<Questionnaire[]>([]);
  const [othersPollTitle, setOthersPollTitle] = useState<Questionnaire[]>([]);
  const [selectedBeforeValue, setSelectedBeforeValue] =
    useState("日付を選択してください");
  const [selectedAfterValue, setSelectedAfterValue] =
    useState("日付を選択してください");
  const [items, setItems] = useState<Items[]>([]);
  const [othersItems, setOthersItems] = useState<Items[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire[]>([]);
  const [questionnaireCategory, setQuestionnaireCategory] = useState<
    Questionnaire[]
  >([]);

  //カスタムフック
  const PopularitemData= useGetPollCategory(1);
  const OtheritemData= useGetPollCategory(2);
  
  console.log(PopularitemData,233456)
  console.log(OtheritemData,23456)

  //ref
  const refContents = useRef<HTMLDivElement>(null);

//できていない→本当に投票していいですかのモーダル//
//Selectコンポーネント

  //過去の投票結果までスクロールさせる処理
  const scrollToContents = useCallback(() => {
    if (refContents && refContents.current) {
      refContents.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [refContents]);

  //select////////////////////////////
  useEffect(() => {
    //selectedBeforeValueと一致した日付を持ってくる
  }, [selectedBeforeValue]);

  useEffect(() => {
    // console.log(selectedAfterValue)
  }, [selectedAfterValue]);

  const handleSelectBeforeChange = (e: any) => {
    setSelectedBeforeValue(e.target.value);
  };
  const handleSelectAfterChange = (e: any) => {
    setSelectedAfterValue(e.target.value);
  };
  ////////////////////////////////

  //items全取得　後で変更
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/items`);
        const data = await response.json();
        // console.log(data);
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //questionnaire全取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/questionnaire`);
        const data = await response.json();
        setQuestionnaire(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //period 投票終了している投票はどうする
  const now = new Date();

  const period = questionnaire.map((question: Questionnaire) => {
    return {
      endDate: new Date(question.endDate),
    };
  });

  const Categoryperiod = questionnaireCategory.map(
    (question: Questionnaire) => {
      return {
        ...question,
        endDate: new Date(question.endDate),
      };
    }
  );

  const populerPeriodData = PopularitemData.filter((period:any) => {
    return period.endDate < now;
  });
  const otherPeriodData = OtheritemData.filter((period:any) => {
    return period.endDate < now;
  });

  // console.log(populerPeriodData,"oooooooo")
  // console.log(otherPeriodData,"llllll")

  ///////////////////////////////////////////////

  // // 最新の人気投票の商品を取得
  useEffect(() => {
    // カスタムフックでカテゴリーを絞り込みしてから取得
    const Categoryperiod = PopularitemData.map(
      (question: Questionnaire) => {
        const endDate = new Date(question.endDate);
        const startDate = new Date(question.startDate);
        //startDateが過去で、endDateが現在以降のものを取ってくる
        const isValidPeriod = startDate < now && endDate >= now;
        return {
          ...question,
          isValidPeriod: isValidPeriod,
          endDate: endDate,
        };
      }
    );
    //最新の投票を持ってくる
    const sortedData = Categoryperiod.sort(
      (after: any, before: any) => before.endDate - after.endDate
    );
    //アンケートの商品のIDを取得
    const pollitemID = sortedData[0]?.polledItems.map((poll: { itemId: any; }) => {
      return poll.itemId;
    });
    //itemsから上記のアンケートIDを含むものを取得
    const itemId = items.filter((item) => pollitemID?.includes(item.id));
    setItems(itemId);
  }, [questionnaire]);


  //最新のその他投票の商品を取得
  useEffect(() => {
    //// カスタムフックでカテゴリーを絞り込みしてから取得
    const Categoryperiod = OtheritemData.map(
      (question: Questionnaire) => {
        const endDate = new Date(question.endDate);
        const startDate = new Date(question.startDate);
        //startDateが過去で、endDateが現在以降のものを取ってくる
        const isValidPeriod = startDate < now && endDate >= now;
        return {
          ...question,
          isValidPeriod: isValidPeriod,
          endDate: endDate,
        };
      }
    );
    // console.log(Categoryperiod,33444)
    //最新の投票を持ってくる
    const sortedData = Categoryperiod.sort(
      (after: any, before: any) => before.endDate - after.endDate
    );
    // console.log(sortedData,444)
    //アンケートの商品のIDを取得
    const pollitemID = sortedData[0]?.polledItems.map((poll:any) => {
      return poll.itemId;
    });
    // console.log(pollitemID,300)
    //itemsから上記のアンケートIDを含むものを取得
    const itemId = items.filter((item) => pollitemID?.includes(item.id));
    setOthersItems(itemId);
  }, [questionnaire]);

  // console.log(othersItems,11111111);
  // console.log(items,11111111)

  //人気投票タイトル
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
          data={items}
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
          data={othersItems}
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
            <Select
              sx={{ mb: 3, backgroundColor: "#fffffc" }}
              value={selectedBeforeValue}
              onChange={handleSelectBeforeChange}
            >
              <MenuItem value="日付を選択してください">
                日付を選択してください
              </MenuItem>
              <MenuItem value="2023年1月">2023年1月</MenuItem>
              <MenuItem value="2023年2月">2023年2月</MenuItem>
              <MenuItem value="2023年3月">2023年3月</MenuItem>
            </Select>
            〜
            <Select
              sx={{ mb: 3, backgroundColor: "#fffffc" }}
              value={selectedAfterValue}
              onChange={handleSelectAfterChange}
            >
              <MenuItem value="日付を選択してください">
                日付を選択してください
              </MenuItem>
              <MenuItem value="2023年1月">2023年1月</MenuItem>
              <MenuItem value="2023年2月">2023年2月</MenuItem>
              <MenuItem value="2023年3月">2023年3月</MenuItem>
            </Select>
          </Box>
          <Box>※期間で絞り込みができます。</Box>
        </Box>

        <List sx={{ textAlign: "center", fontSize: "25px", color: "1e90ff" }}>
          <ListItem sx={{ textAlign: "center" }} button component="a" href="#">
            <ListItemText
              primaryTypographyProps={{ fontSize: "25px" }}
              primary="・1月の人気投票結果発表"
            />
          </ListItem>
          <ListItem sx={{ textAlign: "center" }} button component="a" href="#">
            <ListItemText
              primaryTypographyProps={{ fontSize: "25px" }}
              primary="・2月の人気投票結果発表"
            />
          </ListItem>
          <ListItem sx={{ textAlign: "center" }} button component="a" href="#">
            <ListItemText
              primaryTypographyProps={{ fontSize: "25px" }}
              primary="・3月の人気投票結果発表"
            />
          </ListItem>
        </List>
      </Paper>
    </>
  );
});

export default Poll;
