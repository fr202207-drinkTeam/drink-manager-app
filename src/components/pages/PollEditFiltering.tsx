import { Box, List, ListItem, ListItemText, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PrimaryDateInput } from '../atoms/input/dateInput'
import { Questionnaire } from '../../types/type';
// icon
import AdsClickIcon from "@mui/icons-material/AdsClick";
import DottedMemo from '../atoms/memo/DottedMemo';
import AdmTitleText from '../atoms/text/AdmTitleText';
import PollCategorySelect from '../atoms/addPollForm/PollCategorySelect';
import { ActiveBorderButton, ActiveDarkBlueButton, ActiveRedButton } from '../atoms/button/Button';
import PollDateInput from '../atoms/addPollForm/PollDateInput';

const PollResultFiltering = () => {
  const [pollTitle, setPollTitle] = useState<Questionnaire[]>([]);
  const [pollCategory, setPollCategory] = useState("投票種別を選択してください");
  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");

  //投票期間
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartPeriodDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndPeriodDate(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const now = new Date();

  useEffect(() => {
    //startdateが超えていたら
    (async () => {
      const response = await fetch(`http://localhost:8880/questionnaire`);
      const data = await response.json();
      setPollTitle(data);
    })();
  }, []);
  return (
    <Paper sx={{ py: 3 }}>
      <AdmTitleText children={"投票編集・削除"} />
      <Box id="top" />
      <Box sx={{ display: "flex", justifyContent: "center", }}>
        <Box>
          <Box sx={{display:"flex"}}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, alignItems: "center", mr: 2 }}>
              <Box sx={{ mt: 5, }}>
                <PollDateInput pollEditFlag={true} startPeriodDate={''} endPeriodDate={''} setStartPeriodDate={function (value: React.SetStateAction<string>): void {
                    throw new Error('Function not implemented.');
                  } } setEndPeriodDate={function (value: React.SetStateAction<string>): void {
                    throw new Error('Function not implemented.');
                  } }
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, alignItems: "center" }}>
            <Box sx={{ mr: 2 }}>
              <PollCategorySelect pollCategory={pollCategory} setPollCategory={setPollCategory} />
            </Box>
          </Box>
          </Box>
          {pollTitle &&
            pollTitle.map((data, index) => (
              <Box
                sx={{ textAlign: "center", m: 1, display: "flex", justifyContent: "centre", alignItems: "center" }}
                key={index}
                mb={index === pollTitle.length - 1 ? 5 : 1}
              >
                <Box>
                  <List sx={{
                    fontSize: {
                      xs: "15px",
                      sm: "20px",
                      md: "25px",
                    }, p: 0, m: 1
                    , width: {
                      xs: "400px",
                      sm: "400px",
                      lg: "600px",
                    }
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
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Box sx={{ mr: 2 }}>
                    <ActiveDarkBlueButton event={function (): void {
                      throw new Error('Function not implemented.');
                    }}>編集</ActiveDarkBlueButton>
                  </Box>
                  <Box>
                    <ActiveRedButton event={function (): void {
                      throw new Error('Function not implemented.');
                    }}>削除</ActiveRedButton>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Paper>
  )
}

export default PollResultFiltering