/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, memo, useEffect, useRef, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import {Backdrop,Box,Fade,MenuItem,Modal,Paper,Select,SelectChangeEvent,} from "@mui/material";
import { PrimaryInput, SecondaryInput } from "../atoms/input/Input";
import { PrimaryDateInput } from "../atoms/input/dateInput";
import { Items, Questionnaire } from "../../types/type";
import AddPollCard from "../card/AddPollCard";
import {ActiveBorderButton,ActiveDarkBlueButton,} from "../atoms/button/Button";
import AddItem from "./AddItem";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { useNavigate } from "react-router-dom";


type Props = {};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  height: "100%",
};

const AddPoll: FC<Props> = memo((props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");
  const [items, setItems] = useState<Items[]>([]);
  const [pollFlag, setPollFlag] = useState(false);
  const [pollCategory, setPollCategory] =
    useState("投票種別を選択してください");
  const [pollName, setPollName] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire[]>([]);
  //validate
  const [pollNameError, setPollNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedItemsError, setSelectedItemsError] = useState("");


  //login
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });

  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  // yyyy-mm-dd 形式の文字列を作成（今日）
  const today = new Date().toISOString().split("T")[0];

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
  }, [items]);

  //アンケート情報取得
  useEffect(() => {
    const now = new Date();
    (async () => {
      const response = await fetch(`http://localhost:8880/questionnaire`);
      const data = await response.json();
      console.log(data, "");
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
        return !question.isValidPeriod;
      });
      setQuestionnaire(validPeriodData);
    })();
  }, [endPeriodDate, startPeriodDate]);

  //バリデーション
  const validatePollName = () => {
    if (!pollName) {
      setPollNameError("*投票名を入力してください");
      return false;
    }
    setPollNameError("");
    return true;
  };
  const validateDescription = () => {
    if (!pollDescription) {
      setDescriptionError("*投票詳細を入力してください");
      return false;
    }
    setDescriptionError("");
    return true;
  };
  const validateCategory = () => {
    if (pollCategory === "投票種別を選択してください") {
      setCategoryError("*投票種別を選択してください");
      return false;
    }
    setCategoryError("");
    return true;
  };

  const validateDate = () => {
    if (!startPeriodDate || !endPeriodDate) {
      setDateError("*投票期間を入れてください");
      return false;
    }
    if (startPeriodDate >= endPeriodDate) {
      setDateError("*投票期間が正しくありません。再度確認してください。");
      return false;
    }
    const isOverlapping = questionnaire.some(question => {
      const questionStartDate = new Date(question.startDate);
      const questionEndDate = new Date(question.endDate);
      const inputStartDate = new Date(startPeriodDate);
      const inputEndDate = new Date(endPeriodDate);
      // 期間が重複している場合はtrueを返す
      return inputStartDate <= questionEndDate && inputEndDate >= questionStartDate;
    });
  
    if (isOverlapping) {
      setDateError("*投票期間が被っています。投票期間を再度確認してください。");
      return false;
    }
    setDateError("");
    return true;
  };

  const validateSelectedItems = () => {
    if (selectedItems.length === 0) {
      setSelectedItemsError("*投票に追加する商品を選択してください");
      return false;
    }
    setSelectedItemsError("");
    return true;
  };

  //アンケート情報登録
  const onClickAddPollData: () => Promise<void> = async () => {
    const isNameValid = validatePollName();
    const isDescriptionValid = validateDescription();
    const isCategoryValid = validateCategory();
    const isDateValid = validateDate();
    const isSelectedItemsValid = validateSelectedItems();

    if (
      isNameValid &&
      isDescriptionValid &&
      isCategoryValid &&
      isDateValid &&
      isSelectedItemsValid
    ) {
      const polledItemIds = selectedItems.map((item) => {
        return { itemId: item };
      });
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
      fetch("http://localhost:8880/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pollName,
          description: pollDescription,
          category: Number(pollCategory),
          createdAt: new Date(),
          startDate: startPeriodDate,
          endDate: endPeriodDate,
          polledItems: polledItemIds,
          author: loginUser.id,
        }),
      }).then(() => {
        navigate("/adminhome");
      });
    }
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <AdmTitleText children={"投票追加"} />
        <Box sx={{ mb: 1 }}>⚠︎ ここで追加した商品は商品一覧には表示されません。</Box>
        <ActiveDarkBlueButton event={handleOpen} sxStyle={{width:280,height:80,fontSize:"20px"}}>
          投票用新規商品登録
        </ActiveDarkBlueButton>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <AddItem
                pollFlag={true}
                setPollFlag={setPollFlag}
                handleClose={handleClose}
              />
            </Box>
          </Fade>
        </Modal>
        <Box sx={{ mt: 3 }}>
          {pollNameError && (
            <Box style={{ color: "red", fontSize: 15, marginBottom: 1 }}>
              {pollNameError}
            </Box>
          )}
          <SecondaryInput
            type="text"
            label="投票タイトル"
            placeHolder="投票タイトル"
            helperText={`${pollName.length}/15`}
            inputProps={{ maxLength: 15 }}
            onChange={(e: any) => {
              setPollName(e.target.value);
            }}
            required
          />
        </Box>
        {descriptionError && (
          <Box style={{ color: "red", fontSize: 15 }}>{descriptionError}</Box>
        )}
        <PrimaryInput
          type="text"
          label="投票詳細"
          helperText={`${pollDescription.length}/31`}
          inputProps={{ maxLength: 31 }}
          onChange={(e: any) => {
            setPollDescription(e.target.value);
          }}
          placeHolder="投票詳細"
          required
        />
        <Box>
          {categoryError && (
            <Box sx={{ color: "red", fontSize: 15, pt: 2 }}>
              {categoryError}
            </Box>
          )}
          <Select
            onChange={(e: SelectChangeEvent) => setPollCategory(e.target.value)}
            value={pollCategory}
            sx={{ my: 2, backgroundColor: "#fffffc" }}
            required
          >
            <MenuItem value="投票種別を選択してください">
              投票種別を選択してください
            </MenuItem>
            <MenuItem value="1">人気投票</MenuItem>
            <MenuItem value="2">その他</MenuItem>
          </Select>
        </Box>
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
          {questionnaire.map((data) => (
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
        <Box sx={{ m: "auto" }}>
          {selectedItemsError && (
            <Box sx={{ color: "red", fontSize: 15, mt: 3 }}>
              {selectedItemsError}
            </Box>
          )}
          <AddPollCard
            data={items}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </Box>
        <Box sx={{ textAlign: "center", my: 5 }}>
          <ActiveBorderButton event={onClickAddPollData}>
            &nbsp;投票追加&nbsp;
          </ActiveBorderButton>
        </Box>
      </Paper>
    </>
  );
});

export default AddPoll;
