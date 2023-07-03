/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useRef, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import { Backdrop, Box, Fade, Modal, Paper, Toolbar } from "@mui/material";
import { Items, Questionnaire } from "../../types/type";
import AddPollCard from "../organisms/card/AddPollCard";
import { ActiveBorderButton, ActiveDarkBlueButton, } from "../atoms/button/Button";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { useNavigate, useParams } from "react-router-dom";
import PollNameInput from "../atoms/addPollForm/PollNameInput";
import PollDescriptionInput from "../atoms/addPollForm/PollDescriptionInput";
import PollCategorySelect from "../atoms/addPollForm/PollCategorySelect";
import PollDateInput from "../atoms/addPollForm/PollDateInput";
import AddItem from "./AddItem";
import useGetAllItems from "../../hooks/useGetAllItems";
import ModalWindow from "../organisms/ModalWindow";
import useGetPollCategoryPeriod from "../../hooks/useGetPollCategoryPeriod";
import PollItemCategorySelect from "../atoms/addPollForm/PollItemCategorySelect";
import PostQuestionnair from "../../utils/PostQuestionnaire";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  height: "80%",
};

const AddPoll = memo(() => {
  //モーダル
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");
  const [pollCategory, setPollCategory] = useState("投票種別を選択してください");
  const [pollItemCategory, setPollItemCategory] = useState("商品検索");
  const [pollName, setPollName] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [trigger, setTrigger] = useState(false);
  //バリデーション
  const [pollNameError, setPollNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [categoryItemError, setCategoryItemError] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedItemsError, setSelectedItemsError] = useState("");
  const [allError, setAllError] = useState("");
  //hooks
  const popularQuestionnaireData: Questionnaire[] = useGetPollCategoryPeriod(1);
  const othersQuestionnaireData: Questionnaire[] = useGetPollCategoryPeriod(2);
  const items: Items[] = useGetAllItems(trigger);
  //login
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  //廃盤になっていない商品のみ表示
  const isExistItems = items.filter((item) => {
    return item.isDiscontinued === false
  })
  const isPopularOverlapping = popularQuestionnaireData.some(question => {
    const popularQuestionStartDate = new Date(question.startDate);
    const popularQuestionEndDate = new Date(question.endDate);
    const popularInputStartDate = new Date(startPeriodDate);
    const popularInputEndDate = new Date(endPeriodDate);
    // 選択された期間で人気投票が重複している場合はtrueを返す
    return popularInputStartDate <= popularQuestionEndDate && popularInputEndDate >= popularQuestionStartDate;
  });
  const isOthersOverlapping = othersQuestionnaireData.some(question => {
    const othersQuestionStartDate = new Date(question.startDate);
    const othersQuestionEndDate = new Date(question.endDate);
    const othersInputStartDate = new Date(startPeriodDate);
    const othersInputEndDate = new Date(endPeriodDate);
    // 選択された期間でその他投票が重複している場合はtrueを返す
    return othersInputStartDate <= othersQuestionEndDate && othersInputEndDate >= othersQuestionStartDate;
  });
  //投票期間は１ヶ月しか設定できないように
  const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;//１ヶ月をm秒に換算
  const startDate = new Date(startPeriodDate);
  const endDate = new Date(endPeriodDate);
  const timeDifference = endDate.getTime() - startDate.getTime();

  //バリデーション
  //投票名
  const validatePollName = () => {
    if (!pollName) {
      setPollNameError("投票名を入力してください");
      return false;
    }
    if (pollName.length < 5) {
      setPollNameError("5文字以上の入力が必要です");
      return false;
    }
    setPollNameError("");
    return true;
  };
  //投票詳細
  const validateDescription = () => {
    if (!pollDescription) {
      setDescriptionError("投票詳細を入力してください");
      return false;
    }
    if (pollDescription.length < 5) {
      setDescriptionError("*5文字以上の入力が必要です");
      return false;
    }
    setDescriptionError("");
    return true;
  };
  //投票期間
  const validateDate = () => {

    if (timeDifference > oneMonthInMilliseconds) {
      setDateError("投票期間は1ヶ月以内で設定してください。");
      return false;
    }
    if (!startPeriodDate || !endPeriodDate) {
      setDateError("投票期間を入れてください");
      return false;
    }
    if (startPeriodDate >= endPeriodDate) {
      setDateError("投票期間が正しくありません。再度確認してください。");
      return false;
    }
    if (isPopularOverlapping && isOthersOverlapping) {
      setDateError("投票期間が被っています。投票期間を再度確認してください。");
      return false;
    }
    setDateError("");
    return true;
  };
  //投票カテゴリー
  const validateCategory = () => {
    if (pollCategory === "投票種別を選択してください") {
      setCategoryError("投票種別を選択してください");
      return false;
    }
    if (isPopularOverlapping && pollCategory === "1") {
      setCategoryError("人気投票が同一期間で重複するため登録できません");
      return false;
    }
    if (isOthersOverlapping && pollCategory === "2") {
      setCategoryError("その他投票が同一期間で重複するため登録できません");
      return false;
    }
    setCategoryError("");
    return true;
  };
  ///投票選択商品
  const validateSelectedItems = () => {
    if (selectedItems.length === 0) {
      setSelectedItemsError("投票に追加する商品を選択してください");
      return false;
    }
    if (selectedItems.length >= 15) {
      setSelectedItemsError("投票に追加できる商品は15件までです");
      return false;
    }
    if (selectedItems.length === 1) {
      setSelectedItemsError("投票商品が1件の状態では登録できません");
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
      const data = {
        name: pollName,
        description: pollDescription,
        category: Number(pollCategory),
        createdAt: new Date(),
        startDate: new Date(startPeriodDate),
        endDate: new Date(endPeriodDate),
        Polleditems: polledItemIds,
        author: loginUser.id,
      }
      const PostQuestionnairData = await PostQuestionnair(data)
      if (PostQuestionnairData) {
        navigate("/adminhome");
      }
    } else {
      setAllError("入力内容の確認をしてください");
    }
  };

  return (
    <>
      <Paper sx={{
        mb: 5,
        width: "100%",
        pb: 13,
        p: 2,
      }}>
        <Box id="top" />
        <AdmTitleText children={"投票追加"} />
        <ActiveDarkBlueButton event={handleOpen} sxStyle={{
          p: 2, fontSize: {
            xs: "14px",
            sm: "14px",
            md: "16px",
            lg: "18px",
          },
        }}>
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
        <PollNameInput pollName={pollName} setPollName={setPollName} pollNameError={pollNameError} setPollNameError={setPollNameError} />
        <PollDescriptionInput pollDescription={pollDescription} setPollDescription={setPollDescription} descriptionError={descriptionError} setDescriptionError={setDescriptionError} />
        <PollCategorySelect pollCategory={pollCategory} setPollCategory={setPollCategory} categoryError={categoryError} setCategoryError={setCategoryError} />
        <PollDateInput startPeriodDate={startPeriodDate} endPeriodDate={endPeriodDate} setStartPeriodDate={setStartPeriodDate} setEndPeriodDate={setEndPeriodDate} dateError={dateError} setDateError={setDateError} />
        <PollItemCategorySelect pollItemCategory={pollItemCategory} setPollItemCategory={setPollItemCategory} categoryItemError={categoryItemError} setCategoryItemError={setCategoryItemError} />
        <Box sx={{ m: "auto" }}>
          {selectedItemsError && (
            <Box sx={{ color: "red", fontSize: 15, mt: 3 }}>
              {selectedItemsError}
            </Box>
          )}
          <AddPollCard
            data={isExistItems}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </Box>
        {allError && (
          <Box style={{ color: "red", fontSize: 15, marginBottom: 1 }} sx={{ textAlign: "center", mt: 2 }}>
            {allError}
          </Box>
        )}
        <Box sx={{ textAlign: "center", my: 5 }}>
          <ModalWindow
            title={`本当に登録してもよろしいですか？`}
            openButtonColor={"pink"}
            completeButtonColor={"blue"}
            completeButtonName={`投票登録`}
            completeAction={onClickAddPollData}
            cancelButtonColor={"red"}
            openButtonSxStyle={{
              background: "#fff",
              fontWeight: "bold",
              border: "1px solid #E83929",
              color: "#E83929",
              ":hover": {
                background: "#fff",
                opacity: 0.7,
                cursor: "pointer",
              },
              fontFamily: "'M PLUS 1p', sans-serif",
            }} content={"⚠︎取り消しはできない為ご注意ください"} />
        </Box>
      </Paper>
    </>
  );
});

export default AddPoll;


