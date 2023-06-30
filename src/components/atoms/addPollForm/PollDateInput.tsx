import { Box } from '@mui/material'
import React, { FC } from 'react'
import { PrimaryDateInput } from '../input/dateInput'
import { Questionnaire } from '../../../types/type';
import useGetQuestionnaire from '../../../hooks/useGetQuestionnaire';

type PollDateInputProps = {
  pollEditFlag?: boolean;
  startPeriodDate: string;
  endPeriodDate: string;
  setStartPeriodDate: React.Dispatch<React.SetStateAction<string>>;
  setEndPeriodDate: React.Dispatch<React.SetStateAction<string>>;
  dateError?: string;
  setDateError?: React.Dispatch<React.SetStateAction<string>>;
}

const PollDateInput: FC<PollDateInputProps> = ({
  setDateError, dateError, startPeriodDate, setStartPeriodDate, endPeriodDate, setEndPeriodDate, pollEditFlag
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
    <>
      <Box
        sx={{
          border: pollEditFlag?"":"solid 1px #C4C4C4",
          display: "inline-block",
          borderRadius: "5px",
          mt: 2,
        }}
      >
        {!pollEditFlag &&
          <Box>
            {dateError && (
              <Box style={{ color: "red", fontSize: 15 }}>{dateError}</Box>
            )}
            <Box sx={{
              my: 2, fontSize: {
                xs: "11px",
                sm: "14px",
                md: "16px",
                lg: "18px",
                xl: "18px"
              },
            }}>
              ※各投票の開催期間が被らないように１ヶ月単位で設定してください
            </Box>
            <Box sx={{ mb: 1, fontWeight: "bold", ml: 1 }}>最近登録した投票</Box>
            {questionnaireData.map((data) => (
              <Box key={data.id} sx={{ display: "flex", flexWrap: "wrap", ml: 1 }}>
                <Box sx={{
                  fontSize: {
                    xs: "14px",
                    sm: "14px",
                    md: "16px",
                    lg: "18px",
                    xl: "18px"
                  }, borderBottom: 1
                }}>
                  ・{data.name}{" "}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "16px",
                        lg: "18px",
                        xl: "18px"
                      },
                    }}
                  >
                    期間:{data.startDate.toLocaleDateString()}~
                    {data.endDate.toLocaleDateString()}
                  </Box>{" "}
                </Box>
              </Box>
            ))}
          </Box>
        }
        <Box sx={{ display: "flex", alignItems: "center", m: 1, mt: 3 }}>
          <Box>
            <PrimaryDateInput
              name="startdate"
              value={startPeriodDate}
              onChange={handleStartDateChange}
              placeholder="日付"
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
              placeholder="日付2"
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
    </>
  )
}

export default PollDateInput