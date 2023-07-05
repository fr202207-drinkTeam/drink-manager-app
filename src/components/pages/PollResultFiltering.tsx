import { Box, List, ListItem, ListItemText, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PrimaryDateInput } from '../atoms/input/dateInput'
import { Questionnaire } from '../../types/type';
// icon
import AdsClickIcon from "@mui/icons-material/AdsClick";
import DottedMemo from '../atoms/memo/DottedMemo';

const PollResultFiltering = () => {
  const [pollTitle, setPollTitle] = useState<Questionnaire[]>([]);
  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");

  //投票期間
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartPeriodDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndPeriodDate(e.target.value);
  };

  useEffect(() => {
    //startdateが超えていたら
    (async () => {
      const response = await fetch(`http://localhost:50000/questionnairesfiltering`);
      const data = await response.json();
      const period = data.map((question: Questionnaire) => {
        const endDate = new Date(question.endDate);
        const startDate = new Date(question.startDate);
        return {
          ...question,
          endDate: endDate,
          startDate: startDate,
        };
      });
      if (startPeriodDate !== "" && endPeriodDate !== "") {
        setPollTitle(period);
      }
    })();
  }, [startPeriodDate, endPeriodDate]);
  
  return (
    <Paper sx={{ pb: 3 }}>
      <Box
        sx={{
          background: "#fff9f5",
          backgroundSize: 350,
          backgroundPosition: "left buttom",
          pt: 3,
          pb: 3,
          backgroundImage: "url(/coffee.png)",
          mb: 3,
        }}
      >
        <Box
          sx={{
            fontFamily: "cursive",
            fontSize: {
              xs: "25px",
              sm: "30px",
              md: "45px",
            },
            textAlign: "center",
            mt: 5,
            mb: 5,
            width: "100%",
            backgroundColor: "white",
            background:
              "-webkit-repeating-linear-gradient(-45deg, #9acd32, #d4acad 2px, #fff 2px, #fff 4px)",
          }}
        >
          過去の投票結果検索
        </Box>
      </Box>
      <Box id="top" />
      <DottedMemo
        text={" 投票期間を選択することで過去の投票結果を確認できます！"}
        information={"※投票結果を確認したい期間を選択してください"}
        fontSize={"20px"}
        maxWidth={700}
        minWidth={500}
        margin={4}
      />
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 5, justifyContent: "center" }}>
          <Box sx={{ mt: 5 }}>
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
          <Box sx={{ mt: 5 }}>
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
            sx={{ textAlign: "center", m: 1 }}
            key={index}
            mb={index === pollTitle.length - 1 ? 5 : 1}
            bgcolor="#f5f5f5"
          >
            <List sx={{
              fontSize: {
                xs: "15px",
                sm: "20px",
                md: "25px",
              }, p: 0, m: 1
            }}>
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
                    fontSize: {
                      xs: "15px",
                      sm: "20px",
                      md: "25px",
                    },
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
  )
}

export default PollResultFiltering