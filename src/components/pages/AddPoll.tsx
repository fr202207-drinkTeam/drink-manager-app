import { FC, memo, useEffect, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import { Box, InputLabel, Paper, TextField } from "@mui/material";
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";
import { PrimaryDateInput } from "../atoms/input/dateInput";
import { Items } from "../../types/type";
import ItemCard from "../card/ItemCard";
import AddPollCard from "../card/AddPollCard";
import { ActiveBorderButton } from "../atoms/button/Button";
import ModalWindow from '../organisms/ModalWindow';

type Props = {};

const AddPoll: FC<Props> = memo((props) => {
  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");
  const [items, setItems] = useState<Items[]>([]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartPeriodDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndPeriodDate(e.target.value);
  };

  useEffect(() => {
    console.log(startPeriodDate);
    console.log(endPeriodDate);
  }, [startPeriodDate, endPeriodDate]);

  //Items取得
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8880/items`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  console.log(items, items);

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <AdmTitleText children={"投票追加"} />
        <SecondaryInput
          type="text"
          label="投票タイトル"
          placeHolder="投票タイトル"
          required
        />
        <PrimaryInput
          type="text"
          label="投票詳細"
          placeHolder="投票詳細"
          required
        />

          <Box sx={{ display: "flex", alignItems: "center" ,m:1,mt:3}}>
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
        <AddPollCard data={items} />
        <Box sx={{textAlign:"center",my:5}}>
        <ActiveBorderButton  event={function (): void {
          throw new Error("Function not implemented.");
        } }>&nbsp;投票追加&nbsp;</ActiveBorderButton>
        </Box>
      </Paper>
    </>
  );
});

export default AddPoll;
