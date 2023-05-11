/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useRef, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import {Backdrop,Box,Fade,Modal,Paper} from "@mui/material";
import { Items, Questionnaire } from "../../types/type";
import AddPollCard from "../card/AddPollCard";
import {ActiveBorderButton,ActiveDarkBlueButton,} from "../atoms/button/Button";
import AddItem from "./AddItem";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { useNavigate } from "react-router-dom";
import PollNameInput from "../molecules/poll/PollNameInput";
import PollDescriptionInput from "../molecules/poll/PollDescriptionInput";
import PollCategorySelect from "../molecules/poll/PollCategorySelect";
import PollDateInput from "../molecules/poll/PollDateInput";
import { CircularProgress } from "@mui/material";
import useGetQuestionnaire from "../../hooks/useGetQuestipnnaire";

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

const AddPoll = memo(() => {
  //モーダル
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");
  const [items, setItems] = useState<Items[]>([]);
  const [pollFlag, setPollFlag] = useState(false);
  const [pollCategory, setPollCategory] =useState("投票種別を選択してください");
  const [pollName, setPollName] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire[]>([]);
  const [pollNameError, setPollNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedItemsError, setSelectedItemsError] = useState("");
  const [adding, setAdding] = useState<boolean>(false);

  const questionnaireData: Questionnaire[] = useGetQuestionnaire();

  //login
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

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

    const isOverlapping = questionnaireData.some(question => {
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
    setAdding(true)
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
      }).catch((e)=>{
        console.log(e)
      });
    }
    setAdding(false)
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
      {adding ? (
          <>
            <div style={{ margin: "200px", textAlign: "center" }}>
              <p>登録中</p>
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
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
        <PollNameInput pollName={pollName} setPollName={setPollName} pollNameError={pollNameError} setPollNameError={setPollNameError}/>
        <PollDescriptionInput pollDescription={pollDescription} setPollDescription={setPollDescription} descriptionError={descriptionError} setDescriptionError={setDescriptionError}/>
        <PollCategorySelect pollCategory={pollCategory} setPollCategory={setPollCategory} categoryError={categoryError} setCategoryError={setCategoryError}/>
        <PollDateInput startPeriodDate={startPeriodDate} endPeriodDate={endPeriodDate} setStartPeriodDate={setStartPeriodDate} setEndPeriodDate={setEndPeriodDate} dateError={dateError} setDateError={setDateError}/>
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
        </>)}
      </Paper>
    </>
  );
});

export default AddPoll;
