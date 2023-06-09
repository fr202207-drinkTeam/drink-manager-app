import { Box, CircularProgress, Paper, Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC, memo, useEffect, useState } from "react";
import AdmTitleText from "../atoms/text/AdmTitleText";
import axios from "axios";
import { StockHistory } from "../../types/type";
import useGetItems from "../../hooks/useGetItems";
import ModalWindow from "../organisms/ModalWindow";
import StockCard from "../organisms/card/StockCard";
import type { Item } from "../../types/type";
import GetInTheOfficeItems from "../../utils/GetInTheOfficeItems";
import PostStockHistory from "../../utils/PostStockHistory";

const Consumption: FC = memo(() => {
  const navigate = useNavigate();
  const [inputValueArr, setInputValueArr] = useState<number[]>([]);
  const [inputValueArrError, setInputValueArrError] = useState("");
  const [inTheOfficeItems, setInTheOfficeItems] = useState<Item[]>()
  const [stockItems, setStockItems] = useState<StockHistory[]>([])

  useEffect(() => {
    const getItemsFnc = async() => {
      const getItemInTheOffice = await GetInTheOfficeItems()
    console.log(getItemInTheOffice)
    setInTheOfficeItems(getItemInTheOffice)
    }
    getItemsFnc()
  },[])

  const validateAddition = () => {
    const invalidValues = inputValueArr.filter((value) => value >= 999);
    const invalidAllValues = inputValueArr.filter((value) => value === 0);
    if (invalidValues.length > 0) {
      setInputValueArrError("*入力内容の確認をしてください");
      return false;
    }
    if (invalidAllValues.length === inputValueArr.length) {
      setInputValueArrError("*入力をしてください");
      return false;
    }
    setInputValueArrError("");
    return true;
  };

  // useEffect(() => {
  //   const firstInputValueArr: number[] = [...Array(itemData.length)].map(
  //     () => 0
  //   );
  //   setInputValueArr(firstInputValueArr);
  // }, [itemData]);

  // //オフィスに存在する商品のidのみが格納された配列
  // const [inTheOfficeItemIdArr, setInTheOfficeItemIdArr] = useState<
  //   Array<number>
  // >([]);

  // useEffect(() => {
  //   setInTheOfficeItemIdArr(itemData.map((item: any) => item.id));
  // }, [itemData]);

  // //オフィスに存在する商品情報が格納された配列 （現在在庫があるもののみ）
  // const [inTheOfficeItemArr, setInTheOfficeItemArr] = useState<
  //   Array<StockHistory>
  // >([]);

  // useEffect(() => {
  //   getStockAmount();
  // }, [inTheOfficeItemIdArr]);

  // const onClickSubmit = async () => {
  //   const isAdditionValid = validateAddition();
  //   if (isAdditionValid) {
  //     const now = new Date();
  //     const dateString = now.toISOString();
  //     try {
  //       await Promise.all(
  //         itemData.map(async (item, index) => {
  //           // 0より大きい場合のみデータを送信
  //           let newStockAmount;
  //           if (inTheOfficeItemArr[index]) {
  //             newStockAmount =
  //               inTheOfficeItemArr[index].stockAmount + inputValueArr[index];
  //           } else {
  //             newStockAmount = inputValueArr[index];
  //           }
  //           if (inputValueArr[index] > 0) {
  //             await axios.post("http://localhost:8880/stockhistory", {
  //               itemId: item.id,
  //               quantity: inputValueArr[index],
  //               day: dateString,
  //               incOrDec: true,
  //               stockAmount: newStockAmount,
  //             });
  //           }
  //         })
  //       );

  //       // 処理が全て完了した後に/adminhomeへ遷移
  //       navigate("/adminhome");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     setInputValueArrError("*入力内容の確認をしてください");
  //   }
  // };

  const TestBtn = () => {
    console.log(inTheOfficeItems)
  }

  const onClickSubmit = async () => {
    const isAdditionValid = validateAddition();

    if (isAdditionValid) {
      // const postDataResult = PostStockHistory(stockItems)
    }
      
  };

  return (
    <Paper
      sx={{
        mb: 5,
        width: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: "10px", sm: "10px", md: "10px", lg: "30px"},
      }}
    >
      <Box id="top" />
      <Box sx={{ width: "100%"}}>
        <AdmTitleText>補充在庫入力</AdmTitleText>
        <button onClick={TestBtn}>テスト</button>

        {inTheOfficeItems &&
        <StockCard
          itemData={inTheOfficeItems}
          inputValueArr={inputValueArr}
          setInputValueArr={setInputValueArr}
          stockItems={stockItems}
          setStockItems={setStockItems}
          sxStyle={{
            maxWidth: {
              xs: "200px",
              sm: "200px",
              md: "300px",
              lg: "300px",
              xl: "300px"
            },
            minWidth: {
              xs: "200px",
              sm: "200px",
              md: "250px",
              lg: "250px",
              xl: "295px"
            }, mb: 1
          }}
        />}
      <ModalWindow
        title="送信します、よろしいですか？"
        content={""}
        openButtonColor="blue"
        buttonName="送信"
        completeButtonColor={"blue"}
        completeButtonName={`はい`}
        completeAction={onClickSubmit}
        cancelButtonColor={"red"}
        openButtonSxStyle={{
          my: "50px",
          mx: "auto",
          py: "10px",
          px: "30px",
          display: "block",
          fontSize: { xs: "14px", sm: "16px", md: "20px", lg: "20px" },
          borderRadius: 3,
        }}
      />
      </Box>
      {inputValueArrError && (
        <Box sx={{ color: "red", fontSize: 15, marginBottom: 1, mt: 1 }}>
          {inputValueArrError}
        </Box>
      )}
    </Paper>
  );
});

export default Consumption;
