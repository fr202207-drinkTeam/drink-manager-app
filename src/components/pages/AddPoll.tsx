/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo,useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import { Backdrop, Box, Fade, Modal, Paper } from "@mui/material";
import { Items, Questionnaire } from "../../types/type";
import AddPollCard from "../organisms/card/AddPollCard";
import { ActiveDarkBlueButton, } from "../atoms/button/Button";
import Cookies from "js-cookie";
import { useLoginUserFetch } from "../../hooks/useLoginUserFetch";
import { useNavigate} from "react-router-dom";
import PollNameInput from "../atoms/addPollForm/PollNameInput";
import PollDescriptionInput from "../atoms/addPollForm/PollDescriptionInput";
import PollCategorySelect from "../atoms/addPollForm/PollCategorySelect";
import PollDateInput from "../atoms/addPollForm/PollDateInput";
import AddItem from "./AddItem";
import useGetAllItems from "../../hooks/useGetAllItems";
import ModalWindow from "../organisms/ModalWindow";
import useGetPollCategoryPeriod from "../../hooks/poll/useGetPollCategoryPeriod";
import PollItemCategorySelect from "../atoms/addPollForm/PollItemCategorySelect";
import PostQuestionnair from "../../utils/PostQuestionnaire";
import { validateCategory, validateDate, validateDescription, validatePollName, validateSelectedItems } from "../../utils/AddPollValidation";

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
  //hooks
  const [startPeriodDate, setStartPeriodDate] = useState("");
  const [endPeriodDate, setEndPeriodDate] = useState("");
  const [pollCategory, setPollCategory] = useState("投票種別を選択してください");
  const [pollItemCategory, setPollItemCategory] = useState("商品検索");
  const [pollName, setPollName] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [trigger, setTrigger] = useState(false);
  //バリデーション
  const [pollNameError, setPollNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [categoryItemError, setCategoryItemError] = useState<string>("");//検索
  const [dateError, setDateError] = useState<string>("");
  const [selectedItemsError, setSelectedItemsError] = useState<string>("");
  const [allError, setAllError] = useState<string>("");
  //hooks
  const popularQuestionnaireData: Questionnaire[] = useGetPollCategoryPeriod(1);
  const othersQuestionnaireData: Questionnaire[] = useGetPollCategoryPeriod(2);
  const items: Items[] = useGetAllItems(trigger);
  //login
  const authId = Cookies.get("authId")!;
  const loginUser = useLoginUserFetch({ authId: authId });
  const navigate = useNavigate();

  //廃盤になっていない商品のみ表示
  const isExistItems = items.filter((item) => {
    return item.isDiscontinued === false
  })
  //投票期間(人気投票)
  const isPopularOverlapping = popularQuestionnaireData.some(question => {
    const popularQuestionStartDate = new Date(question.startDate);
    const popularQuestionEndDate = new Date(question.endDate);
    const popularInputStartDate = new Date(startPeriodDate);
    const popularInputEndDate = new Date(endPeriodDate);
    // 選択された期間で人気投票が重複している場合はtrueを返す
    return popularInputStartDate <= popularQuestionEndDate && popularInputEndDate >= popularQuestionStartDate;
  });
  //投票期間（その他投票）
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

  console.log(timeDifference,oneMonthInMilliseconds)

  //アンケート情報登録
  const onClickAddPollData: () => Promise<void> = async () => {
    const isNameValid = validatePollName(pollName)
    setPollNameError(isNameValid)
    const isDescriptionValid = validateDescription(pollDescription)
    setDescriptionError(isDescriptionValid)
    const isCategoryValid = validateCategory(pollCategory, isPopularOverlapping, isOthersOverlapping)
    setCategoryError(isCategoryValid)
    const isDateValid = validateDate(timeDifference, oneMonthInMilliseconds, startPeriodDate, endPeriodDate, isPopularOverlapping, isOthersOverlapping)
    setDateError(isDateValid)
    const isSelectedItemsValid = validateSelectedItems(selectedItems)
    setSelectedItemsError(isSelectedItemsValid)
    if (
      isNameValid==="" &&
      isDescriptionValid==="" &&
      isCategoryValid==="" &&
      isDateValid==="" &&
      isSelectedItemsValid===""
    ) {
      const data = {
        name: pollName,
        description: pollDescription,
        category: Number(pollCategory),
        createdAt: new Date(),
        startDate: new Date(startPeriodDate),
        endDate: new Date(endPeriodDate),
        PolleditemsData: [{ itemId: 1 }],
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
        <PollNameInput pollName={pollName} setPollName={setPollName} pollNameError={pollNameError} />
        <PollDescriptionInput pollDescription={pollDescription} setPollDescription={setPollDescription} descriptionError={descriptionError} />
        <PollCategorySelect pollCategory={pollCategory} setPollCategory={setPollCategory} categoryError={categoryError} />
        <PollDateInput startPeriodDate={startPeriodDate} endPeriodDate={endPeriodDate} setStartPeriodDate={setStartPeriodDate} setEndPeriodDate={setEndPeriodDate} dateError={dateError} />
        <PollItemCategorySelect pollItemCategory={pollItemCategory} setPollItemCategory={setPollItemCategory}/>
        <Box sx={{ m: "auto" }}>
          {!(selectedItemsError==="") && (
            <Box sx={{ color: "red", fontSize: 15, mt: 3,textAlign:"left" }}>
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


