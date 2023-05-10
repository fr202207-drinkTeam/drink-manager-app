import { Box } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { PrimaryDateInput } from '../../atoms/input/dateInput'
import { Questionnaire } from '../../../types/type';
import useGetQuestionnaire from '../../../hooks/useGetQuestipnnaire';

type PollDateInputProps={
  startPeriodDate:string;
  endPeriodDate:string;
  setStartPeriodDate:React.Dispatch<React.SetStateAction<string>>;
  setEndPeriodDate:React.Dispatch<React.SetStateAction<string>>;
  dateError:string;
  setDateError?:React.Dispatch<React.SetStateAction<string>>;
}

const PollDateInput:FC<PollDateInputProps> = ({
  setDateError,dateError,startPeriodDate,setStartPeriodDate,endPeriodDate,setEndPeriodDate
}) => {
  const questionnaireData: Questionnaire[] = useGetQuestionnaire();

    // yyyy-mm-dd 形式の文字列を作成（今日）
    const today = new Date().toISOString().split("T")[0];

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartPeriodDate(e.target.value);
    };
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndPeriodDate(e.target.value);
    };  

  return (
    <Box
          sx={{
            border: "solid 1px #C4C4C4",
            display: "inline-block",
            borderRadius: "5px",
            mt: 2,
          }}
        >
          {dateError && (
            <Box style={{ color: "red", fontSize: 15 }}>{dateError}</Box>
          )}
          <Box sx={{ m: 2 }}>
            ※各投票の開催期間が被らないように設定してください
          </Box>
          <Box sx={{ mb: 1, fontWeight: "bold", ml: 1 }}>最近登録した投票</Box>
          {questionnaireData.map((data) => (
            <Box key={data.id} sx={{ display: "flex", flexWrap: "wrap", ml: 1 }}>
              <Box sx={{ fontSize: "18px", borderBottom: 1 }}>
                ・{data.name}{" "}
                <span
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    fontSize: "15px",
                  }}
                >
                  期間:{data.startDate.toLocaleDateString()}~
                  {data.endDate.toLocaleDateString()}
                </span>{" "}
              </Box>
            </Box>
          ))}
          <Box sx={{ display: "flex", alignItems: "center", m: 1, mt: 3 }}>
            <Box>
              <PrimaryDateInput
                name="startdate"
                value={startPeriodDate}
                onChange={handleStartDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: today,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: today,
                }}
              />
            </Box>
          </Box>
        </Box>
  )
}

export default PollDateInput