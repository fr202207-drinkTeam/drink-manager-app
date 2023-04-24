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

const Poll = memo(() => {
  const [popularPolls, setPopularPolls] = useState<Questionnaire[]>([]);
  const [polls, setPolls] = useState<Questionnaire[]>([]);
  const [selectedBeforeValue, setSelectedBeforeValue] =
    useState("日付を選択してください");
  const [selectedAfterValue, setSelectedAfterValue] =
    useState("日付を選択してください");
  const [items, setItems] = useState<Items[]>([]);
  const [othersItems, setOthersItems] = useState<Items[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire[]>([]);
  const [isVisible, setIsVisible] = useState(true);
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

  //select
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

  const now = new Date();
  const end = new Date("2023-05-30T09:27:46.692Z");
  console.log(now);
  console.log(end);

  const period = questionnaire.map((question) => {
    return question.endDate;
  });

  console.log(period);

  ////////////////////////////////

  //items全取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/items`);
        const data = await response.json();
        console.log(data);
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //questionnaire取得
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

  //人気投票を取得
  useEffect(() => {
    //polledItemsの部分を取り出す
    const pollItems = questionnaire.map((poll: Questionnaire) => {
      return poll.polledItems;
    });
    //questionereに入っている商品IDを出力
    const pollitemID = pollItems[0]?.map((poll) => {
      return poll.itemId;
    });
    //商品IDが一致するものだけカードで表示したい
    const itemId = items.filter((item) => pollitemID.includes(item.id));
    setItems(itemId);
  }, [questionnaire]);

  //その他投票を取得
  useEffect(() => {
    //polledItemsの部分を取り出す
    const pollItems = questionnaire.map((poll: Questionnaire) => {
      return poll.polledItems;
    });
    //questionereに入っている商品IDを出力
    const pollitemID = pollItems[1]?.map((poll) => {
      return poll.itemId;
    });
    //商品IDが一致するものだけカードで表示
    const itemId = items.filter((item) => pollitemID.includes(item.id));
    setOthersItems(itemId);
  }, [questionnaire]);

  console.log(othersItems);

  //人気投票
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
          (a: { endDate: number }, b: { endDate: number }) =>
            b.endDate - a.endDate
        );
        setPopularPolls(sortedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //人気投票以外
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
        setPolls(sortedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // console.log(popularPolls[0].id)

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
        <PollTitle poll={popularPolls} />
        <DottedMemo
          text={" 一番気になる、好きなドリンクに投票しよう！"}
          information={"※各投票、お一人につき一回まで投票が可能です"}
          fontSize={"20px"}
          maxWidth={700}
          minWidth={500}
          margin={4}
        />

        <PollCard data={items} pollNum={popularPolls[0]?.id} />

        <PollTitle poll={polls} />
        <DottedMemo
          text={" みんなの投票で会社に設置してある ドリンクの種類がかわるよ！"}
          information={"※各投票、お一人につき一回まで投票が可能です"}
          fontSize={"20px"}
          maxWidth={700}
          minWidth={500}
          margin={4}
        />
        <PollCard data={othersItems} pollNum={polls[0]?.id} />
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
            {}
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
