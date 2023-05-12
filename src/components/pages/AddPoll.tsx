/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useRef, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import {Backdrop,Box,Fade,Modal,Paper, Toolbar} from "@mui/material";
import { Items, Questionnaire } from "../../types/type";
import AddPollCard from "../organisms/card/AddPollCard";
import {ActiveBorderButton,ActiveDarkBlueButton,} from "../atoms/button/Button";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { useNavigate, useParams } from "react-router-dom";
import PollNameInput from "../atoms/addPollForm/PollNameInput";
import PollDescriptionInput from "../atoms/addPollForm/PollDescriptionInput";
import PollCategorySelect from "../atoms/addPollForm/PollCategorySelect";
import PollDateInput from "../atoms/addPollForm/PollDateInput";
import useGetQuestionnaire from "../../hooks/useGetQuestipnnaire";
import AddItem from "./AddItem";
import useGetAllItems from "../../hooks/useGetAllItems";


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
  const [pollCategory, setPollCategory] =useState("投票種別を選択してください");
  const [pollName, setPollName] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [trigger, setTrigger] = useState(false);
  //バリデーション
  const [pollNameError, setPollNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedItemsError, setSelectedItemsError] = useState("");
  //hooks
  const questionnaireData: Questionnaire[] = useGetQuestionnaire();
  const items: Items[]= useGetAllItems(trigger);
  //login
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  //バリデーション
  //投票名
  const validatePollName = () => {
    if (!pollName) {
      setPollNameError("*投票名を入力してください");
      return false;
    }
    setPollNameError("");
    return true;
  };
  //投票詳細
  const validateDescription = () => {
    if (!pollDescription) {
      setDescriptionError("*投票詳細を入力してください");
      return false;
    }
    setDescriptionError("");
    return true;
  };
  //投票カテゴリー
  const validateCategory = () => {
    if (pollCategory === "投票種別を選択してください") {
      setCategoryError("*投票種別を選択してください");
      return false;
    }
    setCategoryError("");
    return true;
  };
  //投票期間
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
  ///投票選択商品
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
      }).catch((e)=>{
        console.log(e)
      });
    }
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Box id="top" />
        <AdmTitleText children={"投票追加"} />
        <Box sx={{ mb: 1 }}>⚠︎ ここで追加した商品は商品一覧には表示されません。</Box>
        <ActiveDarkBlueButton event={handleOpen} sxStyle={{ width: 280, height: 80, fontSize: "20px" }}>
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
              handleClose={handleClose}
              trigger={trigger}
              setTrigger={setTrigger}
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
      </Paper>
    </>
  );
});

export default AddPoll;
