import { Box, Card, List, ListItem, ListItemText, MenuItem, Pagination, Paper, Select, Typography } from "@mui/material";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import PollCard from "../card/PollCard";
import { Items, Polls } from "../../types/type";
import ItemCard from "../card/ItemCard";
import { PrimaryButton } from "../button/Button";
import PollTitle from "../pollParts/PollTitle";

type Props = {};

const Poll: FC<Props> = memo((props) => {
  const [items, setItems] = useState<Items[]>([]);
  const [popularPolls, setPopularPolls] = useState<Polls[]>([]);
  const [selectedValue, setSelectedValue] = useState("日付を選択してください");

  const refContents = useRef<HTMLDivElement>(null);

  //過去の投票結果までスクロール
  const scrollToContents = useCallback(() => {
    if (refContents && refContents.current) {
    refContents.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });}
  }, [refContents]);

  //select
  const handleSelectChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  //全部取得している。あとで共用できたら消す
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/items`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  //全部取得している。あとで共用できたら消す
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/questionnaire`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const filteredData = data.filter((poll:Polls) => poll.category === 1);

        const dateFilteredData = filteredData.map(
          (poll: Polls) => {
            return {
              ...poll,
              startDate: new Date(poll.startDate),
              endDate: new Date(poll.endDate),
            };
          }
        );
        setPopularPolls(dateFilteredData);
        console.log(popularPolls)
      } catch (error) {
        console.error(error);
      }
    })();
  }, [popularPolls]);

  console.log(items)

  return (
    <>
      <Paper sx={{mb:5,width:"100%",minWidth:500,maxWidth:1200}}>
        <PrimaryButton
          onClick={scrollToContents}
          sx={{
            backgroundColor: "#84b9cb",
            my: 4,
            p: 2,
            ml:80,
            width: 250,
            fontSize: "20px",
            fontWeight:"bold",
            ":hover": {
              background: "#5f9ea0",
              cursor: "pointer",
            },
          }}
        >
          過去の投票結果
        </PrimaryButton>
        <PollTitle poll={popularPolls}/>
        <Card
          sx={{
            p: 1,
            mb: 5,
            backgroundColor: "#ffdead",
            border: "2px dashed #fff ",
            boxShadow: " 0 0 0 8px #ffdead",
            width: "100%",
            maxWidth:700,
            minWidth:500,
            m: "auto",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
            sx={{ m: 4, color: "#595857", fontSize: "25px" }}
          >
            一番気になる、好きなドリンクに投票しよう！
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
            sx={{ m: 4, color: "#595857", fontSize: "20px" }}
          >
            ※各投票、お一人につき一回まで投票が可能です
          </Typography>
        </Card>
        <PollCard data={items} />
        <Box
          sx={{
            background: "#fff9f5",
            p: 5,
            backgroundImage: "url(/coffee.png)",
            mt: 5,
            mb: 5,
          }}
        >
          <Box
            sx={{
              fontFamily: "cursive",
              fontSize: "40px",
              textAlign: "center",
              mt: 10,
              backgroundColor: "white",
              background:
                "-webkit-repeating-linear-gradient(-45deg, #d4acad, #d4acad 2px, #fff 2px, #fff 4px)",
            }}
          >
            drink入れ替え投票
          </Box>
          <Box
            sx={{
              fontFamily: "cursive",
              fontSize: "20px",
              textAlign: "center",
              mt: 5,
              backgroundColor: "white",
              fontWeight:"bold"
            }}
          >
            開催期間:4月15日〜5月15日まで
          </Box>
        </Box>
        <Card
          sx={{
            p: 1,
            mb: 5,
            backgroundColor: "#ffdead",
            border: "2px dashed #fff ",
            boxShadow: " 0 0 0 8px #ffdead",
            width: 800,
            m: "auto",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
            sx={{ m: 4, color: "#595857", fontSize: "25px" }}
          >
            みんなの投票で会社に設置してある ドリンクの種類がかわるよ！
          </Typography>

          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
            sx={{ m: 4, color: "#595857", fontSize: "20px", }}
          >
            ※各投票、お一人につき一回まで投票が可能です
          </Typography>
        </Card>
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
            id="condition"
            sx={{ mb: 3, backgroundColor: "#fffffc" }}
            aria-labelledby="days-label"
            defaultValue={selectedValue}
            onChange={handleSelectChange}
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
            id="condition"
            sx={{ mb: 3, backgroundColor: "#fffffc" }}
            aria-labelledby="days-label"
            defaultValue={selectedValue}
            onChange={handleSelectChange}
          >
            <MenuItem value="日付を選択してください">
              日付を選択してください
            </MenuItem>
            <MenuItem value="2023年1月">2023年1月</MenuItem>
            <MenuItem value="2023年2月">2023年2月</MenuItem>
            <MenuItem value="2023年3月">2023年3月</MenuItem>
          </Select>
          </Box>
          <Box>
            ※期間で絞り込みができます。
          </Box>
        </Box>

        <List sx={{textAlign:"center",fontSize:"25px",color:"1e90ff"}}>
          <ListItem sx={{textAlign:"center"}} button component="a" href="#">
            <ListItemText primaryTypographyProps={{ fontSize: "25px" }} primary="・1月の人気投票結果発表" />
          </ListItem>
          <ListItem sx={{textAlign:"center"}}  button component="a" href="#">
            <ListItemText primaryTypographyProps={{ fontSize: "25px" }} primary="・2月の人気投票結果発表" />
          </ListItem>
          <ListItem sx={{textAlign:"center" }}  button component="a" href="#">
            <ListItemText primaryTypographyProps={{ fontSize: "25px" }} primary="・3月の人気投票結果発表" />
          </ListItem>
        </List>
      </Paper>

    </>
  );
});


export default Poll;

